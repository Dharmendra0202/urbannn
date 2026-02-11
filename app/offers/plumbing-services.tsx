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

export default function PlumbingServicesScreen() {
  const router = useRouter();

  const issues = [
    { id: "1", name: "Tap Leakage", price: 149 },
    { id: "2", name: "Pipe Repair", price: 299 },
    { id: "3", name: "Washbasin Installation", price: 399 },
    { id: "4", name: "Shower Repair", price: 199 },
    { id: "5", name: "Toilet Blockage", price: 249 },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* HERO */}
        <LinearGradient colors={["#06B6D4", "#3B82F6"]} style={styles.hero}>
          <Text style={styles.heroTitle}>Plumbing Services</Text>
          <Text style={styles.heroSubtitle}>
            Fast plumbing repairs by trained professionals
          </Text>
        </LinearGradient>

        {/* ISSUE LIST */}
        <Text style={styles.section}>Select Your Issue</Text>

        {issues.map((item) => (
          <View key={item.id} style={styles.issueCard}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="water" size={22} color="#06B6D4" />
              <Text style={{ marginLeft: 10, fontWeight: "600" }}>
                {item.name}
              </Text>
            </View>
            <Text style={{ color: "#06B6D4", fontWeight: "600" }}>
              ₹{item.price}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* BOOK BAR */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={{ fontWeight: "700" }}>Plumbing Visit</Text>
          <Text style={{ color: "#06B6D4" }}>Starting ₹149</Text>
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

  issueCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    backgroundColor: "#ECFEFF",
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    backgroundColor: "#06B6D4",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
});
