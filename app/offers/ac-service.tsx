import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const services = [
  {
    id: "1",
    name: "AC General Service",
    price: 599,
    image: "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg",
  },
  {
    id: "2",
    name: "AC Deep Cleaning",
    price: 999,
    image: "https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg",
  },
  {
    id: "3",
    name: "Gas Refill",
    price: 1499,
    image: "https://images.pexels.com/photos/5691643/pexels-photo-5691643.jpeg",
  },
];

export default function ACServiceScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* HERO */}
        <LinearGradient colors={["#06B6D4", "#3B82F6"]} style={styles.hero}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg",
            }}
            style={styles.heroImg}
          />
          <Text style={styles.heroTitle}>AC Service & Repair</Text>
          <Text style={styles.heroSubtitle}>
            Fast cooling solutions at home
          </Text>
        </LinearGradient>

        {/* SERVICES */}
        <Text style={styles.section}>Available Services</Text>
        <FlatList
          horizontal
          data={services}
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
          <Text style={{ fontWeight: "700" }}>AC Service</Text>
          <Text style={{ color: "#3B82F6" }}>Starting ₹599</Text>
        </View>
        <TouchableOpacity
          style={styles.bottomBtn}
          onPress={() =>
            router.push({
              pathname: "/offers/mens-booking",
              params: { service: "AC Service", amount: "599" },
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

  card: {
    width: 150,
    borderRadius: 16,
    backgroundColor: "#fff",
    marginRight: 14,
    marginVertical: 4,
    elevation: 3,
    overflow: "hidden",
  },
  cardImg: { width: "100%", height: 120 },
  cardTitle: { padding: 8, fontWeight: "600" },
  price: { paddingHorizontal: 8, color: "#3B82F6", marginBottom: 8 },

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
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
});
