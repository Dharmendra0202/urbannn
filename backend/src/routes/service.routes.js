const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');

// Get all service categories
router.get('/categories', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('service_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;

    res.json({ categories: data });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get all services
router.get('/', async (req, res) => {
  try {
    const { category_id, is_featured, search } = req.query;

    let query = supabase
      .from('services')
      .select('*, category:service_categories(*)')
      .eq('is_active', true);

    if (category_id) {
      query = query.eq('category_id', category_id);
    }

    if (is_featured === 'true') {
      query = query.eq('is_featured', true);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data, error } = await query.order('rating', { ascending: false });

    if (error) throw error;

    res.json({ services: data });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Get service by ID
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        category:service_categories(*),
        variants:service_variants(*)
      `)
      .eq('id', req.params.id)
      .eq('is_active', true)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({ service: data });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// Get service by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        category:service_categories(*),
        variants:service_variants(*)
      `)
      .eq('slug', req.params.slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({ service: data });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

module.exports = router;
