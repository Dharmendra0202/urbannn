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

export default function WallMountingScreen() {
  const router = useRouter();

  const steps = [
    "Professional measurement",
    "Safe drilling without wall damage",
    "Secure mounting installation",
    "Final alignment & safety check",
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* HERO */}
        <LinearGradient colors={["#6366F1", "#8B5CF6"]} style={styles.hero}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg",
            }}
            style={styles.heroImg}
          />
          <Text style={styles.heroTitle}>Wall Mounting & Drilling</Text>
          <Text style={styles.heroSubtitle}>
            TV units, shelves & frames installation
          </Text>
        </LinearGradient>

        {/* STEPS */}
        <Text style={styles.section}>Service Process</Text>
        {steps.map((s, i) => (
          <View key={i} style={styles.stepRow}>
            <Ionicons name="construct" size={20} color="#6366F1" />
            <Text style={{ marginLeft: 10, fontWeight: "600" }}>{s}</Text>
          </View>
        ))}

        {/* SAFETY CARD */}
        <View style={styles.safetyCard}>
          <Text style={{ fontWeight: "700", marginBottom: 6 }}>
            Safety Guarantee
          </Text>
          <Text style={{ color: "#6B7280" }}>
            Our professionals use proper tools and anchors ensuring strong and
            damage-free installation.
          </Text>
        </View>

        {/* PRICE */}
        <View style={styles.package}>
          <Text style={{ fontWeight: "700" }}>Wall Mounting Service</Text>
          <Text style={{ color: "#6366F1", marginTop: 4 }}>Starting ₹499</Text>
        </View>
      </ScrollView>

      {/* BOOK BAR */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={{ fontWeight: "700" }}>Installation Service</Text>
          <Text style={{ color: "#6366F1" }}>Starting ₹499</Text>
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
  hero: { height: 220, justifyContent: "flex-end", padding: 20 },
  heroImg: { ...StyleSheet.absoluteFillObject, opacity: 0.35 },
  heroTitle: { color: "#fff", fontSize: 24, fontWeight: "700" },
  heroSubtitle: { color: "#fff" },

  section: { fontSize: 18, fontWeight: "700", margin: 16 },

  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
  },

  safetyCard: {
    margin: 16,
    padding: 16,
    backgroundColor: "#EEF2FF",
    borderRadius: 14,
  },

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
    backgroundColor: "#6366F1",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
});
