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
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

/* DATA */

const massageTypes = [
  {
    id: "1",
    name: "Swedish Massage",
    price: 999,
    image: "https://images.pexels.com/photos/3865792/pexels-photo-3865792.jpeg",
  },
  {
    id: "2",
    name: "Deep Tissue Massage",
    price: 1199,
    image: "https://images.pexels.com/photos/6628790/pexels-photo-6628790.jpeg",
  },
  {
    id: "3",
    name: "Aroma Therapy",
    price: 1299,
    image: "https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg",
  },
];

const therapists = [
  {
    id: "1",
    name: "Rahul Singh",
    rating: 4.9,
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
  },
  {
    id: "2",
    name: "Aman Verma",
    rating: 4.8,
    image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
  },
];

export default function MassageScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* HERO */}
        <LinearGradient colors={["#06B6D4", "#3B82F6"]} style={styles.hero}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/3865792/pexels-photo-3865792.jpeg",
            }}
            style={styles.heroImg}
          />
          <Text style={styles.heroTitle}>Full Body Massage</Text>
          <Text style={styles.heroSubtitle}>Relax & rejuvenate at home</Text>
        </LinearGradient>

        {/* MASSAGE TYPES */}
        <Text style={styles.section}>Massage Types</Text>
        <FlatList
          horizontal
          data={massageTypes}
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

        {/* MID BANNER */}
        <LinearGradient colors={["#F59E0B", "#F97316"]} style={styles.banner}>
          <Text style={styles.bannerText}>Flat 15% OFF First Session</Text>
        </LinearGradient>

        {/* THERAPISTS */}
        <Text style={styles.section}>Top Therapists</Text>
        {therapists.map((t) => (
          <View key={t.id} style={styles.proCard}>
            <Image source={{ uri: t.image }} style={styles.proImg} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "700" }}>{t.name}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={{ marginLeft: 4 }}>{t.rating}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.bookBtn}
              onPress={() =>
                router.push({
                  pathname: "/offers/mens-booking",
                  params: {
                    service: `${t.name} - Full Body Massage`,
                    amount: "999",
                  },
                } as any)
              }
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>Book</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* STICKY BOOK BAR */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={{ fontWeight: "700" }}>Massage Session</Text>
          <Text style={{ color: "#3B82F6" }}>Starting ₹999</Text>
        </View>
        <TouchableOpacity
          style={styles.bottomBtn}
          onPress={() =>
            router.push({
              pathname: "/offers/mens-booking",
              params: { service: "Full Body Massage", amount: "999" },
            } as any)
          }
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* STYLES */

const styles = StyleSheet.create({
  hero: { height: 260, justifyContent: "flex-end", padding: 20 },
  heroImg: { ...StyleSheet.absoluteFillObject, opacity: 0.35 },
  heroTitle: { color: "#fff", fontSize: 26, fontWeight: "700" },
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

  banner: { margin: 16, padding: 22, borderRadius: 16, alignItems: "center" },
  bannerText: { color: "#fff", fontWeight: "700" },

  proCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 12,
    borderRadius: 14,
    elevation: 2,
  },
  proImg: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },

  bookBtn: { backgroundColor: "#3B82F6", padding: 10, borderRadius: 10 },

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
