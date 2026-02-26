const express = require('express');
const router = express.Router();
const { supabase, supabaseAdmin } = require('../config/supabase');
const { authenticate } = require('../middleware/auth.middleware');

// Guest booking - Create address (simplified - no user creation)
router.post('/guest/address', async (req, res) => {
  try {
    const {
      full_name,
      phone,
      address_line1,
      landmark,
      city,
      state,
      pincode,
    } = req.body;

    // Get the guest user (created via script)
    const { data: guestUser, error: userError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', 'guest@urbannn.app')
      .single();

    if (userError || !guestUser) {
      return res.status(500).json({ 
        error: 'Guest user not found. Please run: node backend/create-guest-user.js' 
      });
    }

    const guest_user_id = guestUser.id;

    // Create address for guest user using admin client to bypass RLS
    const { data: address, error: addressError } = await supabaseAdmin
      .from('user_addresses')
      .insert([{
        user_id: guest_user_id,
        address_type: 'home',
        address_line1,
        address_line2: `Contact: ${full_name}, Phone: ${phone}`,
        landmark,
        city,
        state,
        pincode,
        is_default: false,
      }])
      .select()
      .single();

    if (addressError) {
      console.error('Address creation error:', addressError);
      throw addressError;
    }

    res.status(201).json({ 
      address_id: address.id, 
      user_id: guest_user_id,
      customer_name: full_name,
      customer_phone: phone
    });
  } catch (error) {
    console.error('Create guest address error:', error);
    res.status(500).json({ error: 'Failed to create address', details: error.message });
  }
});

// Guest booking - Create booking
router.post('/guest', async (req, res) => {
  try {
    const {
      user_id,
      service_id,
      address_id,
      scheduled_date,
      scheduled_time,
      special_instructions,
      customer_name,
      customer_phone,
    } = req.body;

    // Parse time slot (e.g., "09:00 AM - 11:00 AM" -> "09:00:00")
    const parseTimeSlot = (timeSlot) => {
      // Extract start time from slot like "09:00 AM - 11:00 AM"
      const startTime = timeSlot.split('-')[0].trim();
      const [time, meridiem] = startTime.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      
      // Convert to 24-hour format
      if (meridiem === 'PM' && hours !== 12) hours += 12;
      if (meridiem === 'AM' && hours === 12) hours = 0;
      
      // Return in HH:MM:SS format
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
    };

    const parsed_time = parseTimeSlot(scheduled_time);

    // Get service details
    const { data: service } = await supabase
      .from('services')
      .select('*')
      .eq('id', service_id)
      .single();

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Get available provider (auto-assign)
    const { data: providers } = await supabase
      .from('service_providers')
      .select('*')
      .eq('is_active', true)
      .limit(1);

    const provider_id = providers && providers.length > 0 ? providers[0].id : null;

    // Calculate pricing
    const base_price = service.base_price;
    const discount_amount = (base_price * service.discount_percentage) / 100;
    const convenience_fee = 49;
    const tax_amount = ((base_price - discount_amount + convenience_fee) * 0.18);
    const total_amount = base_price - discount_amount + convenience_fee + tax_amount;

    // Create booking with customer info in special_instructions
    const booking_notes = `Customer: ${customer_name}, Phone: ${customer_phone}${special_instructions ? ', Notes: ' + special_instructions : ''}`;

    // Use admin client to bypass RLS for guest bookings
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .insert([{
        user_id,
        service_id,
        provider_id,
        address_id,
        scheduled_date,
        scheduled_time: parsed_time,
        duration_minutes: service.duration_minutes,
        base_price,
        discount_amount,
        tax_amount,
        total_amount,
        special_instructions: booking_notes,
        status: 'confirmed',
        payment_status: 'pending',
      }])
      .select(`
        *,
        service:services(*),
        provider:service_providers(*),
        address:user_addresses(*)
      `)
      .single();

    if (bookingError) {
      console.error('Booking creation error:', bookingError);
      throw bookingError;
    }

    // Create notification
    try {
      await supabaseAdmin
        .from('notifications')
        .insert([{
          user_id,
          title: 'Booking Confirmed',
          message: `Your booking for ${service.name} has been confirmed for ${scheduled_date} at ${scheduled_time}`,
          type: 'booking',
          related_id: booking.id,
        }]);
    } catch (notifError) {
      console.error('Notification error:', notifError);
      // Don't fail the booking if notification fails
    }

    res.status(201).json({ 
      booking,
      message: 'Booking created successfully! A professional will be assigned shortly.',
      provider_name: booking.provider ? booking.provider.business_name : 'Auto Assign Team'
    });
  } catch (error) {
    console.error('Create guest booking error:', error);
    res.status(500).json({ error: 'Failed to create booking', details: error.message });
  }
});

// Get user bookings
router.get('/', authenticate, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        service:services(*),
        provider:service_providers(*),
        address:user_addresses(*)
      `)
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ bookings: data });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Get booking by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        service:services(*),
        provider:service_providers(*),
        address:user_addresses(*),
        items:booking_items(*, service:services(*))
      `)
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ booking: data });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

// Create booking
router.post('/', authenticate, async (req, res) => {
  try {
    const {
      service_id,
      address_id,
      scheduled_date,
      scheduled_time,
      special_instructions,
      items = [],
    } = req.body;

    // Get service details
    const { data: service } = await supabase
      .from('services')
      .select('*')
      .eq('id', service_id)
      .single();

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Calculate pricing
    const base_price = service.base_price;
    const discount_amount = (base_price * service.discount_percentage) / 100;
    const tax_amount = (base_price - discount_amount) * 0.18; // 18% GST
    const total_amount = base_price - discount_amount + tax_amount;

    // Create booking
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert([
        {
          user_id: req.user.id,
          service_id,
          address_id,
          scheduled_date,
          scheduled_time,
          duration_minutes: service.duration_minutes,
          base_price,
          discount_amount,
          tax_amount,
          total_amount,
          special_instructions,
          status: 'pending',
          payment_status: 'pending',
        },
      ])
      .select()
      .single();

    if (bookingError) throw bookingError;

    // Add booking items if any
    if (items.length > 0) {
      const bookingItems = items.map((item) => ({
        booking_id: booking.id,
        service_id: item.service_id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.unit_price * item.quantity,
      }));

      await supabase.from('booking_items').insert(bookingItems);
    }

    res.status(201).json({ booking });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Update booking status
router.patch('/:id/status', authenticate, async (req, res) => {
  try {
    const { status, cancellation_reason } = req.body;

    const updateData = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (status === 'cancelled') {
      updateData.cancelled_at = new Date().toISOString();
      updateData.cancelled_by = 'user';
      updateData.cancellation_reason = cancellation_reason;
    }

    const { data, error } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ booking: data });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// Cancel booking
router.post('/:id/cancel', authenticate, async (req, res) => {
  try {
    const { cancellation_reason } = req.body;

    const { data, error } = await supabase
      .from('bookings')
      .update({
        status: 'cancelled',
        cancelled_at: new Date().toISOString(),
        cancelled_by: 'user',
        cancellation_reason,
      })
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ booking: data, message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

module.exports = router;
