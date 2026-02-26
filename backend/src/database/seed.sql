-- =============================================
-- SEED DATA FOR URBANNN
-- =============================================

-- Service Categories
INSERT INTO service_categories (id, name, slug, description, icon, color, display_order) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Cleaning Services', 'cleaning', 'Professional home and office cleaning', 'sparkles', '#10B981', 1),
('550e8400-e29b-41d4-a716-446655440002', 'Repair & Installation', 'repair', 'Expert repair and installation services', 'construct', '#F59E0B', 2),
('550e8400-e29b-41d4-a716-446655440003', 'Salon & Spa', 'salon-spa', 'Beauty and wellness at your doorstep', 'cut', '#EC4899', 3),
('550e8400-e29b-41d4-a716-446655440004', 'Appliance Repair', 'appliance', 'AC, refrigerator, and appliance services', 'build', '#3B82F6', 4),
('550e8400-e29b-41d4-a716-446655440005', 'Pest Control', 'pest-control', 'Complete pest management solutions', 'bug', '#EF4444', 5);

-- Services
INSERT INTO services (id, category_id, name, slug, description, short_description, base_price, discount_percentage, duration_minutes, is_featured) VALUES
-- Cleaning Services
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Home Deep Cleaning', 'home-deep-cleaning', 'Complete deep cleaning of your home including all rooms, kitchen, and bathrooms', 'Professional deep cleaning service', 2499.00, 20, 240, true),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Bathroom Cleaning', 'bathroom-cleaning', 'Thorough bathroom cleaning and sanitization', 'Deep bathroom cleaning', 499.00, 15, 60, true),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Kitchen Cleaning', 'kitchen-cleaning', 'Complete kitchen cleaning including appliances and cabinets', 'Professional kitchen cleaning', 799.00, 10, 90, false),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'Carpet Cleaning', 'carpet-cleaning', 'Deep carpet and upholstery cleaning', 'Carpet deep cleaning', 599.00, 15, 120, false),
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001', 'Sofa Cleaning', 'sofa-cleaning', 'Professional sofa and furniture cleaning', 'Sofa deep cleaning', 899.00, 10, 90, true),

-- Repair & Installation
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', 'Plumbing Services', 'plumbing', 'Expert plumbing repair and installation', 'Professional plumbing', 399.00, 0, 60, false),
('650e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002', 'Electrical Services', 'electrical', 'Licensed electrician for all electrical work', 'Electrical repair & installation', 499.00, 0, 60, false),
('650e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440002', 'Carpentry Work', 'carpentry', 'Furniture assembly and carpentry services', 'Professional carpentry', 599.00, 0, 90, false),
('650e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440002', 'Wall Painting', 'wall-painting', 'Professional wall painting and touch-ups', 'Expert painting service', 1499.00, 10, 480, true),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 'TV Wall Mounting', 'tv-mounting', 'Safe TV wall mounting service', 'TV mounting & setup', 399.00, 0, 45, false),

-- Salon & Spa
('650e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440003', 'Mens Haircut & Grooming', 'mens-salon', 'Complete mens grooming at home', 'Mens salon at home', 399.00, 20, 45, true),
('650e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440003', 'Womens Salon', 'womens-salon', 'Professional beauty services at home', 'Womens salon at home', 799.00, 25, 90, true),
('650e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440003', 'Full Body Massage', 'massage', 'Relaxing full body massage therapy', 'Professional massage', 1299.00, 15, 60, true),

-- Appliance Repair
('650e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440004', 'AC Service & Repair', 'ac-service', 'Complete AC servicing and repair', 'AC service & cleaning', 599.00, 20, 90, true),
('650e8400-e29b-41d4-a716-446655440015', '550e8400-e29b-41d4-a716-446655440004', 'Refrigerator Repair', 'fridge-repair', 'Expert refrigerator repair service', 'Fridge repair', 499.00, 10, 60, false),

-- Pest Control
('650e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440005', 'General Pest Control', 'pest-control', 'Complete pest control for home', 'Pest control service', 999.00, 15, 120, true);

-- Service Variants
INSERT INTO service_variants (service_id, name, description, price, duration_minutes) VALUES
-- Home Deep Cleaning variants
('650e8400-e29b-41d4-a716-446655440001', '1 BHK', 'Deep cleaning for 1 bedroom apartment', 1999.00, 180),
('650e8400-e29b-41d4-a716-446655440001', '2 BHK', 'Deep cleaning for 2 bedroom apartment', 2499.00, 240),
('650e8400-e29b-41d4-a716-446655440001', '3 BHK', 'Deep cleaning for 3 bedroom apartment', 3499.00, 360),

-- AC Service variants
('650e8400-e29b-41d4-a716-446655440014', 'Split AC Service', 'Service for split AC', 599.00, 90),
('650e8400-e29b-41d4-a716-446655440014', 'Window AC Service', 'Service for window AC', 499.00, 60),
('650e8400-e29b-41d4-a716-446655440014', 'AC Gas Refill', 'AC gas refilling service', 2499.00, 60);

-- Coupons
INSERT INTO coupons (code, title, description, discount_type, discount_value, max_discount_amount, min_order_amount, usage_limit, valid_from, valid_until) VALUES
('FIRST50', 'First Booking Offer', 'Get 50% off on your first booking', 'percentage', 50, 500, 299, 1000, NOW(), NOW() + INTERVAL '30 days'),
('SAVE100', 'Flat ₹100 Off', 'Get flat ₹100 off on orders above ₹500', 'fixed', 100, NULL, 500, 5000, NOW(), NOW() + INTERVAL '30 days'),
('CLEAN20', 'Cleaning Special', 'Get 20% off on all cleaning services', 'percentage', 20, 300, 499, 2000, NOW(), NOW() + INTERVAL '30 days'),
('WELCOME', 'Welcome Offer', 'Get ₹200 off on your first order', 'fixed', 200, NULL, 999, 1000, NOW(), NOW() + INTERVAL '60 days');

-- Sample Service Providers
INSERT INTO service_providers (id, full_name, phone, email, experience_years, rating, is_verified, is_active) VALUES
('750e8400-e29b-41d4-a716-446655440001', 'Rajesh Kumar', '+919876543210', 'rajesh@urbannn.app', 5, 4.8, true, true),
('750e8400-e29b-41d4-a716-446655440002', 'Priya Sharma', '+919876543211', 'priya@urbannn.app', 3, 4.9, true, true),
('750e8400-e29b-41d4-a716-446655440003', 'Amit Patel', '+919876543212', 'amit@urbannn.app', 7, 4.7, true, true),
('750e8400-e29b-41d4-a716-446655440004', 'Sneha Reddy', '+919876543213', 'sneha@urbannn.app', 4, 4.9, true, true),
('750e8400-e29b-41d4-a716-446655440005', 'Vikram Singh', '+919876543214', 'vikram@urbannn.app', 6, 4.6, true, true);

-- Map providers to services
INSERT INTO provider_services (provider_id, service_id) VALUES
-- Rajesh - Cleaning specialist
('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001'),
('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440002'),
('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440003'),

-- Priya - Salon specialist
('750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440012'),
('750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440013'),

-- Amit - Repair specialist
('750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440006'),
('750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440007'),
('750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440008'),

-- Sneha - AC & Appliance specialist
('750e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440014'),
('750e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440015'),

-- Vikram - Pest control specialist
('750e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440016');
