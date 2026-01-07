import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { colors, gradients } from "../theme/colors";

const { width } = Dimensions.get("window");
const cardWidth = (width - 64) / 4;

// ✅ Categories
const categories = [
  { id: 1, name: "Cleaning", icon: "sparkles-outline", gradient: gradients.purple },
  { id: 2, name: "Electrician", icon: "flash-outline", gradient: gradients.orange },
  { id: 3, name: "Plumbing", icon: "water-outline", gradient: gradients.blue },
  { id: 4, name: "AC Repair", icon: "snow-outline", gradient: gradients.blue },
  { id: 5, name: "Men’s Salon", icon: "cut-outline", gradient: gradients.green },
  { id: 6, name: "Women’s Salon", icon: "woman-outline", gradient: gradients.pink },
  { id: 7, name: "Massage & Spa", icon: "heart-outline", gradient: gradients.pink },
  { id: 8, name: "Appliance Repair", icon: "tv-outline", gradient: gradients.purple },
  { id: 9, name: "Painting", icon: "color-palette-outline", gradient: gradients.purple },
  { id: 10, name: "Pest Control", icon: "bug-outline", gradient: gradients.green },
  { id: 11, name: "Carpentry", icon: "hammer-outline", gradient: gradients.orange },
  { id: 12, name: "Gardening", icon: "leaf-outline", gradient: gradients.green },
];

