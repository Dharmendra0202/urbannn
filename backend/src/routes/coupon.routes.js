const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const { authenticate } = require('../middleware/auth.middleware');

// Get all active coupons
router.get('/', async (req, res) => {
  try {
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('is_active', true)
      .lte('valid_from', now)
      .gte('valid_until', now);

    if (error) throw error;

    res.json({ coupons: data });
  } catch (error) {
    console.error('Get coupons error:', error);
    res.status(500).json({ error: 'Failed to fetch coupons' });
  }
});

// Validate coupon
router.post('/validate', authenticate, async (req, res) => {
  try {
    const { code, order_amount } = req.body;
    const now = new Date().toISOString();

    // Get coupon
    const { data: coupon, error: couponError } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .lte('valid_from', now)
      .gte('valid_until', now)
      .single();

    if (couponError || !coupon) {
      return res.status(400).json({ error: 'Invalid or expired coupon' });
    }

    // Check minimum order amount
    if (order_amount < coupon.min_order_amount) {
      return res.status(400).json({
        error: `Minimum order amount of ₹${coupon.min_order_amount} required`,
      });
    }

    // Check usage limit
    if (coupon.usage_limit && coupon.total_used >= coupon.usage_limit) {
      return res.status(400).json({ error: 'Coupon usage limit reached' });
    }

    // Check user usage
    const { data: userUsage } = await supabase
      .from('coupon_usage')
      .select('id')
      .eq('coupon_id', coupon.id)
      .eq('user_id', req.user.id);

    if (userUsage && userUsage.length >= coupon.usage_per_user) {
      return res.status(400).json({ error: 'Coupon already used' });
    }

    // Calculate discount
    let discount_amount = 0;
    if (coupon.discount_type === 'percentage') {
      discount_amount = (order_amount * coupon.discount_value) / 100;
      if (coupon.max_discount_amount) {
        discount_amount = Math.min(discount_amount, coupon.max_discount_amount);
      }
    } else {
      discount_amount = coupon.discount_value;
    }

    res.json({
      valid: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        title: coupon.title,
        discount_amount: Math.round(discount_amount * 100) / 100,
      },
    });
  } catch (error) {
    console.error('Validate coupon error:', error);
    res.status(500).json({ error: 'Failed to validate coupon' });
  }
});

module.exports = router;
