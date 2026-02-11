import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PestControlScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* HERO */}
        <LinearGradient colors={["#22C55E", "#16A34A"]} style={styles.hero}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/6197120/pexels-photo-6197120.jpeg",
            }}
            style={styles.heroImg}
          />
          <Text style={styles.heroTitle}>Pest Control Services</Text>
          <Text style={styles.heroSubtitle}>
            Safe & effective pest removal treatment
          </Text>
        </LinearGradient>

        {/* STEPS */}
        <Text style={styles.section}>Treatment Process</Text>

        {[
          "Inspection & Identification",
          "Chemical Safe Treatment",
          "Deep Area Protection",
          "Final Sanitization",
        ].map((step, i) => (
          <View key={i} style={styles.stepCard}>
            <Ionicons name="checkmark-circle" size={26} color="#22C55E" />
            <Text style={{ marginLeft: 10, fontWeight: "600" }}>{step}</Text>
          </View>
        ))}

        {/* SAFETY BADGES */}
        <Text style={styles.section}>Why Choose Us</Text>

        <View style={styles.badgeRow}>
          {["Child Safe Chemicals", "Certified Experts", "90-Day Warranty"].map(
            (b, i) => (
              <View key={i} style={styles.badge}>
                <Text style={{ fontWeight: "600", fontSize: 12 }}>{b}</Text>
              </View>
            ),
          )}
        </View>
      </ScrollView>

      {/* BOOK BAR */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={{ fontWeight: "700" }}>Pest Control</Text>
          <Text style={{ color: "#16A34A" }}>Starting ₹599</Text>
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
  hero: { height: 240, justifyContent: "flex-end", padding: 20 },
  heroImg: { ...StyleSheet.absoluteFillObject, opacity: 0.35 },
  heroTitle: { color: "#fff", fontSize: 24, fontWeight: "700" },
  heroSubtitle: { color: "#fff" },

  section: { fontSize: 18, fontWeight: "700", margin: 16 },

  stepCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
    borderRadius: 12,
  },

  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginTop: 10,
  },
  badge: {
    backgroundColor: "#DCFCE7",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
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
    backgroundColor: "#16A34A",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
});
