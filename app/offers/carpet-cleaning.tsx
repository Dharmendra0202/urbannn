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
import { useRouter } from "expo-router";

export default function CarpetCleaningScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* HERO */}
        <LinearGradient colors={["#0EA5E9", "#6366F1"]} style={styles.hero}>
          <Text style={styles.heroTitle}>Carpet & Sofa Cleaning</Text>
          <Text style={styles.heroSubtitle}>
            Deep shampoo cleaning for spotless furniture
          </Text>
        </LinearGradient>

        {/* BEFORE AFTER */}
        <Text style={styles.section}>Before & After Results</Text>

        <View style={styles.compareRow}>
          <View style={styles.compareBox}>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/4107281/pexels-photo-4107281.jpeg",
              }}
              style={styles.compareImg}
            />
            <Text style={styles.label}>Before</Text>
          </View>

          <View style={styles.compareBox}>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg",
              }}
              style={styles.compareImg}
            />
            <Text style={styles.label}>After</Text>
          </View>
        </View>

        {/* PACKAGES */}
        <Text style={styles.section}>Cleaning Packages</Text>

        <View style={styles.package}>
          <Text style={{ fontWeight: "700" }}>Carpet Shampoo Cleaning</Text>
          <Text style={{ color: "#6366F1", marginTop: 4 }}>₹1199</Text>
        </View>

        <View style={styles.package}>
          <Text style={{ fontWeight: "700" }}>Sofa Deep Cleaning</Text>
          <Text style={{ color: "#6366F1", marginTop: 4 }}>₹999</Text>
        </View>
      </ScrollView>

      {/* BOOK BAR */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={{ fontWeight: "700" }}>Cleaning Service</Text>
          <Text style={{ color: "#6366F1" }}>Starting ₹999</Text>
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
