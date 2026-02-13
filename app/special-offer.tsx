import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const offers = [
  {
    id: "1",
    title: "Luxury Home Cleaning",
    price: 1299,
    discount: "30% OFF",
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/4239147/pexels-photo-4239147.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "2",
    title: "AC Service & Maintenance",
    price: 899,
    discount: "15% OFF",
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "3",
    title: "Men’s Grooming at Home",
    price: 699,
    discount: "20% OFF",
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/3993324/pexels-photo-3993324.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "4",
    title: "Premium Spa & Massage",
    price: 1499,
    discount: "25% OFF",
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/3865792/pexels-photo-3865792.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "5",
    title: "Furniture Polishing",
    price: 599,
    discount: "10% OFF",
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/5586529/pexels-photo-5586529.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "6",
    title: "Garden & Lawn Makeover",
    price: 799,
    discount: "22% OFF",
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/4505170/pexels-photo-4505170.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

export default function PremiumOffersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F7" />

      {/* 🏷️ Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Premium Offers</Text>
        <Text style={styles.subHeading}>
          Handpicked services crafted for your comfort
        </Text>
      </View>

      {/* ✨ Offers List */}
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.cardWrapper}
onPress={() => router.push("../special-offer")}
          >
            {/* 🪄 Card Gradient */}
            <LinearGradient
              colors={["#E6F7F5", "#FFFFFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={styles.cardDetails}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>₹{item.price}</Text>
                </View>

                <View style={styles.discountBadge}>
                  <Ionicons name="pricetag" size={14} color="#fff" />
                  <Text style={styles.discountText}>{item.discount}</Text>
                </View>
              </View>

              <View style={styles.footerRow}>
                <View style={styles.ratingBox}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.rating}>{item.rating}</Text>
                </View>
                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() =>
                    router.push({
                      pathname: "/offers/mens-booking",
                      params: {
                        service: item.title,
                        amount: String(item.price),
                      },
                    } as any)
                  }
                >
                  <Text style={styles.bookText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

// 🌈 Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F7",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: "#F9F9F7",
  },
  heading: {
    fontSize: 34,
    fontWeight: "800",
    color: "#1B4332",
    marginBottom: 6,
  },
  subHeading: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "500",
  },
  cardWrapper: {
    marginHorizontal: 16,
    marginBottom: 18,
  },
  card: {
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 190,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1B4332",
    marginBottom: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0E7490",
  },
  discountBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0E7490",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingBottom: 12,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  rating: {
    fontSize: 13,
    fontWeight: "600",
    color: "#92400E",
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: "#1B4332",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  bookText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
