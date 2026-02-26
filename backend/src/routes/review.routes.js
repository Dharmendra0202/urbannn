const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const { authenticate } = require('../middleware/auth.middleware');

// Get reviews for a service
router.get('/service/:service_id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        user:users(id, full_name, avatar_url),
        provider:service_providers(id, full_name)
      `)
      .eq('service_id', req.params.service_id)
      .eq('is_visible', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ reviews: data });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get reviews for a provider
router.get('/provider/:provider_id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        user:users(id, full_name, avatar_url),
        service:services(id, name)
      `)
      .eq('provider_id', req.params.provider_id)
      .eq('is_visible', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ reviews: data });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Create review
router.post('/', authenticate, async (req, res) => {
  try {
    const {
      booking_id,
      provider_id,
      service_id,
      rating,
      review_text,
      professionalism_rating,
      punctuality_rating,
      quality_rating,
    } = req.body;

    // Verify booking belongs to user and is completed
    const { data: booking } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', booking_id)
      .eq('user_id', req.user.id)
      .eq('status', 'completed')
      .single();

    if (!booking) {
      return res.status(400).json({ error: 'Invalid booking for review' });
    }

    // Check if review already exists
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('booking_id', booking_id)
      .eq('user_id', req.user.id)
      .single();

    if (existingReview) {
      return res.status(400).json({ error: 'Review already submitted' });
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          booking_id,
          user_id: req.user.id,
          provider_id,
          service_id,
          rating,
          review_text,
          professionalism_rating,
          punctuality_rating,
          quality_rating,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ review: data });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

module.exports = router;
