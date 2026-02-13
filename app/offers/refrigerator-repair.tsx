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
import { Ionicons } from "@expo/vector-icons";

/* DATA */

const repairServices = [
  {
    id: "1",
    name: "Cooling Issue Repair",
    price: 699,
    image: "https://images.pexels.com/photos/6990498/pexels-photo-6990498.jpeg",
  },
  {
    id: "2",
    name: "Gas Refill",
    price: 1199,
    image: "https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg",
  },
  {
    id: "3",
    name: "Compressor Check",
    price: 999,
    image: "https://images.pexels.com/photos/5691643/pexels-photo-5691643.jpeg",
  },
];

const technicians = [
  { id: "1", name: "Ravi Kumar", rating: 4.8 },
  { id: "2", name: "Suresh Singh", rating: 4.7 },
];

/* SCREEN */

export default function RefrigeratorRepairScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* HERO */}
        <LinearGradient colors={["#6366F1", "#3B82F6"]} style={styles.hero}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/9462630/pexels-photo-9462630.jpeg",
            }}
            style={styles.heroImg}
          />
          <Text style={styles.heroTitle}>Refrigerator Repair</Text>
          <Text style={styles.heroSubtitle}>
            Fast fridge repair at your doorstep
          </Text>
        </LinearGradient>

        {/* SERVICES */}
        <Text style={styles.section}>Repair Services</Text>
        <FlatList
          horizontal
          data={repairServices}
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

        {/* TECHNICIANS */}
        <Text style={styles.section}>Top Technicians</Text>
        {technicians.map((t) => (
          <View key={t.id} style={styles.techCard}>
            <Ionicons name="person-circle" size={46} color="#6366F1" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={{ fontWeight: "700" }}>{t.name}</Text>
              <Text>⭐ {t.rating}</Text>
            </View>
            <TouchableOpacity
              style={styles.bookBtn}
              onPress={() =>
                router.push({
                  pathname: "/offers/mens-booking",
                  params: {
                    service: `${t.name} - Refrigerator Repair`,
                    amount: "699",
                  },
                } as any)
              }
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>Book</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* BOOK BAR */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={{ fontWeight: "700" }}>Fridge Repair</Text>
          <Text style={{ color: "#6366F1" }}>Starting ₹699</Text>
        </View>
        <TouchableOpacity
          style={styles.bottomBtn}
          onPress={() =>
            router.push({
              pathname: "/offers/mens-booking",
              params: { service: "Refrigerator Repair", amount: "699" },
            } as any)
          }
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* STYLES */

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
  price: { paddingHorizontal: 8, color: "#6366F1", marginBottom: 8 },

  techCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 12,
  },
  bookBtn: { backgroundColor: "#6366F1", padding: 10, borderRadius: 10 },

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