// ✅ Featured Services
const featured = [
  { id: 1, title: "Deep Home Cleaning", image: "https://images.pexels.com/photos/4239148/pexels-photo-4239148.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 2, title: "AC Service & Repair", image: "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 3, title: "Pest Control", image: "https://images.pexels.com/photos/6195157/pexels-photo-6195157.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 4, title: "Hair Spa & Styling", image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 5, title: "Wall Painting", image: "https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 6, title: "Electrician Services", image: "https://images.pexels.com/photos/4792490/pexels-photo-4792490.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 7, title: "Plumbing Work", image: "https://images.pexels.com/photos/5854186/pexels-photo-5854186.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 8, title: "Massage & Spa", image: "https://images.pexels.com/photos/3865792/pexels-photo-3865792.jpeg?auto=compress&cs=tinysrgb&w=600" },
];

// ✅ Trending (10 items)
const trending = [
  { id: 1, title: "Premium Cleaning Kit", price: "₹499", image: "https://images.pexels.com/photos/5217884/pexels-photo-5217884.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 2, title: "AC Filter Replacement", price: "₹299", image: "https://images.pexels.com/photos/1289722/pexels-photo-1289722.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 3, title: "Natural Hair Spa", price: "₹899", image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 4, title: "Plumbing Tool Kit", price: "₹699", image: "https://images.pexels.com/photos/5854186/pexels-photo-5854186.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 5, title: "Sofa Deep Cleaning", price: "₹999", image: "https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 6, title: "Massage at Home", price: "₹1499", image: "https://images.pexels.com/photos/3865792/pexels-photo-3865792.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 7, title: "Gardening Essentials", price: "₹499", image: "https://images.pexels.com/photos/4505170/pexels-photo-4505170.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 8, title: "Carpet Shampoo Service", price: "₹1199", image: "https://images.pexels.com/photos/4107281/pexels-photo-4107281.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 9, title: "Haircut + Beard Combo", price: "₹499", image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 10, title: "AC Gas Refill", price: "₹1799", image: "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=600" },
];

// ✅ Special Offers (10)
const offers = [
  { id: 1, title: "Winter Sale", offer: "20% OFF", gradient: gradients.purple },
  { id: 2, title: "Festival Offer", offer: "30% OFF", gradient: gradients.orange },
  { id: 3, title: "Refer & Earn", offer: "₹500 Credit", gradient: gradients.green },
  { id: 4, title: "First Booking", offer: "₹200 OFF", gradient: gradients.pink },
  { id: 5, title: "Combo Deal", offer: "Save ₹300", gradient: gradients.blue },
  { id: 6, title: "Family Pack", offer: "25% OFF", gradient: gradients.orange },
  { id: 7, title: "AC Season Sale", offer: "10% OFF", gradient: gradients.purple },
  { id: 8, title: "Salon Special", offer: "₹100 OFF", gradient: gradients.pink },
  { id: 9, title: "Loyalty Bonus", offer: "Extra 5% OFF", gradient: gradients.green },
  { id: 10, title: "Home Makeover", offer: "15% OFF", gradient: gradients.blue },
];

// ✅ Professionals
const professionals = [
  { id: 1, name: "Ravi Sharma", rating: "4.9", role: "Electrician", image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "Neha Verma", rating: "4.8", role: "Beautician", image: "https://randomuser.me/api/portraits/women/65.jpg" },
  { id: 3, name: "Arjun Patel", rating: "4.7", role: "Cleaner", image: "https://randomuser.me/api/portraits/men/58.jpg" },
  { id: 4, name: "Riya Kapoor", rating: "4.9", role: "Hair Stylist", image: "https://randomuser.me/api/portraits/women/68.jpg" },
];

export default function CategoriesScreen() {
  const router = useRouter();
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setShouldAnimate(true);
      return () => setShouldAnimate(false);
    }, [])
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/")} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Categories</Text>
      </View>

      {/* Category Grid */}
      <View style={styles.grid}>
        {categories.map((cat, index) => (
          <MotiView
            key={cat.id}
            from={{ opacity: shouldAnimate ? 0 : 1, translateY: shouldAnimate ? 20 : 0 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: shouldAnimate ? index * 80 : 0, type: "timing" }}
          >
            <TouchableOpacity
              style={styles.categoryCard}
              activeOpacity={0.8}
              onPress={() => router.push(`/services/${cat.name.replace(/\s+/g, "")}Screen` as any)}
            >
              <LinearGradient colors={cat.gradient} style={styles.iconContainer}>
                <Ionicons name={cat.icon as any} size={26} color={colors.white} />
              </LinearGradient>
              <Text style={styles.categoryText}>{cat.name}</Text>
            </TouchableOpacity>
          </MotiView>
        ))}
      </View>

      {/* Featured */}
      <Text style={styles.sectionTitle}>Featured Services</Text>
      {featured.map((item) => (
        <TouchableOpacity key={item.id} activeOpacity={0.85} style={styles.featuredCard}>
          <ImageBackground source={{ uri: item.image }} imageStyle={{ borderRadius: 16 }} style={styles.featuredImage}>
            <LinearGradient colors={["rgba(0,0,0,0.25)", "rgba(0,0,0,0.6)"]} style={styles.overlay}>
              <Text style={styles.featuredHeading}>{item.title}</Text>
              <Text style={styles.featuredSub}>Tap to explore →</Text>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      ))}

      {/* Trending */}
      <Text style={styles.sectionTitle}>Trending Services 🔥</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 8 }}>
        {trending.map((item) => (
          <TouchableOpacity key={item.id} style={styles.trendingCard} activeOpacity={0.9}>
            <ImageBackground source={{ uri: item.image }} imageStyle={{ borderRadius: 14 }} style={styles.trendingImage}>
              <LinearGradient colors={["rgba(0,0,0,0.25)", "rgba(0,0,0,0.6)"]} style={styles.trendingOverlay}>
                <Text style={styles.trendingName}>{item.title}</Text>
                <Text style={styles.trendingPrice}>{item.price}</Text>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Offers */}
      <Text style={styles.sectionTitle}>Special Offers 💰</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {offers.map((offer) => (
          <LinearGradient key={offer.id} colors={offer.gradient} style={styles.offerCard}>
            <Text style={styles.offerTitle}>{offer.title}</Text>
            <Text style={styles.offerSubtitle}>{offer.offer}</Text>
          </LinearGradient>
        ))}
      </ScrollView>

      {/* Professionals */}
      <Text style={styles.sectionTitle}>Top Rated Professionals ⭐</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {professionals.map((pro) => (
          <View key={pro.id} style={styles.proCard}>
            <Image source={{ uri: pro.image }} style={styles.proImage} />
            <Text style={styles.proName}>{pro.name}</Text>
            <Text style={styles.proRole}>{pro.role}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color="#FACC15" />
              <Text style={styles.ratingText}>{pro.rating}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

{/* 🌿 WHY CHOOSE US — Elegant & Minimal */}
<Text style={styles.sectionTitle}>Why Choose Us 💎</Text>
<View style={styles.elegantContainer}>
  {[
    {
      icon: "shield-checkmark-outline",
      title: "Trusted Professionals",
      desc: "Skilled experts you can rely on.",
      gradient: ["#8B5CF6", "#7C3AED"],
    },
    {
      icon: "cash-outline",
      title: "Transparent Pricing",
      desc: "Clear and upfront service costs.",
      gradient: ["#3B82F6", "#06B6D4"],
    },
    {
      icon: "timer-outline",
      title: "On-Time Service",
      desc: "Punctual and efficient at every step.",
      gradient: ["#22C55E", "#16A34A"],
    },
    {
      icon: "happy-outline",
      title: "Customer Satisfaction",
      desc: "We care until you’re fully happy.",
      gradient: ["#EC4899", "#F472B6"],
    },
  ].map((item, index) => (
    <View key={index} style={styles.elegantCard}>
      <LinearGradient
colors={(item.gradient || ["#7C3AED", "#8B5CF6"]) as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.elegantIconContainer}
      >
        <Ionicons name={item.icon as any} size={22} color="#fff" />
      </LinearGradient>
      <View style={{ flex: 1 }}>
        <Text style={styles.elegantTitle}>{item.title}</Text>
        <Text style={styles.elegantDesc}>{item.desc}</Text>
      </View>
    </View>
  ))}
</View>


    </ScrollView>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16, paddingTop: 60 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backButton: { padding: 4, marginRight: 8 },
  headerTitle: { fontSize: 22, fontWeight: "700", color: colors.textPrimary },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  categoryCard: { width: cardWidth, alignItems: "center", marginBottom: 20 },
  iconContainer: { width: 65, height: 65, borderRadius: 999, justifyContent: "center", alignItems: "center", marginBottom: 6 },
  categoryText: { fontSize: 12, color: colors.textPrimary, textAlign: "center", fontWeight: "500", width: 80 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: colors.textPrimary, marginVertical: 14 },
  featuredCard: { borderRadius: 16, overflow: "hidden", marginBottom: 14 },
  featuredImage: { height: 150, borderRadius: 16, justifyContent: "flex-end" },
  overlay: { borderRadius: 16, padding: 16 },
  featuredHeading: { fontSize: 16, fontWeight: "700", color: "#fff" },
  featuredSub: { fontSize: 13, color: "#EDE9FE", marginTop: 4 },
  trendingCard: { width: 150, marginRight: 12 },
  trendingImage: { width: "100%", height: 150, justifyContent: "flex-end" },
  trendingOverlay: { borderRadius: 14, padding: 10 },
  trendingName: { fontSize: 13, fontWeight: "600", color: "#fff" },
  trendingPrice: { fontSize: 12, color: "#E5E7EB" },
  offerCard: { width: 180, padding: 16, borderRadius: 16, marginRight: 12 },
  offerTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  offerSubtitle: { color: "#fff", fontSize: 13 },
  proCard: { backgroundColor: "#fff", borderRadius: 14, alignItems: "center", padding: 10, width: 120, marginRight: 12, shadowColor: "#000", shadowOpacity: 0.05, elevation: 3 },
  proImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 8 },
  proName: { fontWeight: "600", fontSize: 13, color: "#111" },
  proRole: { fontSize: 12, color: "#6B7280" },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  ratingText: { fontSize: 12, color: "#111", marginLeft: 4 },
// 🌿 Clean & Elegant "Why Choose Us" Styles
elegantContainer: {
  backgroundColor: "#fff",
  borderRadius: 18,
  paddingVertical: 10,
  paddingHorizontal: 14,
  marginBottom: 40,
  borderWidth: 0.5,
  borderColor: "#E5E7EB",
},
elegantCard: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 10,
  borderBottomWidth: 0.5,
  borderBottomColor: "#F3F4F6",
},
elegantIconContainer: {
  width: 40,
  height: 40,
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 12,
},
elegantTitle: {
  fontSize: 15,
  fontWeight: "700",
  color: "#111827",
},
elegantDesc: {
  fontSize: 12.5,
  color: "#6B7280",
  marginTop: 2,
},


  benefitText: { marginLeft: 8, color: "#111", fontWeight: "500" },
});
