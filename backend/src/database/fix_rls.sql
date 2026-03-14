-- Allow public read access to services and categories
-- These are not sensitive - anyone should be able to browse services

CREATE POLICY "Anyone can view active services" ON services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view active categories" ON service_categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view active providers" ON service_providers
  FOR SELECT USING (is_active = true);
