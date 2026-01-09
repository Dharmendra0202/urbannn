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
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView, MotiText } from "moti";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { Easing } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const cardWidth = (width - 64) / 4;

const colors = {
  background: "#F9FAFB",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  white: "#FFFFFF",
  accent: "#7C3AED",
  accentLight: "#A855F7",
};

// ✅ Gradient Presets
const gradients: Record<string, [string, string]> = {
  purple: ["#8B5CF6", "#7C3AED"],
  orange: ["#F59E0B", "#F97316"],
  pink: ["#EC4899", "#F472B6"],
  green: ["#22C55E", "#16A34A"],
  blue: ["#3B82F6", "#06B6D4"],
};

// ✅ Categories
const categories = [
  {
    id: 1,
    name: "Cleaning",
    icon: "sparkles-outline",
    gradient: gradients.purple,
  },
  {
    id: 2,
    name: "Electrician",
    icon: "flash-outline",
    gradient: gradients.orange,
  },
  { id: 3, name: "Plumbing", icon: "water-outline", gradient: gradients.blue },
  { id: 4, name: "AC Repair", icon: "snow-outline", gradient: gradients.blue },
  {
    id: 5,
    name: "Men’s Salon",
    icon: "cut-outline",
    gradient: gradients.green,
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
    gradient: gradients.purple,
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

// ✅ Top Rated Professionals
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
type Offer = {
  id: number;
  title: string;
  colors: [string, string]; // exactly two colors
};

const offers: Offer[] = [
  {
    id: 1,
    title: "🎉 25% OFF on First Booking!",
    colors: ["#7C3AED", "#A855F7"],
  },
  {
    id: 2,
    title: "💆 Free Massage Add-on on Spa Services",
    colors: ["#F472B6", "#EC4899"],
  },
  {
    id: 3,
    title: "💡 Get ₹100 Cashback on AC Repairs",
    colors: ["#3B82F6", "#06B6D4"],
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

        <MotiText
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 700 }}
          style={styles.headerTitle}
        >
          All <Text style={{ color: colors.accentLight }}>Categories</Text>
        </MotiText>
      </View>

      {/* 🔮 Gradient Banner */}
      <LinearGradient
        colors={["#8B5CF6", "#7C3AED"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.banner}
      >
        <View>
          <Text style={styles.bannerTitle}>Discover Expert Services</Text>
          <Text style={styles.bannerSub}>
            Your comfort, our responsibility 💜
          </Text>
        </View>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
          }}
          style={styles.bannerImage}
        />
      </LinearGradient>

      {/* 💫 Animated Category Grid */}
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
              onPress={() =>
                router.push(
                  `/services/${cat.name.replace(/\s+/g, "")}Screen` as any
                )
              }
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

      {/* ✨ Featured Services */}
      <Text style={styles.sectionTitle}>
        <Text style={{ color: colors.accent }}>Featured </Text>Services
      </Text>

      {featured.map((item) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.9}
          style={styles.featuredCard}
        >
          <ImageBackground
            source={{ uri: item.image }}
            imageStyle={{ borderRadius: 16 }}
            style={styles.featuredImage}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.25)", "rgba(0,0,0,0.6)"]}
              style={styles.overlay}
            >
              <Text style={styles.featuredHeading}>{item.title}</Text>
              <Text style={styles.featuredSub}>Tap to explore →</Text>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      ))}

      {/* 🎁 Ongoing Offers (moved below featured) */}
      <Text style={styles.sectionTitle}>Special Offers 🎁</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {offers.map((offer) => (
          <LinearGradient
            key={offer.id}
            colors={offer.colors}
            style={styles.offerCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.offerText}>{offer.title}</Text>
          </LinearGradient>
        ))}
      </ScrollView>

      {/* 🏅 Top Rated Professionals (moved below offers) */}
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
              <Ionicons name="star" color="#FAC515" size={14} />
              <Text style={styles.proRatingText}>{item.rating}</Text>
            </View>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 0,
          paddingBottom: 0,
          marginBottom: 0,
        }}
      />

      {/* <View style={{ height: 1, backgroundColor: "#E5E7EB", marginTop: 10 }} /> */}
    </ScrollView>
  );
}

//
// 🎨 Styles
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    paddingTop: 60,
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  backButton: { padding: 4, marginRight: 8 },
  headerTitle: { fontSize: 26, fontWeight: "800", color: colors.textPrimary },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
  },
  bannerTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },
  bannerSub: { color: "#EDE9FE", fontSize: 14, marginTop: 4 },
  bannerImage: { width: 70, height: 70, tintColor: "#fff" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryCard: { width: cardWidth, alignItems: "center", marginBottom: 20 },
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
    width: 80,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
    marginVertical: 14,
  },
  featuredCard: { borderRadius: 16, overflow: "hidden", marginBottom: 14 },
  featuredImage: { height: 150, borderRadius: 16, justifyContent: "flex-end" },
  overlay: { borderRadius: 16, padding: 16 },
  featuredHeading: { fontSize: 17, fontWeight: "700", color: "#fff" },
  featuredSub: { fontSize: 13, color: "#EDE9FE", marginTop: 4 },
  offerCard: { padding: 16, borderRadius: 16, marginRight: 12, width: 250 },
  offerText: { color: "#fff", fontWeight: "600", fontSize: 15 },
  proCard: {
    backgroundColor: "#fff",
    width: 140,
    height: 160,
    borderRadius: 12,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",

    // ✨ remove shadow to make it flat
    shadowColor: "transparent",
    elevation: 0,

    // ✨ visually align with section background
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  sectionDivider: {
    height: 1,
    backgroundColor: "#E5E7EB", // light gray line
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 1,
  },

proImage: {
  width: 75,
  height: 75,
  borderRadius: 999,
  marginBottom: 10,
},

proName: {
  fontSize: 13,
  fontWeight: "700",
  color: "#111827",
  textAlign: "center",
  marginTop: 0,   // ✅ keep centered
},

proJob: {
  fontSize: 12,
  color: "#6B7280",
  textAlign: "center",
  marginTop: 4,   // ✅ slight gap only
},

proRating: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",  // ✅ centers stars + text
  marginTop: 6,
},
proRatingText: {
  fontSize: 12,
  color: "#6B7280",
  marginLeft: 4,
},
});
