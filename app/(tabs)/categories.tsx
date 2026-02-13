import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { Easing } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const cardWidth = (width - 64) / 4;

// 🎨 Theme Colors
const colors = {
  background: "#F9FAFB",
  textPrimary: "#0F172A",
  textSecondary: "#64748B",
  white: "#FFFFFF",
  accent: "#7C3AED", // purple accent
  blue: "#06B6D4",
  teal: "#3B82F6",
  gradientStart: "#06B6D4",
  gradientEnd: "#3B82F6",
};

// ✅ Gradients
const gradients: Record<string, [string, string]> = {
  blue: ["#06B6D4", "#3B82F6"],
  teal: ["#14B8A6", "#0EA5E9"],
  purple: ["#A855F7", "#7C3AED"],
  pink: ["#EC4899", "#F472B6"],
  orange: ["#F59E0B", "#F97316"],
};

// ✅ Categories
const categories = [
  {
    id: 1,
    name: "Home Cleaning",
    icon: "sparkles-outline",
    gradient: gradients.blue,
  },
  {
    id: 2,
    name: "Electrician",
    icon: "flash-outline",
    gradient: gradients.orange,
  },
  { id: 3, name: "Plumbing", icon: "water-outline", gradient: gradients.teal },
  { id: 4, name: "AC Repair", icon: "snow-outline", gradient: gradients.blue },
  {
    id: 5,
    name: "Men’s Salon",
    icon: "cut-outline",
    gradient: gradients.purple,
  },
  {
    id: 6,
    name: "Women’s Salon",
    icon: "woman-outline",
    gradient: gradients.pink,
  },
  {
    id: 7,
    name: "Massage & Spa",
    icon: "heart-outline",
    gradient: gradients.pink,
  },
  {
    id: 8,
    name: "Appliance Repair",
    icon: "tv-outline",
    gradient: gradients.teal,
  },
];

