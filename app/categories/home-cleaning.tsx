import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const services = [
  { name: "Kitchen Cleaning", price: 799, icon: "restaurant-outline" },
  { name: "Bathroom Cleaning", price: 699, icon: "water-outline" },
  { name: "Sofa Cleaning", price: 499, icon: "bed-outline" },
  { name: "Full Home Cleaning", price: 1499, icon: "home-outline" },
];

const professionals = [
  {
    name: "Rahul Cleaning Expert",
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/4239148/pexels-photo-4239148.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Deepak Cleaning Services",
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/6195127/pexels-photo-6195127.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function HomeCleaningScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Top Banner */}
      <LinearGradient colors={["#7C3AED", "#EC4899"]} style={styles.topBanner}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg?auto=compress&cs=tinysrgb&w=1200",
          }}
          style={styles.bannerImage}
        />

        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>Home Cleaning Experts</Text>
          <Text style={styles.bannerSubtitle}>
            Professional deep cleaning services at your doorstep
          </Text>
        </View>
      </LinearGradient>

      {/* Services */}
      <Text style={styles.sectionTitle}>Services Available</Text>

      <View style={styles.grid}>
        {services.map((item, index) => (
          <TouchableOpacity key={index} style={styles.serviceCard}>
            <Ionicons name={item.icon as any} size={32} color="#7C3AED" />
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text style={styles.price}>₹{item.price}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Middle Banner */}
      <LinearGradient colors={["#06B6D4", "#3B82F6"]} style={styles.midBanner}>
        <Text style={styles.midBannerText}>
          🎉 Book today & get 20% OFF on deep cleaning
        </Text>
      </LinearGradient>

      {/* Professionals */}
      <Text style={styles.sectionTitle}>Top Professionals</Text>

      {professionals.map((pro, index) => (
        <View key={index} style={styles.proCard}>
          <Image source={{ uri: pro.image }} style={styles.proImage} />
          <View>
            <Text style={styles.proName}>{pro.name}</Text>
            <Text style={styles.rating}>⭐ {pro.rating}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  topBanner: {
    width: width,
    height: 220,
    justifyContent: "flex-end",
  },

  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },

  bannerContent: {
    padding: 20,
  },

  bannerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  bannerSubtitle: {
    color: "#F3F4F6",
    marginTop: 6,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    margin: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  serviceCard: {
    width: "47%",
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
    marginBottom: 14,
  },

  serviceName: {
    fontWeight: "600",
    marginTop: 8,
  },

  price: {
    color: "#7C3AED",
    fontWeight: "700",
    marginTop: 4,
  },

  midBanner: {
    margin: 16,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  midBannerText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },

  proCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 12,
    borderRadius: 14,
    elevation: 2,
  },

  proImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },

  proName: {
    fontWeight: "600",
    fontSize: 15,
  },

  rating: {
    color: "#6B7280",
    marginTop: 4,
  },
});
