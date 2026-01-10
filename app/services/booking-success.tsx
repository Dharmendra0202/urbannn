// app/services/booking-success.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function BookingSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        {...({
          colors: ["#7C3AED", "#A855F7"],
          start: { x: 0, y: 0 },
          end: { x: 1, y: 1 },
          style: styles.headerGradient,
        } as any)}
      >
        <Ionicons name="checkmark-circle" size={80} color="#fff" />
        <Text style={styles.headerTitle}>Booking Confirmed 🎉</Text>
        <Text style={styles.headerSubtitle}>
          Thank you for choosing our services! We’ll be in touch shortly.
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
          }}
          style={styles.image}
        />
        <Text style={styles.message}>
          Sit back and relax — our team will arrive on time to provide your
          selected service 🧹⚡💆‍♂️
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/")}
          style={styles.buttonContainer}
        >
          <LinearGradient
            {...({
              colors: ["#6366F1", "#8B5CF6"],
              start: { x: 0, y: 0 },
              end: { x: 1, y: 1 },
              style: styles.buttonGradient,
            } as any)}
          >
            <Ionicons name="home-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Back to Home</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  headerGradient: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    marginTop: 10,
  },
  headerSubtitle: {
    color: "#E0E7FF",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 180,
    height: 180,
    marginTop: 20,
    marginBottom: 20,
  },
  message: {
    fontSize: 15,
    color: "#374151",
    textAlign: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    width: "70%",
    borderRadius: 12,
    overflow: "hidden",
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});
