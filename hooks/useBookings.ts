import { useAuth } from '@/context/AuthContext';
import { bookingsAPI } from '@/lib/api';
import { useState } from 'react';

export interface CreateBookingData {
  service_id: string;
  address_id: string;
  scheduled_date: string;
  scheduled_time: string;
  special_instructions?: string;
}

export function useBookings() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (data: CreateBookingData) => {
    if (!session) {
      throw new Error('You must be logged in to create a booking');
    }

    try {
      setLoading(true);
      setError(null);
      const result = await bookingsAPI.createBooking(data);
      return result.booking;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create booking';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getBookings = async () => {
    if (!session) {
      throw new Error('You must be logged in to view bookings');
    }

    try {
      setLoading(true);
      setError(null);
      const result = await bookingsAPI.getBookings();
      return result.bookings;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to load bookings';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string, reason: string) => {
    if (!session) {
      throw new Error('You must be logged in to cancel a booking');
    }

    try {
      setLoading(true);
      setError(null);
      const result = await bookingsAPI.cancelBooking(bookingId, reason);
      return result.booking;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to cancel booking';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    createBooking,
    getBookings,
    cancelBooking,
    loading,
    error,
  };
}
