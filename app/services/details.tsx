// app/services/details.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function ServiceDetails() {
  const { title, desc, color } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        {...({
          colors: [(color as string) || "#6366F1", "#A855F7"],
          start: { x: 0, y: 0 },
          end: { x: 1, y: 1 },
          style: styles.headerGradient,
        } as any)}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{desc}</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Service Overview</Text>
        <Text style={styles.details}>
          Our professional team ensures complete quality and reliability for
          every service. Tap below to proceed with booking and enjoy a
          hassle-free experience!
        </Text>

        <TouchableOpacity
          style={[
            styles.bookButton,
            { backgroundColor: (color as string) || "#6366F1" },
          ]}
          onPress={() => router.push("/services/booking" as any)}
        >
          <Text style={styles.bookText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  headerGradient: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: { fontSize: 22, fontWeight: "800", color: "#fff", marginTop: 10 },
  subtitle: { fontSize: 14, color: "#E0E7FF", marginTop: 4 },
  content: { padding: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  details: { fontSize: 14, color: "#6B7280", lineHeight: 20, marginBottom: 30 },
  bookButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  bookText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
