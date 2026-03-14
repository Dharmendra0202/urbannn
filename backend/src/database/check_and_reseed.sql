-- Step 1: Check what's currently in the tables
SELECT 'service_categories' as table_name, COUNT(*) as row_count FROM service_categories
UNION ALL
SELECT 'services', COUNT(*) FROM services
UNION ALL
SELECT 'service_providers', COUNT(*) FROM service_providers;
