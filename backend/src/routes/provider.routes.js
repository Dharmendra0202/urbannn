const express = require('express');
const router = express.Router();
const { supabaseAdmin } = require('../config/supabase');

// Get all providers (admin — no strict auth needed since admin uses hardcoded creds)
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('service_providers')
      .select('id, business_name, phone, email, skills, rating, is_active, total_jobs_completed')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const providers = (data || []).map((p) => ({
      id: p.id,
      name: p.business_name || 'Unknown',
      phone: p.phone || '',
      email: p.email || '',
      skills: Array.isArray(p.skills) ? p.skills : [],
      rating: typeof p.rating === 'number' ? p.rating : 0,
      is_available: Boolean(p.is_active),
      total_jobs: typeof p.total_jobs_completed === 'number' ? p.total_jobs_completed : 0,
    }));

    res.json({ providers });
  } catch (error) {
    console.error('Get providers error:', error);
    res.status(500).json({ error: 'Failed to fetch providers' });
  }
});

// Add a new provider
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, skills, rating } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    const { data, error } = await supabaseAdmin
      .from('service_providers')
      .insert([{
        business_name: name,
        phone,
        email: email || null,
        skills: Array.isArray(skills) ? skills : [],
        rating: rating || 4.5,
        is_active: true,
        total_jobs_completed: 0,
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ provider: data, message: 'Provider added successfully' });
  } catch (error) {
    console.error('Add provider error:', error);
    res.status(500).json({ error: 'Failed to add provider' });
  }
});

// Toggle availability
router.patch('/:id/availability', async (req, res) => {
  try {
    const { is_available } = req.body;

    const { data, error } = await supabaseAdmin
      .from('service_providers')
      .update({ is_active: Boolean(is_available) })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ provider: data, message: 'Availability updated' });
  } catch (error) {
    console.error('Toggle availability error:', error);
    res.status(500).json({ error: 'Failed to update availability' });
  }
});

// Delete provider
router.delete('/:id', async (req, res) => {
  try {
    const { error } = await supabaseAdmin
      .from('service_providers')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({ message: 'Provider deleted successfully' });
  } catch (error) {
    console.error('Delete provider error:', error);
    res.status(500).json({ error: 'Failed to delete provider' });
  }
});

module.exports = router;
