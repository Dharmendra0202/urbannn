// Service name to ID mapping for fallback when service_id is not provided
// This ensures backward compatibility with existing navigation calls

export const SERVICE_NAME_TO_ID_MAP: Record<string, string> = {
  // Cleaning Services
  'Home Deep Cleaning': '650e8400-e29b-41d4-a716-446655440001',
  'Bathroom Cleaning': '650e8400-e29b-41d4-a716-446655440002',
  'Kitchen Cleaning': '650e8400-e29b-41d4-a716-446655440003',
  'Carpet Cleaning': '650e8400-e29b-41d4-a716-446655440004',
  'Sofa Cleaning': '650e8400-e29b-41d4-a716-446655440005',
  
  // Repair & Installation
  'Plumbing Services': '650e8400-e29b-41d4-a716-446655440006',
  'Pipe Leakage Repair': '650e8400-e29b-41d4-a716-446655440006', // Maps to Plumbing
  'Electrical Services': '650e8400-e29b-41d4-a716-446655440007',
  'Carpentry Work': '650e8400-e29b-41d4-a716-446655440008',
  'Wall Painting': '650e8400-e29b-41d4-a716-446655440009',
  'TV Wall Mounting': '650e8400-e29b-41d4-a716-446655440010',
  
  // Salon & Spa
  'Mens Haircut & Grooming': '650e8400-e29b-41d4-a716-446655440011',
  'Mens Salon': '650e8400-e29b-41d4-a716-446655440011',
  'Womens Salon': '650e8400-e29b-41d4-a716-446655440012',
  'Full Body Massage': '650e8400-e29b-41d4-a716-446655440013',
  
  // Appliance Repair
  'AC Service & Repair': '650e8400-e29b-41d4-a716-446655440014',
  'Refrigerator Repair': '650e8400-e29b-41d4-a716-446655440015',
  
  // Pest Control
  'General Pest Control': '650e8400-e29b-41d4-a716-446655440016',
  'Pest Control': '650e8400-e29b-41d4-a716-446655440016',
  
  // Generic fallbacks
  'General Home Service': '650e8400-e29b-41d4-a716-446655440001',
  'Home Service': '650e8400-e29b-41d4-a716-446655440001',
};

// Default service ID (Mens Haircut & Grooming)
export const DEFAULT_SERVICE_ID = '650e8400-e29b-41d4-a716-446655440011';

/**
 * Get service ID from service name
 * @param serviceName - The name of the service
 * @returns The service ID or default ID if not found
 */
export function getServiceIdFromName(serviceName: string): string {
  // Try exact match first
  if (SERVICE_NAME_TO_ID_MAP[serviceName]) {
    return SERVICE_NAME_TO_ID_MAP[serviceName];
  }
  
  // Try case-insensitive partial match
  const lowerServiceName = serviceName.toLowerCase();
  for (const [name, id] of Object.entries(SERVICE_NAME_TO_ID_MAP)) {
    if (name.toLowerCase().includes(lowerServiceName) || 
        lowerServiceName.includes(name.toLowerCase())) {
      return id;
    }
  }
  
  // Return default if no match found
  console.warn(`Service ID not found for: ${serviceName}, using default`);
  return DEFAULT_SERVICE_ID;
}
