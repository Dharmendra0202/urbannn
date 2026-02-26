-- Create a default guest user for bookings without authentication
-- This should be run in Supabase SQL Editor

-- First, create an auth user (you'll need to do this in Supabase dashboard or via admin API)
-- For now, we'll just create the user record with a fixed UUID

INSERT INTO users (id, phone, full_name, email)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  '0000000000',
  'Guest User',
  'guest@urbannn.app'
)
ON CONFLICT (id) DO NOTHING;

-- Create a default address for guest user
INSERT INTO user_addresses (user_id, address_type, address_line1, city, state, pincode, is_default)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'home',
  'Guest Address',
  'Mumbai',
  'Maharashtra',
  '400001',
  true
)
ON CONFLICT DO NOTHING;
