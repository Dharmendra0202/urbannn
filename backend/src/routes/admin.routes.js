const express = require('express');
const router = express.Router();
const { supabaseAdmin } = require('../config/supabase');

// Get all bookings (admin only)
router.get('/bookings', async (req, res) => {
  try {
    const { status, date_from, date_to, limit = 100 } = req.query;

    let query = supabaseAdmin
      .from('bookings')
      .select(`
        *,
        service:services(*),
        provider:service_providers(*),
        address:user_addresses(*),
        user:users(id, full_name, phone, email)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (status) {
      query = query.eq('status', status);
    }

    if (date_from) {
      query = query.gte('scheduled_date', date_from);
    }

    if (date_to) {
      query = query.lte('scheduled_date', date_to);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json({ 
      bookings: data,
      total: data.length 
    });
  } catch (error) {
    console.error('Get admin bookings error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Get booking statistics
router.get('/bookings/stats', async (req, res) => {
  try {
    // Total bookings
    const { count: totalBookings } = await supabaseAdmin
      .from('bookings')
      .select('*', { count: 'exact', head: true });

    // Bookings by status
    const { data: statusData } = await supabaseAdmin
      .from('bookings')
      .select('status');

    const statusCounts = statusData.reduce((acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1;
      return acc;
    }, {});

    // Today's bookings
    const today = new Date().toISOString().split('T')[0];
    const { count: todayBookings } = await supabaseAdmin
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('scheduled_date', today);

    // This month's bookings
    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    const { count: monthBookings } = await supabaseAdmin
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .gte('scheduled_date', firstDayOfMonth.toISOString().split('T')[0]);

    res.json({
      total: totalBookings,
      today: todayBookings,
      thisMonth: monthBookings,
      byStatus: statusCounts
    });
  } catch (error) {
    console.error('Get booking stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Delete old bookings (older than specified days)
router.delete('/bookings/cleanup', async (req, res) => {
  try {
    const { days = 90, status = 'completed' } = req.body;

    // Calculate cutoff date
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffDateStr = cutoffDate.toISOString().split('T')[0];

    console.log(`Cleaning up ${status} bookings older than ${days} days (before ${cutoffDateStr})`);

    // Delete old bookings
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .delete()
      .eq('status', status)
      .lt('scheduled_date', cutoffDateStr)
      .select();

    if (error) throw error;

    res.json({
      message: `Deleted ${data.length} old bookings`,
      deleted: data.length,
      cutoffDate: cutoffDateStr
    });
  } catch (error) {
    console.error('Cleanup bookings error:', error);
    res.status(500).json({ error: 'Failed to cleanup bookings' });
  }
});

// Delete specific booking
router.delete('/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from('bookings')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({
      message: 'Booking deleted successfully',
      booking: data
    });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

// Update booking status
router.patch('/bookings/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, cancellation_reason } = req.body;

    const updateData = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (status === 'cancelled') {
      updateData.cancelled_at = new Date().toISOString();
      updateData.cancelled_by = 'admin';
      updateData.cancellation_reason = cancellation_reason;
    } else if (status === 'confirmed') {
      updateData.confirmed_at = new Date().toISOString();
    } else if (status === 'in_progress') {
      updateData.started_at = new Date().toISOString();
    } else if (status === 'completed') {
      updateData.completed_at = new Date().toISOString();
    }

    const { data, error } = await supabaseAdmin
      .from('bookings')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        service:services(*),
        provider:service_providers(*),
        address:user_addresses(*)
      `)
      .single();

    if (error) throw error;

    res.json({ booking: data });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// Export bookings to CSV
router.get('/bookings/export/csv', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .select(`
        *,
        service:services(name),
        provider:service_providers(full_name),
        user:users(full_name, phone, email)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Create CSV
    const csv = [
      'Booking Number,Customer Name,Phone,Service,Provider,Date,Time,Status,Payment Status,Total Amount,Created At',
      ...data.map(b => [
        b.booking_number,
        b.user?.full_name || 'Guest',
        b.user?.phone || '',
        b.service?.name || '',
        b.provider?.full_name || 'Unassigned',
        b.scheduled_date,
        b.scheduled_time,
        b.status,
        b.payment_status,
        b.total_amount,
        b.created_at
      ].join(','))
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=bookings.csv');
    res.send(csv);
  } catch (error) {
    console.error('Export bookings error:', error);
    res.status(500).json({ error: 'Failed to export bookings' });
  }
});

module.exports = router;
