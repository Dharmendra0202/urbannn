const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');

// Register with phone
router.post('/register', async (req, res) => {
  try {
    const { phone, password, full_name, email } = req.body;

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      phone,
      password,
      options: {
        data: {
          full_name,
          email,
        },
      },
    });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    // Create user profile
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id,
          phone,
          full_name,
          email,
        },
      ])
      .select()
      .single();

    if (userError) {
      return res.status(400).json({ error: userError.message });
    }

    res.status(201).json({
      user: userData,
      session: authData.session,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login with phone
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      phone,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // Get user profile
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    res.json({
      user: userData,
      session: data.session,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Send OTP
router.post('/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;

    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, token } = req.body;

    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Get or create user profile
    let { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (!userData) {
      const { data: newUser } = await supabase
        .from('users')
        .insert([
          {
            id: data.user.id,
            phone,
            full_name: phone,
          },
        ])
        .select()
        .single();
      userData = newUser;
    }

    res.json({
      user: userData,
      session: data.session,
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ error: 'OTP verification failed' });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

module.exports = router;
