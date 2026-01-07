import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function CleaningScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cleaning Services</Text>
      </View>

      {/* Body */}
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.subtitle}>Choose from our top-rated cleaning options:</Text>

        <View style={styles.card}>
          <Ionicons name="home-outline" size={28} color="#A855F7" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.cardTitle}>Full Home Cleaning</Text>
            <Text style={styles.cardSubtitle}>Deep cleaning for your entire home</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons name="bed-outline" size={28} color="#7C3AED" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.cardTitle}>Bedroom Cleaning</Text>
            <Text style={styles.cardSubtitle}>Dusting, mopping & sanitization</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons name="water-outline" size={28} color="#3B82F6" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.cardTitle}>Bathroom Cleaning</Text>
            <Text style={styles.cardSubtitle}>Tiles, toilet & basin deep cleaning</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: { marginRight: 12 },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#111827" },
  scroll: { padding: 16 },
  subtitle: { fontSize: 14, color: "#6B7280", marginBottom: 16 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#111" },
  cardSubtitle: { fontSize: 13, color: "#6B7280" },
});
