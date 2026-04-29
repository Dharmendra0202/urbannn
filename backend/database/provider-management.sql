-- ============================================
-- PROVIDER MANAGEMENT SYSTEM - DATABASE SCHEMA
-- ============================================
-- Run this in Supabase SQL Editor
-- This will create 4 tables for managing service providers

-- Clean up (if tables already exist)
DROP TABLE IF EXISTS provider_reviews CASCADE;
DROP TABLE IF EXISTS provider_earnings CASCADE;
DROP TABLE IF EXISTS provider_availability CASCADE;
DROP TABLE IF EXISTS service_providers CASCADE;

-- Drop indexes if they exist
DROP INDEX IF EXISTS idx_providers_status;
DROP INDEX IF EXISTS idx_providers_availability;
DROP INDEX IF EXISTS idx_providers_specialization;
DROP INDEX IF EXISTS idx_availability_provider;
DROP INDEX IF EXISTS idx_earnings_provider;
DROP INDEX IF EXISTS idx_reviews_provider;

-- ============================================
-- TABLE 1: Service Providers (Main Table)
-- ============================================
CREATE TABLE service_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT NOT NULL,
  photo_url TEXT,
  specialization TEXT[] NOT NULL,
  experience_years INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_jobs INTEGER DEFAULT 0,
  completed_jobs INTEGER DEFAULT 0,
  cancelled_jobs INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  availability_status TEXT DEFAULT 'available',
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

-- ============================================
-- TABLE 2: Provider Availability Schedule
-- ============================================
CREATE TABLE provider_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES service_providers(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE 3: Provider Earnings & Payments
-- ============================================
CREATE TABLE provider_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES service_providers(id) ON DELETE CASCADE,
  booking_id UUID NOT NULL,
  service_amount DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  provider_earning DECIMAL(10,2) NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE 4: Provider Reviews & Ratings
-- ============================================
CREATE TABLE provider_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES service_providers(id) ON DELETE CASCADE,
  booking_id UUID NOT NULL,
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL,
  review_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES (for better query performance)
-- ============================================
CREATE INDEX idx_providers_status ON service_providers(status);
CREATE INDEX idx_providers_availability ON service_providers(availability_status);
CREATE INDEX idx_providers_specialization ON service_providers USING GIN(specialization);
CREATE INDEX idx_availability_provider ON provider_availability(provider_id);
CREATE INDEX idx_earnings_provider ON provider_earnings(provider_id);
CREATE INDEX idx_reviews_provider ON provider_reviews(provider_id);

-- ============================================
-- ROW LEVEL SECURITY (Enable RLS)
-- ============================================
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_reviews ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLICIES (Allow all access for now)
-- ============================================
CREATE POLICY "Allow all on providers" ON service_providers FOR ALL USING (true);
CREATE POLICY "Allow all on availability" ON provider_availability FOR ALL USING (true);
CREATE POLICY "Allow all on earnings" ON provider_earnings FOR ALL USING (true);
CREATE POLICY "Allow all on reviews" ON provider_reviews FOR ALL USING (true);

-- ============================================
-- FUNCTION: Auto-update provider rating
-- ============================================
CREATE OR REPLACE FUNCTION update_provider_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE service_providers
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM provider_reviews
      WHERE provider_id = NEW.provider_id
    ),
    updated_at = NOW()
  WHERE id = NEW.provider_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGER: Update rating when new review added
-- ============================================
CREATE TRIGGER trigger_update_provider_rating
  AFTER INSERT ON provider_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_provider_rating();

-- ============================================
-- SAMPLE DATA: 5 Service Providers
-- ============================================
INSERT INTO service_providers (
  full_name, 
  phone, 
  specialization, 
  experience_years, 
  rating, 
  total_jobs, 
  completed_jobs, 
  status, 
  availability_status, 
  hourly_rate, 
  city, 
  state
)
VALUES 
  ('Rajesh Kumar', '9876543210', ARRAY['cleaning', 'deep-cleaning'], 5, 4.8, 150, 145, 'active', 'available', 300, 'Mumbai', 'Maharashtra'),
  ('Priya Sharma', '9876543211', ARRAY['cleaning', 'home-cleaning'], 3, 4.9, 120, 118, 'active', 'available', 250, 'Mumbai', 'Maharashtra'),
  ('Amit Patel', '9876543212', ARRAY['plumbing', 'repair'], 7, 4.7, 200, 195, 'active', 'busy', 400, 'Mumbai', 'Maharashtra'),
  ('Sunita Verma', '9876543213', ARRAY['salon', 'beauty'], 4, 4.9, 180, 178, 'active', 'available', 350, 'Mumbai', 'Maharashtra'),
  ('Vikram Singh', '9876543214', ARRAY['electrician', 'repair'], 6, 4.6, 160, 155, 'active', 'available', 380, 'Mumbai', 'Maharashtra');

-- ============================================
-- DONE! You should now have:
-- ✅ 4 tables created
-- ✅ 6 indexes created
-- ✅ 4 policies created
-- ✅ 1 function created
-- ✅ 1 trigger created
-- ✅ 5 providers inserted
-- ============================================
