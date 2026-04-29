-- Service Providers Management Schema (Simplified)
-- Run this in Supabase SQL Editor

-- 1. Service Providers Table
CREATE TABLE IF NOT EXISTS service_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT NOT NULL,
  photo_url TEXT,
  specialization TEXT[] NOT NULL,
  experience_years INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.00 CHECK (rating >= 0 AND rating <= 5),
  total_jobs INTEGER DEFAULT 0,
  completed_jobs INTEGER DEFAULT 0,
  cancelled_jobs INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  availability_status TEXT DEFAULT 'available' CHECK (availability_status IN ('available', 'busy', 'offline')),
  hourly_rate DECIMAL(10,2),
  commission_rate DECIMAL(5,2) DEFAULT 20.00,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  aadhar_number TEXT,
  pan_number TEXT,
  bank_account_number TEXT,
  bank_ifsc_code TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  joined_date DATE DEFAULT CURRENT_DATE,
  last_active_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Provider Availability Schedule
CREATE TABLE IF NOT EXISTS provider_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES service_providers(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Provider Earnings
CREATE TABLE IF NOT EXISTS provider_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES service_providers(id) ON DELETE CASCADE,
  booking_id UUID NOT NULL,
  service_amount DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  provider_earning DECIMAL(10,2) NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Provider Reviews
CREATE TABLE IF NOT EXISTS provider_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES service_providers(id) ON DELETE CASCADE,
  booking_id UUID NOT NULL,
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Indexes
CREATE INDEX IF NOT EXISTS idx_providers_status ON service_providers(status);
CREATE INDEX IF NOT EXISTS idx_providers_availability ON service_providers(availability_status);
CREATE INDEX IF NOT EXISTS idx_providers_specialization ON service_providers USING GIN(specialization);
CREATE INDEX IF NOT EXISTS idx_provider_availability_provider ON provider_availability(provider_id);
CREATE INDEX IF NOT EXISTS idx_provider_earnings_provider ON provider_earnings(provider_id);
CREATE INDEX IF NOT EXISTS idx_provider_reviews_provider ON provider_reviews(provider_id);

-- 6. Enable RLS
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_reviews ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies
DROP POLICY IF EXISTS "Allow all operations on providers" ON service_providers;
DROP POLICY IF EXISTS "Allow all operations on availability" ON provider_availability;
DROP POLICY IF EXISTS "Allow all operations on earnings" ON provider_earnings;
DROP POLICY IF EXISTS "Allow all operations on reviews" ON provider_reviews;

CREATE POLICY "Allow all operations on providers" ON service_providers FOR ALL USING (true);
CREATE POLICY "Allow all operations on availability" ON provider_availability FOR ALL USING (true);
CREATE POLICY "Allow all operations on earnings" ON provider_earnings FOR ALL USING (true);
CREATE POLICY "Allow all operations on reviews" ON provider_reviews FOR ALL USING (true);

-- 8. Function to update provider rating
CREATE OR REPLACE FUNCTION update_provider_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE service_providers
  SET rating = (
    SELECT COALESCE(AVG(rating), 0)
    FROM provider_reviews
    WHERE provider_id = NEW.provider_id
  ),
  updated_at = NOW()
  WHERE id = NEW.provider_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Trigger
DROP TRIGGER IF EXISTS trigger_update_provider_rating ON provider_reviews;
CREATE TRIGGER trigger_update_provider_rating
  AFTER INSERT ON provider_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_provider_rating();

-- 10. Insert sample providers
INSERT INTO service_providers (full_name, phone, specialization, experience_years, rating, total_jobs, completed_jobs, status, availability_status, hourly_rate, city, state)
VALUES 
  ('Rajesh Kumar', '9876543210', ARRAY['cleaning', 'deep-cleaning'], 5, 4.8, 150, 145, 'active', 'available', 300, 'Mumbai', 'Maharashtra'),
  ('Priya Sharma', '9876543211', ARRAY['cleaning', 'home-cleaning'], 3, 4.9, 120, 118, 'active', 'available', 250, 'Mumbai', 'Maharashtra'),
  ('Amit Patel', '9876543212', ARRAY['plumbing', 'repair'], 7, 4.7, 200, 195, 'active', 'busy', 400, 'Mumbai', 'Maharashtra'),
  ('Sunita Verma', '9876543213', ARRAY['salon', 'beauty'], 4, 4.9, 180, 178, 'active', 'available', 350, 'Mumbai', 'Maharashtra'),
  ('Vikram Singh', '9876543214', ARRAY['electrician', 'repair'], 6, 4.6, 160, 155, 'active', 'available', 380, 'Mumbai', 'Maharashtra')
ON CONFLICT (email) DO NOTHING;
