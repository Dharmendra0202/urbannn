import { servicesAPI } from '@/lib/api';
import { useEffect, useState } from 'react';

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  base_price: number;
  discount_percentage: number;
  duration_minutes: number;
  rating: number;
  total_reviews: number;
  is_featured: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
    icon: string;
  };
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await servicesAPI.getServices();
      setServices(data.services);
      setError(null);
    } catch (err) {
      console.error('Failed to load services:', err);
      setError('Failed to load services');
      // Fallback to hardcoded data if backend fails
      const { services: fallbackServices } = await import('@/constants/home-data');
      setServices(fallbackServices as any);
    } finally {
      setLoading(false);
    }
  };

  return { services, loading, error, reload: loadServices };
}
