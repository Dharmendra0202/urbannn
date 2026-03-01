import { supabase } from './supabase';

const API_URL = 'https://urbannn-server.vercel.app/api'; // Backend deployed on Vercel

// Helper to get auth token
const getAuthToken = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token;
};

// Helper for authenticated requests
const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const token = await getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
};

// Auth API
export const authAPI = {
  register: async (data: {
    phone: string;
    password: string;
    full_name: string;
    email?: string;
  }) => {
    return authenticatedFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  login: async (phone: string, password: string) => {
    return authenticatedFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone, password }),
    });
  },

  sendOTP: async (phone: string) => {
    return authenticatedFetch('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
  },

  verifyOTP: async (phone: string, token: string) => {
    return authenticatedFetch('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, token }),
    });
  },

  logout: async () => {
    return authenticatedFetch('/auth/logout', {
      method: 'POST',
    });
  },
};

// User API
export const userAPI = {
  getProfile: async () => {
    return authenticatedFetch('/users/profile');
  },

  updateProfile: async (data: any) => {
    return authenticatedFetch('/users/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  getAddresses: async () => {
    return authenticatedFetch('/users/addresses');
  },

  addAddress: async (data: any) => {
    return authenticatedFetch('/users/addresses', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateAddress: async (id: string, data: any) => {
    return authenticatedFetch(`/users/addresses/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  deleteAddress: async (id: string) => {
    return authenticatedFetch(`/users/addresses/${id}`, {
      method: 'DELETE',
    });
  },
};

// Services API
export const servicesAPI = {
  getCategories: async () => {
    return authenticatedFetch('/services/categories');
  },

  getServices: async (params?: {
    category_id?: string;
    is_featured?: boolean;
    search?: string;
  }) => {
    const queryParams = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    return authenticatedFetch(`/services?${queryParams}`);
  },

  getServiceById: async (id: string) => {
    return authenticatedFetch(`/services/${id}`);
  },

  getServiceBySlug: async (slug: string) => {
    return authenticatedFetch(`/services/slug/${slug}`);
  },
};

// Bookings API
export const bookingsAPI = {
  getBookings: async () => {
    return authenticatedFetch('/bookings');
  },

  getBookingById: async (id: string) => {
    return authenticatedFetch(`/bookings/${id}`);
  },

  createBooking: async (data: {
    service_id: string;
    address_id: string;
    scheduled_date: string;
    scheduled_time: string;
    special_instructions?: string;
    items?: any[];
  }) => {
    return authenticatedFetch('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateBookingStatus: async (
    id: string,
    status: string,
    cancellation_reason?: string
  ) => {
    return authenticatedFetch(`/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, cancellation_reason }),
    });
  },

  cancelBooking: async (id: string, cancellation_reason: string) => {
    return authenticatedFetch(`/bookings/${id}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ cancellation_reason }),
    });
  },
};

// Payments API
export const paymentsAPI = {
  createOrder: async (booking_id: string, amount: number) => {
    return authenticatedFetch('/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({ booking_id, amount }),
    });
  },

  verifyPayment: async (data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    booking_id: string;
  }) => {
    return authenticatedFetch('/payments/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getPaymentById: async (id: string) => {
    return authenticatedFetch(`/payments/${id}`);
  },

  initiateRefund: async (id: string, refund_reason: string) => {
    return authenticatedFetch(`/payments/${id}/refund`, {
      method: 'POST',
      body: JSON.stringify({ refund_reason }),
    });
  },
};

// Reviews API
export const reviewsAPI = {
  getServiceReviews: async (service_id: string) => {
    return authenticatedFetch(`/reviews/service/${service_id}`);
  },

  getProviderReviews: async (provider_id: string) => {
    return authenticatedFetch(`/reviews/provider/${provider_id}`);
  },

  createReview: async (data: {
    booking_id: string;
    provider_id: string;
    service_id: string;
    rating: number;
    review_text?: string;
    professionalism_rating?: number;
    punctuality_rating?: number;
    quality_rating?: number;
  }) => {
    return authenticatedFetch('/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Coupons API
export const couponsAPI = {
  getCoupons: async () => {
    return authenticatedFetch('/coupons');
  },

  validateCoupon: async (code: string, order_amount: number) => {
    return authenticatedFetch('/coupons/validate', {
      method: 'POST',
      body: JSON.stringify({ code, order_amount }),
    });
  },
};

// Notifications API
export const notificationsAPI = {
  getNotifications: async () => {
    return authenticatedFetch('/notifications');
  },

  markAsRead: async (id: string) => {
    return authenticatedFetch(`/notifications/${id}/read`, {
      method: 'PATCH',
    });
  },

  markAllAsRead: async () => {
    return authenticatedFetch('/notifications/mark-all-read', {
      method: 'POST',
    });
  },
};
