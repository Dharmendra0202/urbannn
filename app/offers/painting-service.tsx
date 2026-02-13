import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

/* COLOR OPTIONS */

const colors = [
  "#7C3AED",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#3B82F6",
  "#EC4899",
];

const paintingPackages = [
  {
    id: "1",
    name: "1 Room Painting",
    price: 2499,
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
  },
  {
    id: "2",
    name: "2 BHK Full Painting",
    price: 8999,
    image: "https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg",
  },
];

export default function PaintingServiceScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* HERO */}
        <LinearGradient colors={["#F97316", "#EF4444"]} style={styles.hero}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
            }}
            style={styles.heroImg}
          />
          <Text style={styles.heroTitle}>Home Painting</Text>
          <Text style={styles.heroSubtitle}>
            Refresh your walls with premium colors
          </Text>
        </LinearGradient>

        {/* COLOR PALETTE */}
        <Text style={styles.section}>Choose Color Theme</Text>
        <View style={styles.paletteRow}>
          {colors.map((c, i) => (
            <View
              key={i}
              style={[styles.colorCircle, { backgroundColor: c }]}
            />
          ))}
        </View>

        {/* PACKAGES */}
        <Text style={styles.section}>Painting Packages</Text>
        <FlatList
          horizontal
          data={paintingPackages}
          keyExtractor={(i) => i.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 16 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.cardImg} />
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.price}>₹{item.price}</Text>
            </View>
          )}
        />
      </ScrollView>

      {/* BOOK BAR */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={{ fontWeight: "700" }}>Painting Service</Text>
          <Text style={{ color: "#EF4444" }}>Starting ₹2499</Text>
        </View>
        <TouchableOpacity
          style={styles.bottomBtn}
          onPress={() =>
            router.push({
              pathname: "/offers/mens-booking",
              params: { service: "Home Painting Service", amount: "2499" },
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
  hero: { height: 240, justifyContent: "flex-end", padding: 20 },
  heroImg: { ...StyleSheet.absoluteFillObject, opacity: 0.35 },
  heroTitle: { color: "#fff", fontSize: 24, fontWeight: "700" },
  heroSubtitle: { color: "#fff" },

  section: { fontSize: 18, fontWeight: "700", margin: 16 },

  paletteRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginBottom: 10,
  },
  colorCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  card: {
    width: 160,
    borderRadius: 16,
    backgroundColor: "#fff",
    marginRight: 14,
    marginVertical: 4,
    elevation: 3,
    overflow: "hidden",
  },
  cardImg: { width: "100%", height: 120 },
  cardTitle: { padding: 8, fontWeight: "600" },
  price: { paddingHorizontal: 8, color: "#EF4444", marginBottom: 8 },

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
    backgroundColor: "#EF4444",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
});
