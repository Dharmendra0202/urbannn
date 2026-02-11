import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BathroomCleaningScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* HERO */}
        <LinearGradient colors={["#0EA5E9", "#3B82F6"]} style={styles.hero}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/4239144/pexels-photo-4239144.jpeg",
            }}
            style={styles.heroImg}
          />
          <Text style={styles.heroTitle}>Bathroom Deep Cleaning</Text>
          <Text style={styles.heroSubtitle}>
            Remove tough stains & harmful bacteria
          </Text>
        </LinearGradient>

        {/* BEFORE AFTER */}
        <Text style={styles.section}>Before & After Cleaning</Text>
        <View style={styles.compareRow}>
          <View style={styles.compareBox}>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
              }}
              style={styles.compareImg}
            />
            <Text style={styles.label}>Before</Text>
          </View>

          <View style={styles.compareBox}>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/4239144/pexels-photo-4239144.jpeg",
              }}
              style={styles.compareImg}
            />
            <Text style={styles.label}>After</Text>
          </View>
        </View>

        {/* HYGIENE BADGES */}
        <Text style={styles.section}>Service Benefits</Text>

        <View style={styles.badgeRow}>
          {["Germ Protection", "Eco Safe Chemicals", "Odor Removal"].map(
            (b, i) => (
              <View key={i} style={styles.badge}>
                <Ionicons name="shield-checkmark" size={16} color="#0EA5E9" />
                <Text style={{ marginLeft: 6, fontSize: 12 }}>{b}</Text>
              </View>
            ),
          )}
        </View>

        {/* PACKAGE */}
        <View style={styles.package}>
          <Text style={{ fontWeight: "700" }}>Bathroom Cleaning Package</Text>
          <Text style={{ color: "#0EA5E9", marginTop: 4 }}>₹699</Text>
        </View>
      </ScrollView>

      {/* BOOK BAR */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={{ fontWeight: "700" }}>Bathroom Cleaning</Text>
          <Text style={{ color: "#0EA5E9" }}>Starting ₹699</Text>
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

  compareRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
  },
  compareBox: { alignItems: "center" },
  compareImg: {
    width: 150,
    height: 120,
    borderRadius: 12,
  },
  label: { marginTop: 6, fontWeight: "600" },

  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginTop: 10,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2FE",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
  },

  package: {
    margin: 16,
    padding: 16,
    backgroundColor: "#F0F9FF",
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
    backgroundColor: "#0EA5E9",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
});
