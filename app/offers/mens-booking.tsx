import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBookings } from "../../context/BookingsContext";

const professionalOptions = [
  { id: "pro-1", name: "Auto Assign Team", rating: "4.8" },
  { id: "pro-2", name: "Anita Service Team", rating: "4.9" },
  { id: "pro-3", name: "Ravi Pro Team", rating: "4.7" },
];

const paymentOptions = [
  { id: "pay-1", label: "Pay after service", icon: "cash-outline" },
  { id: "pay-2", label: "UPI", icon: "phone-portrait-outline" },
  { id: "pay-3", label: "Card", icon: "card-outline" },
];

type DateOption = {
  id: string;
  value: string;
  isToday: boolean;
  isoDate: string;
};

const toIsoLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getDateOptions = (): DateOption[] => {
  const today = new Date();

  return Array.from({ length: 6 }).map((_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);

    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    const day = date.toLocaleDateString("en-US", { day: "2-digit" });
    const month = date.toLocaleDateString("en-US", { month: "short" });

    return {
      id: `date-${index}`,
      value: `${weekday}, ${day} ${month}`,
      isToday: index === 0,
      isoDate: toIsoLocalDate(date),
    };
  });
};

const slotOptions = [
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "01:00 PM - 03:00 PM",
  "03:00 PM - 05:00 PM",
  "05:00 PM - 07:00 PM",
];

const getStringParam = (
  value: string | string[] | undefined,
  fallback: string,
): string => {
  if (Array.isArray(value)) {
    return value[0] ?? fallback;
  }

  return value ?? fallback;
};

const to24Hour = (timeLabel: string) => {
  const [time, meridiem] = timeLabel.trim().split(" ");
  const [hourValue, minuteValue] = time.split(":");

  let hours = Number(hourValue);
  const minutes = Number(minuteValue);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return { hours: 9, minutes: 0 };
  }

  if (meridiem === "PM" && hours < 12) {
    hours += 12;
  }
  if (meridiem === "AM" && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
};

const buildScheduledAt = (isoDate: string, slot: string) => {
  const slotStart = slot.split("-")[0]?.trim() ?? "09:00 AM";
  const { hours, minutes } = to24Hour(slotStart);
  const scheduledDate = new Date(`${isoDate}T00:00:00`);
  scheduledDate.setHours(hours, minutes, 0, 0);
  return scheduledDate.toISOString();
};

