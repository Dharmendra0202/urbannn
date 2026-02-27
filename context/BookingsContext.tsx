import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export type BookingStatus = "upcoming" | "completed" | "cancelled";

export type ServiceBooking = {
  id: string;
  serviceName: string;
  scheduledAt: string;
  dateLabel: string;
  slot: string;
  customerName: string;
  phone: string;
  address: string;
  landmark?: string;
  notes?: string;
  professionalName: string;
  paymentLabel: string;
  amount: number;
  convenienceFee: number;
  totalAmount: number;
  status: BookingStatus;
  createdAt: string;
  rating?: number;
};

type NewBookingInput = {
  serviceName: string;
  scheduledAt: string;
  dateLabel: string;
  slot: string;
  customerName: string;
  phone: string;
  address: string;
  landmark?: string;
  notes?: string;
  professionalName: string;
  paymentLabel: string;
  amount: number;
  convenienceFee: number;
  totalAmount: number;
};

type RescheduleInput = {
  scheduledAt: string;
  dateLabel: string;
  slot: string;
};

type BookingsContextType = {
  bookings: ServiceBooking[];
  addBooking: (payload: NewBookingInput) => string;
  cancelBooking: (id: string) => void;
  completeBooking: (id: string) => void;
  rescheduleBooking: (id: string, payload: RescheduleInput) => void;
  rateBooking: (id: string, rating: number) => void;
  getEffectiveStatus: (booking: ServiceBooking) => BookingStatus;
  getBookingsByStatus: (status: BookingStatus) => ServiceBooking[];
};

const COMPLETION_DELAY_MS = 2 * 60 * 60 * 1000;

const BookingsContext = createContext<BookingsContextType | undefined>(undefined);

const generateBookingId = () =>
  `bk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

export const BookingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookings, setBookings] = useState<ServiceBooking[]>([]);

  const getEffectiveStatus = useCallback((booking: ServiceBooking): BookingStatus => {
    // Simply return the actual status - don't auto-complete based on time
    return booking.status;
  }, []);

  const addBooking = useCallback((payload: NewBookingInput) => {
    const id = generateBookingId();

    setBookings((prev) => [
      {
        ...payload,
        id,
        status: "upcoming",
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    return id;
  }, []);

  const cancelBooking = useCallback((id: string) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === id ? { ...booking, status: "cancelled" } : booking)),
    );
  }, []);

  const completeBooking = useCallback((id: string) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === id ? { ...booking, status: "completed" } : booking)),
    );
  }, []);

  const rescheduleBooking = useCallback((id: string, payload: RescheduleInput) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              ...payload,
              status: "upcoming",
            }
          : booking,
      ),
    );
  }, []);

  const rateBooking = useCallback((id: string, rating: number) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === id ? { ...booking, rating } : booking)),
    );
  }, []);

  const getBookingsByStatus = useCallback(
    (status: BookingStatus) =>
      bookings.filter((booking) => getEffectiveStatus(booking) === status).sort((a, b) => {
        const aTime = new Date(a.scheduledAt).getTime();
        const bTime = new Date(b.scheduledAt).getTime();

        return status === "upcoming" ? aTime - bTime : bTime - aTime;
      }),
    [bookings, getEffectiveStatus],
  );

  const value = useMemo(
    () => ({
      bookings,
      addBooking,
      cancelBooking,
      completeBooking,
      rescheduleBooking,
      rateBooking,
      getEffectiveStatus,
      getBookingsByStatus,
    }),
    [
      bookings,
      addBooking,
      cancelBooking,
      completeBooking,
      rescheduleBooking,
      rateBooking,
      getEffectiveStatus,
      getBookingsByStatus,
    ],
  );

  return <BookingsContext.Provider value={value}>{children}</BookingsContext.Provider>;
};

export const useBookings = () => {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error("useBookings must be used within a BookingsProvider");
  }
  return context;
};
