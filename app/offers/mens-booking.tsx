import React, { useState } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

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

const getDateOptions = () => {
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

export default function MensBookingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ service?: string | string[]; amount?: string | string[] }>();

  const bookingService = getStringParam(params.service, "Home Service Booking");
  const rawAmount = Number(getStringParam(params.amount, "499"));
  const serviceAmount = !Number.isNaN(rawAmount) && rawAmount > 0 ? rawAmount : 499;

  const [selectedProfessionalId, setSelectedProfessionalId] = useState("pro-1");
  const [selectedDateId, setSelectedDateId] = useState("date-0");
  const [selectedSlot, setSelectedSlot] = useState(slotOptions[0]);
  const [selectedPaymentId, setSelectedPaymentId] = useState("pay-1");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [notes, setNotes] = useState("");

  const selectedProfessional = professionalOptions.find(
    (item) => item.id === selectedProfessionalId,
  );
  const selectedDate = getDateOptions().find((item) => item.id === selectedDateId);

  const convenienceFee = 49;
  const totalAmount = serviceAmount + convenienceFee;

  const isFormValid =
    fullName.trim().length >= 2 &&
    phone.trim().length >= 10 &&
    address.trim().length >= 8 &&
    !!selectedDate &&
    !!selectedSlot;

  const handleConfirm = () => {
    if (!isFormValid) {
      Alert.alert("Incomplete details", "Please fill all required booking details.");
      return;
    }

    router.push("/services/booking-success" as any);
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
              <View>
                <Text style={styles.selectedServiceTitle}>{bookingService}</Text>
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
              {getDateOptions().map((item) => {
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
            {slotOptions.map((item) => {
              const active = selectedSlot === item;

              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.optionCard, active && styles.optionCardActive]}
                  onPress={() => setSelectedSlot(item)}
                >
                  <Text style={styles.optionTitle}>{item}</Text>
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
            <Text style={styles.sectionTitle}>6. Payment mode</Text>
            {paymentOptions.map((item) => {
              const active = selectedPaymentId === item.id;

              return (
                <TouchableOpacity
                  key={item.id}
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
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Convenience fee</Text>
              <Text style={styles.summaryValue}>₹{convenienceFee}</Text>
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
          </View>
          <TouchableOpacity
            style={[styles.confirmButton, !isFormValid && styles.confirmButtonDisabled]}
            onPress={handleConfirm}
            activeOpacity={0.9}
          >
            <Text style={styles.confirmButtonText}>Confirm Booking</Text>
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
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  selectedServiceTitle: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "700",
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
});
