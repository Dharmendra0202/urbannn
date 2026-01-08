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

// ✅ Animated “Popular” Services
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
          <Text style={{ color: colors.textPrimary }}>All </Text>
          <Text style={{ color: colors.accentLight }}>Categories</Text>
        </MotiText>
      </View>

      {/* 🔮 Animated Gradient Banner */}
      <MotiView
        from={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 12 }}
        style={styles.bannerWrapper}
      >
        <LinearGradient
          colors={["#7C3AED", "#A855F7"]}
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
      </MotiView>

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
              activeOpacity={0.85}
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

      {featured.map((item, index) => (
        <MotiView
          key={item.id}
          from={{ opacity: 0, translateY: 15 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: index * 150 }}
        >
          <TouchableOpacity activeOpacity={0.85} style={styles.featuredCard}>
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
        </MotiView>
      ))}

      {/* 🌈 Animated CTA */}
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 10 }}
        style={styles.ctaWrapper}
      >
        <LinearGradient
          colors={["#A855F7", "#6366F1"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaBanner}
        >
          <View>
            <Text style={styles.ctaHeading}>Ready to Transform Your Home?</Text>
            <Text style={styles.ctaSub}>
              Book experts and experience excellence ✨
            </Text>
          </View>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.push("/book-now" as any)}
          >
            <Text style={styles.ctaText}>Book Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </MotiView>
    </ScrollView>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    paddingTop: 60,
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  backButton: { padding: 4, marginRight: 8 },
  headerTitle: { fontSize: 24, fontWeight: "800" },
  bannerWrapper: { marginBottom: 24 },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    padding: 18,
    shadowColor: "#7C3AED",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  bannerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  bannerSub: { color: "#EDE9FE", fontSize: 13, marginTop: 4 },
  bannerImage: { width: 70, height: 70, tintColor: "#fff" },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryCard: {
    width: cardWidth,
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    width: 65,
    height: 65,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 12,
    color: colors.textPrimary,
    textAlign: "center",
    fontWeight: "500",
    width: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginVertical: 14,
  },
  featuredCard: { borderRadius: 16, overflow: "hidden", marginBottom: 14 },
  featuredImage: { height: 150, borderRadius: 16, justifyContent: "flex-end" },
  overlay: { borderRadius: 16, padding: 16 },
  featuredHeading: { fontSize: 16, fontWeight: "700", color: "#fff" },
  featuredSub: { fontSize: 13, color: "#EDE9FE", marginTop: 4 },

  ctaWrapper: { marginTop: 30, marginBottom: 40 },
  ctaBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 18,
    padding: 18,
    shadowColor: "#7C3AED",
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  ctaHeading: { color: "#fff", fontSize: 16, fontWeight: "700" },
  ctaSub: { color: "#F3E8FF", fontSize: 13, marginTop: 2 },
  ctaButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  ctaText: { color: "#7C3AED", fontWeight: "700" },
});
