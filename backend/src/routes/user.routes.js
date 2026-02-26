const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const { authenticate } = require('../middleware/auth.middleware');

// Get user profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) throw error;

    res.json({ user: data });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.patch('/profile', authenticate, async (req, res) => {
  try {
    const { full_name, email, date_of_birth, gender, avatar_url } = req.body;

    const { data, error } = await supabase
      .from('users')
      .update({
        full_name,
        email,
        date_of_birth,
        gender,
        avatar_url,
      })
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ user: data });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get user addresses
router.get('/addresses', authenticate, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('user_addresses')
      .select('*')
      .eq('user_id', req.user.id)
      .order('is_default', { ascending: false });

    if (error) throw error;

    res.json({ addresses: data });
  } catch (error) {
    console.error('Get addresses error:', error);
    res.status(500).json({ error: 'Failed to fetch addresses' });
  }
});

// Add address
router.post('/addresses', authenticate, async (req, res) => {
  try {
    const {
      address_type,
      address_line1,
      address_line2,
      landmark,
      city,
      state,
      pincode,
      latitude,
      longitude,
      is_default,
    } = req.body;

    // If this is default, unset other defaults
    if (is_default) {
      await supabase
        .from('user_addresses')
        .update({ is_default: false })
        .eq('user_id', req.user.id);
    }

    const { data, error } = await supabase
      .from('user_addresses')
      .insert([
        {
          user_id: req.user.id,
          address_type,
          address_line1,
          address_line2,
          landmark,
          city,
          state,
          pincode,
          latitude,
          longitude,
          is_default,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ address: data });
  } catch (error) {
    console.error('Add address error:', error);
    res.status(500).json({ error: 'Failed to add address' });
  }
});

// Update address
router.patch('/addresses/:id', authenticate, async (req, res) => {
  try {
    const { is_default, ...updateData } = req.body;

    // If this is default, unset other defaults
    if (is_default) {
      await supabase
        .from('user_addresses')
        .update({ is_default: false })
        .eq('user_id', req.user.id);
    }

    const { data, error } = await supabase
      .from('user_addresses')
      .update({ ...updateData, is_default })
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ address: data });
  } catch (error) {
    console.error('Update address error:', error);
    res.status(500).json({ error: 'Failed to update address' });
  }
});

// Delete address
router.delete('/addresses/:id', authenticate, async (req, res) => {
  try {
    const { error } = await supabase
      .from('user_addresses')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id);

    if (error) throw error;

    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Delete address error:', error);
    res.status(500).json({ error: 'Failed to delete address' });
  }
});

module.exports = router;
