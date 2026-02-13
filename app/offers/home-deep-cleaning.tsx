import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function HomeDeepCleaningScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* HERO BANNER */}
        <Image
          source={{
            uri: "https://images.pexels.com/photos/4239148/pexels-photo-4239148.jpeg",
          }}
          style={styles.hero}
        />

        <View style={{ padding: 16 }}>
          <Text style={styles.title}>Home Deep Cleaning</Text>
          <Text style={styles.subtitle}>
            Professional full house cleaning with modern equipment
          </Text>
        </View>

        {/* FEATURES GRID */}
        <View style={styles.grid}>
          {[
            { icon: "sparkles", label: "Bathroom Cleaning" },
            { icon: "water", label: "Kitchen Cleaning" },
            { icon: "home", label: "Living Room" },
            { icon: "bed", label: "Bedroom Cleaning" },
          ].map((f, i) => (
            <View key={i} style={styles.featureCard}>
              <Ionicons name={f.icon as any} size={26} color="#7C3AED" />
              <Text style={{ marginTop: 6, fontWeight: "600" }}>{f.label}</Text>
            </View>
          ))}
        </View>

        {/* PACKAGE CARDS */}
        <Text style={styles.section}>Packages</Text>

        <View style={styles.packageCard}>
          <Text style={styles.packageTitle}>2 BHK Deep Cleaning</Text>
          <Text style={styles.packagePrice}>₹2999</Text>
        </View>

        <View style={styles.packageCard}>
          <Text style={styles.packageTitle}>3 BHK Deep Cleaning</Text>
          <Text style={styles.packagePrice}>₹3999</Text>
        </View>

        {/* PROMO */}
        <LinearGradient colors={["#7C3AED", "#A855F7"]} style={styles.promo}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>
            Free Sofa Cleaning with First Booking
          </Text>
        </LinearGradient>
      </ScrollView>

      {/* BOOK BAR */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={{ fontWeight: "700" }}>Home Cleaning</Text>
          <Text style={{ color: "#7C3AED" }}>Starting ₹2999</Text>
        </View>
        <TouchableOpacity
          style={styles.bottomBtn}
          onPress={() =>
            router.push({
              pathname: "/offers/mens-booking",
              params: { service: "Home Deep Cleaning", amount: "2999" },
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
  hero: {
    width: "100%",
    height: 240,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    marginTop: 6,
    color: "#6B7280",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  featureCard: {
    width: (width - 48) / 2,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },

  section: {
    marginTop: 16,
    marginLeft: 16,
    fontWeight: "700",
    fontSize: 18,
  },

  packageCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 14,
    elevation: 2,
  },
  packageTitle: {
    fontWeight: "700",
  },
  packagePrice: {
    color: "#7C3AED",
    marginTop: 4,
  },

  promo: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
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
    backgroundColor: "#7C3AED",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
});