export default function MensBookingScreen() {
  const router = useRouter();
  const { addBooking } = useBookings();
  const [bookingLoading, setBookingLoading] = useState(false);
  const params = useLocalSearchParams<{ service?: string | string[]; amount?: string | string[] }>();
  const dateOptions = useMemo(() => getDateOptions(), []);

  const bookingService = getStringParam(params.service, "Home Service Booking");
  const rawAmount = Number(getStringParam(params.amount, "499"));
  const serviceAmount = !Number.isNaN(rawAmount) && rawAmount > 0 ? rawAmount : 499;

  const [selectedProfessionalId, setSelectedProfessionalId] = useState("pro-1");
  const [selectedDateId, setSelectedDateId] = useState("date-0");
  const [selectedSlot, setSelectedSlot] = useState(slotOptions[0]);
  const [selectedPaymentId, setSelectedPaymentId] = useState("pay-1");
  
  // Payment details states
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [notes, setNotes] = useState("");

  const selectedProfessional = professionalOptions.find(
    (item) => item.id === selectedProfessionalId,
  );
  const selectedDate = dateOptions.find((item) => item.id === selectedDateId);
  const selectedPayment = paymentOptions.find((item) => item.id === selectedPaymentId);

  const convenienceFee = 0;
  const totalAmount = serviceAmount;

  const isFormValid =
    fullName.trim().length >= 2 &&
    phone.trim().length >= 10 &&
    address.trim().length >= 8 &&
    !!selectedDate &&
    !!selectedSlot;

  // Debug: Log form state
  console.log('Form validation:', {
    fullName: fullName.trim().length,
    phone: phone.trim().length,
    address: address.trim().length,
    hasDate: !!selectedDate,
    hasSlot: !!selectedSlot,
    isValid: isFormValid
  });

  const handleConfirm = async () => {
    if (!isFormValid) {
      Alert.alert("Incomplete details", "Please fill all required booking details.");
      return;
    }

    if (!selectedDate) {
      Alert.alert("Missing date", "Please select a valid service date.");
      return;
    }

    const scheduledAt = buildScheduledAt(selectedDate.isoDate, selectedSlot);

    setBookingLoading(true);

    try {
      console.log("Creating booking...");
      console.log("API URL:", 'http://192.168.0.100:3001/api/bookings/guest/address');

      // Create address first (guest user flow)
      const addressResponse = await fetch('http://192.168.0.100:3001/api/bookings/guest/address', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          full_name: fullName.trim(),
          phone: phone.trim(),
          address_line1: address.trim(),
          landmark: landmark.trim() || null,
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
        }),
      });

      console.log("Address response status:", addressResponse.status);

      if (!addressResponse.ok) {
        const errorData = await addressResponse.json();
        console.error("Address error:", errorData);
        throw new Error(errorData.error || 'Failed to save address');
      }

      const { address_id, user_id } = await addressResponse.json();
      console.log("Address created:", address_id, "User:", user_id);

      // Create booking
      console.log("Creating booking with service_id:", "650e8400-e29b-41d4-a716-446655440011");
      const bookingResponse = await fetch('http://192.168.0.100:3001/api/bookings/guest', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          service_id: "650e8400-e29b-41d4-a716-446655440011",
          address_id,
          scheduled_date: selectedDate.isoDate,
          scheduled_time: selectedSlot,
          special_instructions: notes.trim() || null,
          customer_name: fullName.trim(),
          customer_phone: phone.trim(),
        }),
      });

      console.log("Booking response status:", bookingResponse.status);

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json();
        console.error("Booking error:", errorData);
        throw new Error(errorData.error || 'Failed to create booking');
      }

      const { booking } = await bookingResponse.json();
      console.log("Booking created:", booking.id);

      // Save to local context
      addBooking({
        id: booking.id,
        serviceName: bookingService,
        scheduledAt,
        dateLabel: selectedDate.value,
        slot: selectedSlot,
        customerName: fullName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        landmark: landmark.trim() || undefined,
        notes: notes.trim() || undefined,
        professionalName: selectedProfessional?.name ?? "Auto Assign Team",
        paymentLabel: selectedPayment?.label ?? "Pay after service",
        amount: serviceAmount,
        convenienceFee,
        totalAmount,
        status: booking.status,
      });

      setBookingLoading(false);

      router.push({
        pathname: "/services/booking-success",
        params: {
          service: bookingService,
          date: selectedDate.value,
          slot: selectedSlot,
          bookingId: booking.id,
        },
      } as any);

    } catch (error: any) {
      setBookingLoading(false);
      console.error("Booking error:", error);
      Alert.alert(
        "Booking Failed",
        error.message || "Could not create booking. Please try again."
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <LinearGradient colors={["#0B3B4A", "#0F766E"]} style={styles.headerCard}>
            <Text style={styles.headerTag}>BOOKING CHECKOUT</Text>
            <Text style={styles.headerTitle}>Schedule your service</Text>
            <Text style={styles.headerSubtitle}>
              Choose your slot, share address details, and confirm in one step.
            </Text>
          </LinearGradient>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Service selected</Text>
            <View style={styles.selectedServiceCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.selectedServiceTitle} numberOfLines={2}>{bookingService}</Text>
                <Text style={styles.selectedServiceMeta}>Picked from previous page</Text>
              </View>
              <Text style={styles.selectedServicePrice}>₹{serviceAmount}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Choose professional</Text>
            {professionalOptions.map((item) => {
              const active = item.id === selectedProfessionalId;

              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.optionCard, active && styles.optionCardActive]}
                  onPress={() => setSelectedProfessionalId(item.id)}
                  activeOpacity={0.85}
                >
                  <View style={styles.optionTextWrap}>
                    <Text style={styles.optionTitle}>{item.name}</Text>
                    <Text style={styles.optionMeta}>Rating {item.rating}</Text>
                  </View>
                  <Ionicons
                    name={active ? "radio-button-on" : "radio-button-off"}
                    size={20}
                    color={active ? "#0F766E" : "#64748B"}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Customer details</Text>
            <TextInput
              style={styles.input}
              placeholder="Full name"
              placeholderTextColor="#94A3B8"
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
            />
            <TextInput
              style={[styles.input, styles.inputTall]}
              placeholder="Full service address"
              placeholderTextColor="#94A3B8"
              multiline
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Landmark (optional)"
              placeholderTextColor="#94A3B8"
              value={landmark}
              onChangeText={setLandmark}
            />
            <TextInput
              style={[styles.input, styles.inputTall]}
              placeholder="Special instructions (optional)"
              placeholderTextColor="#94A3B8"
              multiline
              value={notes}
              onChangeText={setNotes}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Select date</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipRow}
            >
              {dateOptions.map((item) => {
                const active = selectedDateId === item.id;

                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() => setSelectedDateId(item.id)}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {item.isToday ? "Today" : item.value}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <Text style={[styles.sectionTitle, styles.subSectionTitle]}>5. Select time slot</Text>
            <View style={styles.slotGrid}>
              {slotOptions.map((item) => {
                const active = selectedSlot === item;

                return (
                  <TouchableOpacity
                    key={item}
                    style={[styles.slotCard, active && styles.slotCardActive]}
                    onPress={() => setSelectedSlot(item)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.slotText, active && styles.slotTextActive]}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Payment mode</Text>
            {paymentOptions.map((item) => {
              const active = selectedPaymentId === item.id;

              return (
                <View key={item.id}>
                  <TouchableOpacity
                    style={[styles.optionCard, active && styles.optionCardActive]}
                    onPress={() => setSelectedPaymentId(item.id)}
                  >
                    <View style={styles.optionTextWrapInline}>
                      <Ionicons name={item.icon as any} size={18} color="#0F172A" />
                      <Text style={styles.optionTitle}>{item.label}</Text>
                    </View>
                    <Ionicons
                      name={active ? "radio-button-on" : "radio-button-off"}
                      size={20}
                      color={active ? "#0F766E" : "#64748B"}
                    />
                  </TouchableOpacity>
                  
                  {/* UPI Details */}
                  {active && item.id === "pay-2" && (
                    <View style={styles.paymentDetailsCard}>
                      <Text style={styles.paymentDetailsLabel}>Enter UPI ID</Text>
                      <TextInput
                        value={upiId}
                        onChangeText={setUpiId}
                        placeholder="example@upi"
                        placeholderTextColor="#94A3B8"
                        style={styles.paymentInput}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                      <Text style={styles.paymentHint}>
                        Enter your UPI ID (e.g., yourname@paytm, yourname@gpay)
                      </Text>
                    </View>
                  )}
                  
                  {/* Card Details */}
                  {active && item.id === "pay-3" && (
                    <View style={styles.paymentDetailsCard}>
                      <Text style={styles.paymentDetailsLabel}>Card Number</Text>
                      <TextInput
                        value={cardNumber}
                        onChangeText={(text) => {
                          // Format card number with spaces
                          const cleaned = text.replace(/\s/g, '');
                          const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
                          setCardNumber(formatted);
                        }}
                        placeholder="1234 5678 9012 3456"
                        placeholderTextColor="#94A3B8"
                        style={styles.paymentInput}
                        keyboardType="number-pad"
                        maxLength={19}
                      />
                      
                      <View style={styles.cardDetailsRow}>
                        <View style={styles.cardDetailHalf}>
                          <Text style={styles.paymentDetailsLabel}>Expiry (MM/YY)</Text>
                          <TextInput
                            value={cardExpiry}
                            onChangeText={(text) => {
                              // Format expiry as MM/YY
                              const cleaned = text.replace(/\D/g, '');
                              if (cleaned.length >= 2) {
                                setCardExpiry(cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4));
                              } else {
                                setCardExpiry(cleaned);
                              }
                            }}
                            placeholder="MM/YY"
                            placeholderTextColor="#94A3B8"
                            style={styles.paymentInput}
                            keyboardType="number-pad"
                            maxLength={5}
                          />
                        </View>
                        
                        <View style={styles.cardDetailHalf}>
                          <Text style={styles.paymentDetailsLabel}>CVV</Text>
                          <TextInput
                            value={cardCvv}
                            onChangeText={setCardCvv}
                            placeholder="123"
                            placeholderTextColor="#94A3B8"
                            style={styles.paymentInput}
                            keyboardType="number-pad"
                            maxLength={3}
                            secureTextEntry
                          />
                        </View>
                      </View>
                      
                      <Text style={styles.paymentHint}>
                        Your card details are secure and encrypted
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Booking summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service</Text>
              <Text style={styles.summaryValue}>{bookingService}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Professional</Text>
              <Text style={styles.summaryValue}>{selectedProfessional?.name}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Visit slot</Text>
              <Text style={styles.summaryValue}>
                {selectedDate?.value} | {selectedSlot}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service charge</Text>
              <Text style={styles.summaryValue}>₹{serviceAmount}</Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryTotalRow]}>
              <Text style={styles.summaryTotalLabel}>Total</Text>
              <Text style={styles.summaryTotalValue}>₹{totalAmount}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomBar}>
          <View>
            <Text style={styles.bottomLabel}>Payable amount</Text>
            <Text style={styles.bottomPrice}>₹{totalAmount}</Text>
            <Text style={{ color: '#94A3B8', fontSize: 10, marginTop: 2 }}>
              {isFormValid ? '✓ Ready' : '✗ Fill form'}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.confirmButton, (!isFormValid || bookingLoading) && styles.confirmButtonDisabled]}
            onPress={handleConfirm}
            activeOpacity={0.9}
            disabled={!isFormValid || bookingLoading}
          >
            <Text style={styles.confirmButtonText}>
              {bookingLoading ? "Processing..." : "Confirm Booking"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },
  flex: { flex: 1 },
  scrollContent: { paddingBottom: 120 },
  headerCard: {
    margin: 14,
    borderRadius: 22,
    padding: 18,
  },
  headerTag: {
    color: "#A7F3D0",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  headerTitle: {
    color: "#FFFFFF",
    marginTop: 8,
    fontSize: 28,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: "#CCFBF1",
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginTop: 12,
    marginHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DCE4EE",
    backgroundColor: "#FFFFFF",
    padding: 14,
  },
  sectionTitle: {
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 10,
  },
  subSectionTitle: {
    marginTop: 8,
  },
  selectedServiceCard: {
    borderWidth: 1,
    borderColor: "#A7F3D0",
    borderRadius: 12,
    backgroundColor: "#ECFDF5",
    padding: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  selectedServiceTitle: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "700",
    flexWrap: "wrap",
  },
  selectedServiceMeta: {
    color: "#065F46",
    marginTop: 3,
    fontSize: 12,
  },
  selectedServicePrice: {
    color: "#0F766E",
    fontSize: 18,
    fontWeight: "800",
  },
  optionCard: {
    borderWidth: 1,
    borderColor: "#DCE4EE",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    padding: 12,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  optionCardActive: {
    borderColor: "#14B8A6",
    backgroundColor: "#ECFEFF",
  },
  optionTextWrap: { flex: 1 },
  optionTextWrapInline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  optionTitle: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "700",
  },
  optionMeta: {
    color: "#64748B",
    marginTop: 3,
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DCE4EE",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 9,
    color: "#0F172A",
    fontSize: 14,
    backgroundColor: "#FFFFFF",
  },
  inputTall: {
    minHeight: 72,
    textAlignVertical: "top",
  },
  chipRow: {
    paddingBottom: 6,
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#DCE4EE",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: "#FFFFFF",
  },
  chipActive: {
    borderColor: "#0F766E",
    backgroundColor: "#D1FAE5",
  },
  chipText: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "700",
  },
  chipTextActive: {
    color: "#065F46",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    gap: 10,
  },
  summaryLabel: {
    color: "#64748B",
    fontSize: 13,
  },
  summaryValue: {
    flex: 1,
    textAlign: "right",
    color: "#0F172A",
    fontSize: 13,
    fontWeight: "700",
  },
  summaryTotalRow: {
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    marginTop: 3,
    paddingTop: 10,
  },
  summaryTotalLabel: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "800",
  },
  summaryTotalValue: {
    color: "#0F766E",
    fontSize: 18,
    fontWeight: "800",
  },
  bottomBar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 10,
    borderRadius: 16,
    backgroundColor: "#0F172A",
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomLabel: {
    color: "#94A3B8",
    fontSize: 12,
  },
  bottomPrice: {
    color: "#F8FAFC",
    fontSize: 20,
    fontWeight: "800",
  },
  confirmButton: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 12,
  },
  confirmButtonDisabled: {
    backgroundColor: "#86EFAC",
  },
  confirmButtonText: {
    color: "#052E16",
    fontSize: 14,
    fontWeight: "800",
  },
  paymentDetailsCard: {
    marginTop: 12,
    marginHorizontal: 0,
    padding: 16,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  paymentDetailsLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  paymentInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#0F172A",
    marginBottom: 12,
  },
  paymentHint: {
    fontSize: 12,
    color: "#64748B",
    marginTop: -6,
  },
  cardDetailsRow: {
    flexDirection: "row",
    gap: 12,
  },
  cardDetailHalf: {
    flex: 1,
  },
  slotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  slotCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  slotCardActive: {
    backgroundColor: "#F0FDF4",
    borderColor: "#10B981",
    borderWidth: 2,
  },
  slotText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
    textAlign: "center",
  },
  slotTextActive: {
    color: "#047857",
    fontWeight: "700",
  },
});
