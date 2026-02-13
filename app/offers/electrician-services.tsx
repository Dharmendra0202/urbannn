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

export default function ElectricianServicesScreen() {
  const router = useRouter();

  const services = [
    { id: "1", name: "Fan Installation", price: 199, icon: "construct" },
    { id: "2", name: "Switch Repair", price: 149, icon: "flash" },
    { id: "3", name: "Light Installation", price: 149, icon: "bulb" },
    { id: "4", name: "Wiring Repair", price: 299, icon: "cable" },
    {
      id: "5",
      name: "Socket Replacement",
      price: 199,
      icon: "battery-charging",
    },
    { id: "6", name: "Door Bell Fix", price: 149, icon: "notifications" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* HERO */}
        <LinearGradient colors={["#F97316", "#EF4444"]} style={styles.hero}>
          <Text style={styles.heroTitle}>Electrician Services</Text>
          <Text style={styles.heroSubtitle}>
            Fast electrical repair & installation at home
          </Text>
        </LinearGradient>

        {/* SERVICES GRID */}
        <Text style={styles.section}>Available Services</Text>

        <View style={styles.grid}>
          {services.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card}>
              <Ionicons
                name={item.icon as any}
                size={28}
                color="#F97316"
                style={{ marginBottom: 6 }}
              />
              <Text style={{ fontWeight: "600", textAlign: "center" }}>
                {item.name}
              </Text>
              <Text style={{ color: "#F97316", marginTop: 4 }}>
                ₹{item.price}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* BOOK BAR */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={{ fontWeight: "700" }}>Electrician Visit</Text>
          <Text style={{ color: "#F97316" }}>Starting ₹149</Text>
        </View>
        <TouchableOpacity
          style={styles.bottomBtn}
          onPress={() =>
            router.push({
              pathname: "/offers/mens-booking",
              params: { service: "Electrician Visit", amount: "149" },
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
  hero: { height: 200, justifyContent: "flex-end", padding: 20 },
  heroTitle: { color: "#fff", fontSize: 24, fontWeight: "700" },
  heroSubtitle: { color: "#fff" },

  section: { fontSize: 18, fontWeight: "700", margin: 16 },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  card: {
    width: "48%",
    backgroundColor: "#FFF7ED",
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
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
    backgroundColor: "#F97316",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
});