// ✅ Featured Services
const featured = [
  {
    id: 1,
    title: "Deep Cleaning",
    image:
      "https://images.pexels.com/photos/4239148/pexels-photo-4239148.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "AC Repair",
    image:
      "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "Salon at Home",
    image:
      "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

// ✅ Offers
const offers = [
  { id: 1, title: "🎉 20% OFF on First Booking", colors: gradients.blue },
  { id: 2, title: "💆 Free Add-on with Spa Services", colors: gradients.pink },
  { id: 3, title: "💡 ₹100 Cashback on AC Repairs", colors: gradients.teal },
];

// ✅ Professionals
const professionals = [
  {
    id: 1,
    name: "Ravi Sharma",
    job: "Electrician",
    rating: "4.9",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 2,
    name: "Anita Verma",
    job: "Beautician",
    rating: "4.8",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    id: 3,
    name: "Karan Patel",
    job: "Plumber",
    rating: "4.7",
    image: "https://randomuser.me/api/portraits/men/43.jpg",
  },
  {
    id: 4,
    name: "Priya Singh",
    job: "Cleaner",
    rating: "4.9",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
  },
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 160 }}
      showsVerticalScrollIndicator={false}
    >
      {/* 🏠 Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <View>
          <Text style={styles.greeting}>Hey there 👋</Text>
          <Text style={styles.headerTitle}>Find trusted experts near you</Text>
        </View>
      </View>

      {/* 🌈 Hero Banner */}
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.banner}
      >
        <View>
          <Text style={styles.bannerTitle}>Book Home Services Easily 🏡</Text>
          <Text style={styles.bannerSub}>
            Reliable professionals, just a tap away
          </Text>
        </View>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
          }}
          style={styles.bannerImage}
        />
      </LinearGradient>

      {/* 💫 Categories */}
      <Text style={styles.sectionTitle}>Explore Categories</Text>
      <View style={styles.grid}>
        {categories.map((cat, index) => (
          <MotiView
            key={cat.id}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              delay: shouldAnimate ? index * 80 : 0,
              type: "timing",
              duration: 500,
              easing: Easing.out(Easing.ease),
            }}
          >
            <TouchableOpacity
              style={styles.categoryCard}
              activeOpacity={0.9}
              onPress={() => {
                const routeMap: Record<string, string> = {
                  "Home Cleaning": "/services/CleaningScreen",
                  Electrician: "/services/ElectricianScreen",
                  Plumbing: "/services/PlumbingScreen",
                  "AC Repair": "/services/ACRepairScreen",
                  "Men’s Salon": "/services/MensSalonScreen",
                  "Women’s Salon": "/services/WomensSalonScreen",
                  "Massage & Spa": "/services/MassageSpaScreen",
                  "Appliance Repair": "/services/ApplianceRepairScreen",
                };

                const route = routeMap[cat.name];
                if (route) router.push(route as any);
              }}
            >
              <LinearGradient
                colors={[...cat.gradient]}
                style={styles.iconContainer}
              >
                <Ionicons
                  name={cat.icon as any}
                  size={26}
                  color={colors.white}
                />
              </LinearGradient>
              <Text style={styles.categoryText}>{cat.name}</Text>
            </TouchableOpacity>
          </MotiView>
        ))}
      </View>

      {/* 🎁 Offers */}
      <Text style={styles.sectionTitle}>Special Offers 🎁</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {offers.map((offer) => (
          <LinearGradient
            key={offer.id}
            colors={offer.colors}
            style={styles.offerCard}
          >
            <Text style={styles.offerText}>{offer.title}</Text>
          </LinearGradient>
        ))}
      </ScrollView>

      {/* 🌟 Featured Services */}
      <Text style={styles.sectionTitle}>Featured Services</Text>
      {featured.map((item, i) => (
        <MotiView
          key={item.id}
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: i * 150, duration: 600 }}
        >
          <TouchableOpacity activeOpacity={0.9} style={styles.featuredCard}>
            <ImageBackground
              source={{ uri: item.image }}
              imageStyle={{ borderRadius: 16 }}
              style={styles.featuredImage}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.6)"]}
                style={styles.overlay}
              >
                <Text style={styles.featuredHeading}>{item.title}</Text>
                <Text style={styles.featuredSub}>Tap to explore →</Text>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        </MotiView>
      ))}

      {/* 🏅 Professionals */}
      <Text style={styles.sectionTitle}>Top Rated Professionals ⭐</Text>
      <FlatList
        horizontal
        data={professionals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.proCard}>
            <Image source={{ uri: item.image }} style={styles.proImage} />
            <Text style={styles.proName}>{item.name}</Text>
            <Text style={styles.proJob}>{item.job}</Text>
            <View style={styles.proRating}>
              <Ionicons name="star" color="#FACC15" size={14} />
              <Text style={styles.proRatingText}>{item.rating}</Text>
            </View>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />

      {/* 🌟 New Sections */}
      <Text style={styles.sectionTitle}>🔥 Trending Now</Text>
      <LinearGradient colors={gradients.teal} style={styles.trendingCard}>
        <Text style={styles.trendingText}>
          AC Servicing, Deep Cleaning, Home Spa
        </Text>
      </LinearGradient>

      <Text style={styles.sectionTitle}>💬 What Our Customers Say</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[
          "“Amazing experience!”",
          "“Fast & professional!”",
          "“Highly recommended 👏”",
        ].map((review, i) => (
          <MotiView
            key={i}
            from={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: i * 100 }}
            style={styles.reviewCard}
          >
            <Text style={styles.reviewText}>{review}</Text>
          </MotiView>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>💎 Why Choose Us</Text>
      <View style={styles.whyContainer}>
        {[
          { icon: "shield-checkmark-outline", text: "Verified Experts" },
          { icon: "time-outline", text: "On-Time Service" },
          { icon: "heart-outline", text: "100% Satisfaction" },
        ].map((item, i) => (
          <View key={i} style={styles.whyCard}>
            <Ionicons name={item.icon as any} size={26} color={colors.blue} />
            <Text style={styles.whyText}>{item.text}</Text>
          </View>
        ))}
      </View>

      {/* 🚀 Call To Action */}
      <LinearGradient colors={gradients.blue} style={styles.ctaCard}>
        <Text style={styles.ctaText}>Ready to book your next service?</Text>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() =>
            router.push({
              pathname: "/offers/mens-booking",
              params: { service: "General Home Service", amount: "499" },
            } as any)
          }
        >
          <Text style={styles.ctaButtonText}>Book Now</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* 📞 Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Need help? Contact our 24/7 Support 💬
        </Text>
        <Text style={styles.footerBrand}>UrbanEase © 2026</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    paddingTop: 60,
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backButton: { padding: 6, marginRight: 10 },
  greeting: { color: colors.textSecondary, fontSize: 14 },
  headerTitle: { fontSize: 22, fontWeight: "700", color: colors.textPrimary },
  banner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
  },
  bannerTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },
  bannerSub: { color: "#E0F2FE", fontSize: 13, marginTop: 4 },
  bannerImage: { width: 70, height: 70, tintColor: "#fff" },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
    marginVertical: 14,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  categoryCard: { width: cardWidth, alignItems: "center", marginBottom: 18 },
  iconContainer: {
    width: 65,
    height: 65,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.textPrimary,
    textAlign: "center",
  },
  offerCard: { padding: 16, borderRadius: 16, marginRight: 12, width: 250 },
  offerText: { color: "#fff", fontWeight: "600", fontSize: 15 },
  featuredCard: { borderRadius: 16, overflow: "hidden", marginBottom: 14 },
  featuredImage: { height: 150, borderRadius: 16, justifyContent: "flex-end" },
  overlay: { borderRadius: 16, padding: 16 },
  featuredHeading: { fontSize: 17, fontWeight: "700", color: "#fff" },
  featuredSub: { fontSize: 13, color: "#E0F2FE", marginTop: 4 },
  proCard: {
    backgroundColor: "#fff",
    width: 140,
    height: 160,
    borderRadius: 12,
    marginRight: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  proImage: { width: 75, height: 75, borderRadius: 999, marginBottom: 10 },
  proName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  proJob: { fontSize: 12, color: "#6B7280", textAlign: "center", marginTop: 2 },
  proRating: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  proRatingText: { fontSize: 12, color: "#6B7280", marginLeft: 4 },
  trendingCard: { padding: 18, borderRadius: 16, marginBottom: 14 },
  trendingText: { color: "#fff", fontWeight: "600", fontSize: 15 },
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 220,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  reviewText: { fontSize: 14, color: colors.textPrimary, fontStyle: "italic" },
  whyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  whyCard: { alignItems: "center", width: "30%" },
  whyText: {
    marginTop: 8,
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
  },
  ctaCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 30,
  },
  ctaText: { color: "#fff", fontSize: 16, fontWeight: "600", marginBottom: 10 },
  ctaButton: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 26,
  },
  ctaButtonText: { color: colors.teal, fontWeight: "700", fontSize: 15 },
  footer: {
    alignItems: "center",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 10,
  },
  footerText: { color: colors.textSecondary, fontSize: 13 },
  footerBrand: {
    marginTop: 4,
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 14,
  },
});
