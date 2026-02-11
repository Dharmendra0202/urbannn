import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";


const { width } = Dimensions.get("window");

/* ===============================
   DATA
================================ */

const haircutStyles = [
  {
    id: "1",
    name: "Fade Cut",
    price: 299,
    image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
  },
  {
    id: "2",
    name: "Undercut",
    price: 349,
    image: "https://images.pexels.com/photos/3998393/pexels-photo-3998393.jpeg",
  },
  {
    id: "3",
    name: "Classic Cut",
    price: 249,
    image: "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg",
  },
  {
    id: "4",
    name: "Textured Crop",
    price: 399,
    image: "https://images.pexels.com/photos/769739/pexels-photo-769739.jpeg",
  },
  {
    id: "5",
    name: "Pompadour",
    price: 449,
    image: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
  },
  {
    id: "6",
    name: "Buzz Cut",
    price: 199,
    image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
  },
];

const beardStyles = [
  {
    id: "1",
    name: "French Beard",
    price: 199,
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
  },
  {
    id: "2",
    name: "Full Beard Shape",
    price: 249,
    image: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
  },
  {
    id: "3",
    name: "Royal Beard",
    price: 299,
    image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
  },
  {
    id: "4",
    name: "Goatee Style",
    price: 199,
    image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
  },
];

const professionals = [
  {
    id: "1",
    name: "Rahul Sharma",
    rating: 4.9,
    image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
  },
  {
    id: "2",
    name: "Aman Khan",
    rating: 4.8,
    image: "https://images.pexels.com/photos/3998393/pexels-photo-3998393.jpeg",
  },
  {
    id: "3",
    name: "Rohit Verma",
    rating: 4.7,
    image: "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg",
  },
];

/* ===============================
   SCREEN
================================ */

export default function MensHaircutScreen() {
    const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* HERO */}
        <LinearGradient colors={["#7C3AED", "#EC4899"]} style={styles.hero}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
            }}
            style={styles.heroImg}
          />
          <Text style={styles.heroTitle}>Men’s Haircut & Beard</Text>
          <Text style={styles.heroSubtitle}>Professional grooming at home</Text>
        </LinearGradient>

        {/* HAIRCUT STYLES */}
        <Text style={styles.section}>Haircut Styles</Text>
        <FlatList
          horizontal
          data={haircutStyles}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.cardImg} />
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.price}>₹{item.price}</Text>
            </View>
          )}
        />

        {/* MID BANNER */}
        <LinearGradient colors={["#06B6D4", "#3B82F6"]} style={styles.banner}>
          <Text style={styles.bannerText}>Flat 20% OFF First Booking</Text>
        </LinearGradient>

        {/* BEARD */}
        <Text style={styles.section}>Beard Styling</Text>
        <FlatList
          horizontal
          data={beardStyles}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.cardImg} />
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.price}>₹{item.price}</Text>
            </View>
          )}
        />

        {/* SECOND BANNER */}
        <LinearGradient colors={["#F97316", "#F59E0B"]} style={styles.banner}>
          <Text style={styles.bannerText}>Festival Grooming Offers Live</Text>
        </LinearGradient>

        {/* PROFESSIONALS */}
        <Text style={styles.section}>Top Professionals</Text>
        {professionals.map((p) => (
          <View key={p.id} style={styles.proCard}>
            <Image source={{ uri: p.image }} style={styles.proImg} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "700" }}>{p.name}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={{ marginLeft: 4 }}>{p.rating}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.bottomBtn}
              onPress={() => router.push("/offers/mens-booking" as any)}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>Book Now</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* PACKAGES */}
        <Text style={styles.section}>Packages</Text>
        <View style={styles.package}>
          <Text style={{ fontWeight: "700" }}>Haircut + Beard Combo</Text>
          <Text style={{ color: "#7C3AED", marginTop: 4 }}>₹499</Text>
        </View>
        <View style={styles.package}>
          <Text style={{ fontWeight: "700" }}>Premium Grooming Package</Text>
          <Text style={{ color: "#7C3AED", marginTop: 4 }}>₹899</Text>
        </View>

        {/* REVIEWS */}
        <Text style={styles.section}>Reviews</Text>
        <View style={styles.review}>
          <Text style={{ fontWeight: "600" }}>Rahul</Text>
          <Text style={{ color: "#6B7280" }}>
            Excellent service, highly recommended.
          </Text>
        </View>
        <View style={styles.review}>
          <Text style={{ fontWeight: "600" }}>Amit</Text>
          <Text style={{ color: "#6B7280" }}>Very professional barber.</Text>
        </View>
      </ScrollView>

      {/* STICKY BOOK BAR */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={{ fontWeight: "700" }}>Haircut + Beard</Text>
          <Text style={{ color: "#7C3AED" }}>₹499</Text>
        </View>
        <TouchableOpacity
          style={styles.bottomBtn}
          onPress={() => router.push("/offers/mens-booking" as any)}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ===============================
   STYLES
================================ */

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
    marginVertical: 4, // ✅ vertical padding applied
    elevation: 3,
    overflow: "hidden",
  },
  cardImg: { width: "100%", height: 120 },
  cardTitle: { padding: 8, fontWeight: "600" },
  price: { paddingHorizontal: 8, color: "#7C3AED", marginBottom: 8 },

  banner: { margin: 16, padding: 22, borderRadius: 16, alignItems: "center" },
  bannerText: { color: "#fff", fontWeight: "700" },

  proCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    paddingLeft: 12,
    marginVertical: 4, // ✅ vertical padding added here also
    padding: 12,
    borderRadius: 14,
    elevation: 2,
  },
  proImg: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },

  bookBtn: { backgroundColor: "#7C3AED", padding: 10, borderRadius: 10 },

  package: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
  },
  review: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
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
    backgroundColor: "#7C3AED",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
});
