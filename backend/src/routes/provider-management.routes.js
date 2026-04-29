const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Get all providers with filters
router.get('/providers', async (req, res) => {
  try {
    const { status, availability, specialization, search, limit = 50 } = req.query;

    let query = supabase
      .from('service_providers')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(parseInt(limit));

    if (status) {
      query = query.eq('status', status);
    }

    if (availability) {
      query = query.eq('availability_status', availability);
    }

    if (specialization) {
      query = query.contains('specialization', [specialization]);
    }

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%`);
    }

    const { data: providers, error } = await query;

    if (error) {
      console.error('Fetch providers error:', error);
      return res.status(500).json({ error: 'Failed to fetch providers' });
    }

    res.json({ providers, total: providers.length });
  } catch (error) {
    console.error('Providers error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single provider by ID
router.get('/providers/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: provider, error } = await supabase
      .from('service_providers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Fetch provider error:', error);
      return res.status(404).json({ error: 'Provider not found' });
    }

    // Get provider stats
    const { data: earnings } = await supabase
      .from('provider_earnings')
      .select('provider_earning, payment_status')
      .eq('provider_id', id);

    const { data: reviews } = await supabase
      .from('provider_reviews')
      .select('rating, review_text, customer_name, created_at')
      .eq('provider_id', id)
      .order('created_at', { ascending: false })
      .limit(10);

    const stats = {
      total_earnings: earnings?.reduce((sum, e) => sum + parseFloat(e.provider_earning || 0), 0) || 0,
      paid_earnings: earnings?.filter(e => e.payment_status === 'paid').reduce((sum, e) => sum + parseFloat(e.provider_earning || 0), 0) || 0,
      pending_earnings: earnings?.filter(e => e.payment_status === 'pending').reduce((sum, e) => sum + parseFloat(e.provider_earning || 0), 0) || 0,
      review_count: reviews?.length || 0,
    };

    res.json({ provider, stats, recent_reviews: reviews || [] });
  } catch (error) {
    console.error('Provider detail error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new provider
router.post('/providers', async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      photo_url,
      specialization,
      experience_years,
      hourly_rate,
      commission_rate,
      address,
      city,
      state,
      pincode,
      aadhar_number,
      pan_number,
      bank_account_number,
      bank_ifsc_code,
      emergency_contact_name,
      emergency_contact_phone,
      notes,
    } = req.body;

    if (!full_name || !phone || !specialization || specialization.length === 0) {
      return res.status(400).json({ 
        error: 'full_name, phone, and specialization are required' 
      });
    }

    const { data: provider, error } = await supabase
      .from('service_providers')
      .insert({
        full_name: full_name.trim(),
        email: email?.trim() || null,
        phone: phone.trim(),
        photo_url: photo_url || null,
        specialization,
        experience_years: experience_years || 0,
        hourly_rate: hourly_rate || null,
        commission_rate: commission_rate || 20.00,
        address: address?.trim() || null,
        city: city?.trim() || null,
        state: state?.trim() || null,
        pincode: pincode?.trim() || null,
        aadhar_number: aadhar_number?.trim() || null,
        pan_number: pan_number?.trim() || null,
        bank_account_number: bank_account_number?.trim() || null,
        bank_ifsc_code: bank_ifsc_code?.trim() || null,
        emergency_contact_name: emergency_contact_name?.trim() || null,
        emergency_contact_phone: emergency_contact_phone?.trim() || null,
        notes: notes?.trim() || null,
        status: 'active',
        availability_status: 'available',
      })
      .select()
      .single();

    if (error) {
      console.error('Create provider error:', error);
      return res.status(500).json({ error: 'Failed to create provider' });
    }

    res.status(201).json({ provider });
  } catch (error) {
    console.error('Create provider error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update provider
router.patch('/providers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Remove fields that shouldn't be updated directly
    delete updates.id;
    delete updates.created_at;
    delete updates.rating; // Rating is calculated from reviews
    delete updates.total_jobs; // Updated by system
    delete updates.completed_jobs; // Updated by system
    delete updates.cancelled_jobs; // Updated by system

    updates.updated_at = new Date().toISOString();

    const { data: provider, error } = await supabase
      .from('service_providers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update provider error:', error);
      return res.status(500).json({ error: 'Failed to update provider' });
    }

    res.json({ provider });
  } catch (error) {
    console.error('Update provider error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete provider
router.delete('/providers/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('service_providers')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete provider error:', error);
      return res.status(500).json({ error: 'Failed to delete provider' });
    }

    res.json({ success: true, message: 'Provider deleted successfully' });
  } catch (error) {
    console.error('Delete provider error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update provider availability status
router.patch('/providers/:id/availability', async (req, res) => {
  try {
    const { id } = req.params;
    const { availability_status } = req.body;

    if (!['available', 'busy', 'offline'].includes(availability_status)) {
      return res.status(400).json({ 
        error: 'availability_status must be available, busy, or offline' 
      });
    }

    const { data: provider, error } = await supabase
      .from('service_providers')
      .update({ 
        availability_status,
        last_active_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update availability error:', error);
      return res.status(500).json({ error: 'Failed to update availability' });
    }

    res.json({ provider });
  } catch (error) {
    console.error('Update availability error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get provider performance stats
router.get('/providers/:id/performance', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: performance, error } = await supabase
      .from('provider_performance')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Fetch performance error:', error);
      return res.status(404).json({ error: 'Provider not found' });
    }

    res.json({ performance });
  } catch (error) {
    console.error('Performance error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get available providers for a service
router.get('/providers/available/:serviceType', async (req, res) => {
  try {
    const { serviceType } = req.params;

    const { data: providers, error } = await supabase
      .from('service_providers')
      .select('id, full_name, phone, photo_url, rating, total_jobs, completed_jobs, hourly_rate')
      .eq('status', 'active')
      .eq('availability_status', 'available')
      .contains('specialization', [serviceType])
      .order('rating', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Fetch available providers error:', error);
      return res.status(500).json({ error: 'Failed to fetch providers' });
    }

    res.json({ providers });
  } catch (error) {
    console.error('Available providers error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Assign provider to booking
router.post('/providers/:id/assign', async (req, res) => {
  try {
    const { id } = req.params;
    const { booking_id } = req.body;

    if (!booking_id) {
      return res.status(400).json({ error: 'booking_id is required' });
    }

    // Update provider status to busy
    const { error: providerError } = await supabase
      .from('service_providers')
      .update({ 
        availability_status: 'busy',
        total_jobs: supabase.raw('total_jobs + 1'),
        last_active_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (providerError) {
      console.error('Assign provider error:', providerError);
      return res.status(500).json({ error: 'Failed to assign provider' });
    }

    res.json({ success: true, message: 'Provider assigned successfully' });
  } catch (error) {
    console.error('Assign provider error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
