import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

/* DATA */

const services = [
  { id: "1", name: "Fade Cut + Beard", price: 499 },
  { id: "2", name: "Classic Cut + Beard", price: 399 },
];

const professionals = [
  { id: "1", name: "Rahul Sharma", rating: 4.9 },
  { id: "2", name: "Aman Khan", rating: 4.8 },
];

const timeSlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];

/* SCREEN */

export default function MensBookingScreen() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  /* STEP 1: SERVICE */
  if (step === 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Select Service</Text>

        <FlatList
          data={services}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                setSelectedService(item);
                setStep(2);
              }}
            >
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.price}>₹{item.price}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  /* STEP 2: PROFESSIONAL */
  if (step === 2) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Select Professional</Text>

        {professionals.map((pro) => (
          <TouchableOpacity
            key={pro.id}
            style={styles.card}
            onPress={() => {
              setSelectedProfessional(pro);
              setStep(3);
            }}
          >
            <Text style={styles.cardTitle}>{pro.name}</Text>
            <Text>⭐ {pro.rating}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  /* STEP 3: TIME SLOT */
  if (step === 3) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Select Time Slot</Text>

        {timeSlots.map((slot) => (
          <TouchableOpacity
            key={slot}
            style={styles.card}
            onPress={() => {
              setSelectedSlot(slot);
              setStep(4);
            }}
          >
            <Text style={styles.cardTitle}>{slot}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  /* STEP 4: CONFIRM */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Booking</Text>

      <Text style={styles.summary}>Service: {selectedService?.name}</Text>
      <Text style={styles.summary}>
        Professional: {selectedProfessional?.name}
      </Text>
      <Text style={styles.summary}>Time: {selectedSlot}</Text>

      <TouchableOpacity style={styles.confirmBtn}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>
          Confirm & Pay ₹{selectedService?.price}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/* STYLES */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: 16,
  },
  price: {
    color: "#7C3AED",
    marginTop: 4,
  },
  summary: {
    fontSize: 16,
    marginBottom: 8,
  },
  confirmBtn: {
    marginTop: 30,
    backgroundColor: "#7C3AED",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
});
