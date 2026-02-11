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
import { useRouter } from "expo-router";

export default function ACRepairScreen() {
  const router = useRouter();

  const packages = [
    {
      id: "1",
      title: "Basic AC Service",
      price: 499,
      features: ["Filter cleaning", "Gas pressure check", "General inspection"],
    },
    {
      id: "2",
      title: "Standard Service",
      price: 799,
      features: [
        "Deep coil cleaning",
        "Filter wash",
        "Cooling performance test",
      ],
    },
    {
      id: "3",
      title: "Premium Service",
      price: 1199,
      features: [
        "Jet wash cleaning",
        "Full internal cleaning",
        "Performance optimization",
      ],
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* HERO */}
        <LinearGradient colors={["#22C55E", "#16A34A"]} style={styles.hero}>
          <Text style={styles.heroTitle}>AC Repair & Service</Text>
          <Text style={styles.heroSubtitle}>
            Reliable cooling solutions by experts
          </Text>
        </LinearGradient>

        {/* PACKAGES */}
        <Text style={styles.section}>Choose Service Package</Text>

        {packages.map((pkg) => (
          <View key={pkg.id} style={styles.packageCard}>
            <Text style={styles.packageTitle}>{pkg.title}</Text>
            <Text style={styles.packagePrice}>₹{pkg.price}</Text>

            {pkg.features.map((f, i) => (
              <Text key={i} style={styles.feature}>
                • {f}
              </Text>
            ))}

            <TouchableOpacity style={styles.selectBtn}>
              <Text style={{ color: "#fff", fontWeight: "600" }}>Select</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* BOOK BAR */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={{ fontWeight: "700" }}>AC Service Visit</Text>
          <Text style={{ color: "#16A34A" }}>Starting ₹499</Text>
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

  packageCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 18,
    borderRadius: 14,
    backgroundColor: "#F0FDF4",
  },
  packageTitle: { fontWeight: "700", fontSize: 16 },
  packagePrice: {
    color: "#16A34A",
    fontWeight: "700",
    marginVertical: 6,
    fontSize: 16,
  },
  feature: { marginTop: 2, color: "#374151" },

  selectBtn: {
    marginTop: 12,
    backgroundColor: "#16A34A",
    paddingVertical: 10,
    borderRadius: 10,
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
    backgroundColor: "#16A34A",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
});
