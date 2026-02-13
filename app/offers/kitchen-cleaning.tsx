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

export default function KitchenCleaningScreen() {
  const router = useRouter();

  const checklist = [
    "Gas stove deep cleaning",
    "Cabinet exterior cleaning",
    "Sink stain removal",
    "Chimney exterior cleaning",
    "Tile degreasing",
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* HERO */}
        <LinearGradient colors={["#F59E0B", "#F97316"]} style={styles.hero}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/5854186/pexels-photo-5854186.jpeg",
            }}
            style={styles.heroImg}
          />
          <Text style={styles.heroTitle}>Kitchen Deep Cleaning</Text>
          <Text style={styles.heroSubtitle}>
            Remove grease, stains & bacteria effectively
          </Text>
        </LinearGradient>

        {/* CHECKLIST */}
        <Text style={styles.section}>What’s Included</Text>

        {checklist.map((item, i) => (
          <View key={i} style={styles.row}>
            <Ionicons name="checkmark-circle" size={22} color="#F97316" />
            <Text style={{ marginLeft: 10, fontWeight: "600" }}>{item}</Text>
          </View>
        ))}

        {/* PACKAGE */}
        <View style={styles.package}>
          <Text style={{ fontWeight: "700" }}>Kitchen Cleaning Package</Text>
          <Text style={{ color: "#F97316", marginTop: 4 }}>₹799</Text>
        </View>
      </ScrollView>

      {/* BOOK BAR */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={{ fontWeight: "700" }}>Kitchen Cleaning</Text>
          <Text style={{ color: "#F97316" }}>Starting ₹799</Text>
        </View>
        <TouchableOpacity
          style={styles.bottomBtn}
          onPress={() =>
            router.push({
              pathname: "/offers/mens-booking",
              params: { service: "Kitchen Deep Cleaning", amount: "799" },
            } as any)
          }
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

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 10,
  },

  package: {
    margin: 16,
    padding: 16,
    backgroundColor: "#FFF7ED",
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
    backgroundColor: "#F97316",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
});
