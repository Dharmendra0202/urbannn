import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function LaundryServiceScreen() {
  const router = useRouter();

  const steps = [
    { icon: "car-outline", title: "Free Pickup" },
    { icon: "water-outline", title: "Wash & Clean" },
    { icon: "shirt-outline", title: "Iron & Fold" },
    { icon: "home-outline", title: "Home Delivery" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* HERO */}
        <LinearGradient colors={["#3B82F6", "#06B6D4"]} style={styles.hero}>
          <Text style={styles.heroTitle}>Laundry & Ironing</Text>
          <Text style={styles.heroSubtitle}>
            Hassle-free doorstep laundry service
          </Text>
        </LinearGradient>

        {/* PROCESS TIMELINE */}
        <Text style={styles.section}>Service Process</Text>

        {steps.map((step, index) => (
          <View key={index} style={styles.stepRow}>
            <View style={styles.iconCircle}>
              <Ionicons name={step.icon as any} size={20} color="#3B82F6" />
            </View>
            <Text style={styles.stepText}>{step.title}</Text>
          </View>
        ))}

        {/* PACKAGES */}
        <Text style={styles.section}>Pricing</Text>

        <View style={styles.package}>
          <Text style={{ fontWeight: "700" }}>5 Kg Laundry Pack</Text>
          <Text style={{ color: "#3B82F6", marginTop: 4 }}>₹399</Text>
        </View>

        <View style={styles.package}>
          <Text style={{ fontWeight: "700" }}>10 Kg Laundry Pack</Text>
          <Text style={{ color: "#3B82F6", marginTop: 4 }}>₹699</Text>
        </View>
      </ScrollView>

      {/* BOOK BAR */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={{ fontWeight: "700" }}>Laundry Service</Text>
          <Text style={{ color: "#3B82F6" }}>Starting ₹399</Text>
        </View>
        <TouchableOpacity
          style={styles.bottomBtn}
          onPress={() => router.push("/offers/mens-booking" as any)}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hero: { height: 200, justifyContent: "flex-end", padding: 20 },
  heroTitle: { color: "#fff", fontSize: 24, fontWeight: "700" },
  heroSubtitle: { color: "#fff" },

  section: { fontSize: 18, fontWeight: "700", margin: 16 },

  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0F2FE",
    justifyContent: "center",
    alignItems: "center",
  },
  stepText: { marginLeft: 12, fontWeight: "600" },

  package: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  bottomBtn: {
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
});
