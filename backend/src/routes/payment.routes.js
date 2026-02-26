const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const razorpay = require('../config/razorpay');
const { supabase } = require('../config/supabase');
const { authenticate } = require('../middleware/auth.middleware');

// Create Razorpay order
router.post('/create-order', authenticate, async (req, res) => {
  try {
    const { booking_id, amount } = req.body;

    // Verify booking belongs to user
    const { data: booking } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', booking_id)
      .eq('user_id', req.user.id)
      .single();

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Create Razorpay order
    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency: 'INR',
      receipt: `booking_${booking_id}`,
      notes: {
        booking_id,
        user_id: req.user.id,
      },
    };

    const order = await razorpay.orders.create(options);

    // Save payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert([
        {
          booking_id,
          user_id: req.user.id,
          razorpay_order_id: order.id,
          amount,
          currency: 'INR',
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (paymentError) throw paymentError;

    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      payment_id: payment.id,
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

// Verify payment
router.post('/verify', authenticate, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      booking_id,
    } = req.body;

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    // Update payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .update({
        razorpay_payment_id,
        razorpay_signature,
        status: 'success',
        paid_at: new Date().toISOString(),
      })
      .eq('razorpay_order_id', razorpay_order_id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (paymentError) throw paymentError;

    // Update booking payment status
    await supabase
      .from('bookings')
      .update({
        payment_status: 'paid',
        status: 'confirmed',
        confirmed_at: new Date().toISOString(),
      })
      .eq('id', booking_id);

    // Create notification
    await supabase.from('notifications').insert([
      {
        user_id: req.user.id,
        title: 'Payment Successful',
        message: 'Your booking has been confirmed. We will assign a professional shortly.',
        type: 'payment',
        data: { booking_id, payment_id: payment.id },
      },
    ]);

    res.json({
      success: true,
      message: 'Payment verified successfully',
      payment,
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

// Get payment details
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*, booking:bookings(*)')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json({ payment: data });
  } catch (error) {
    console.error('Get payment error:', error);
    res.status(500).json({ error: 'Failed to fetch payment' });
  }
});

// Initiate refund
router.post('/:id/refund', authenticate, async (req, res) => {
  try {
    const { refund_reason } = req.body;

    // Get payment details
    const { data: payment } = await supabase
      .from('payments')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single();

    if (!payment || payment.status !== 'success') {
      return res.status(400).json({ error: 'Invalid payment for refund' });
    }

    // Create refund in Razorpay
    const refund = await razorpay.payments.refund(payment.razorpay_payment_id, {
      amount: Math.round(payment.amount * 100),
      notes: {
        reason: refund_reason,
      },
    });

    // Update payment record
    await supabase
      .from('payments')
      .update({
        status: 'refunded',
        refund_amount: payment.amount,
        refund_reason,
        refunded_at: new Date().toISOString(),
      })
      .eq('id', req.params.id);

    res.json({
      success: true,
      message: 'Refund initiated successfully',
      refund_id: refund.id,
    });
  } catch (error) {
    console.error('Refund error:', error);
    res.status(500).json({ error: 'Failed to process refund' });
  }
});

module.exports = router;
