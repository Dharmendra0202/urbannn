import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function CleaningScreen() {
  const router = useRouter();

  const sections = [
    {
      title: "🏠 Cleaning Services",
      color: ["#A855F7", "#EC4899"],
      description:
        "Professional deep cleaning and sanitization for every corner of your home.",
      data: [
        {
          id: "1",
          title: "Full Home Cleaning",
          subtitle: "Comprehensive deep cleaning service",
          icon: "home-outline",
          color: "#A855F7",
        },
        {
          id: "2",
          title: "Kitchen Cleaning",
          subtitle: "Degrease cabinets, sink & appliances",
          icon: "restaurant-outline",
          color: "#F59E0B",
        },
        {
          id: "3",
          title: "Bathroom Cleaning",
          subtitle: "Tiles, toilet & basin deep cleaning",
          icon: "water-outline",
          color: "#3B82F6",
        },
        {
          id: "4",
          title: "Sofa & Carpet Cleaning",
          subtitle: "Vacuuming, shampoo & stain removal",
          icon: "cube-outline",
          color: "#22C55E",
        },
      ],
    },
    {
      title: "🧰 Home Maintenance",
      color: ["#06B6D4", "#3B82F6"],
      description:
        "Keep your home functional with professional repair and care.",
      data: [
        {
          id: "5",
          title: "Pest Control",
          subtitle: "Safe pest management for a clean home",
          icon: "bug-outline",
          color: "#F43F5E",
        },
        {
          id: "6",
          title: "Plumbing Services",
          subtitle: "Fix leaks, faucets & water systems",
          icon: "water-outline",
          color: "#3B82F6",
        },
        {
          id: "7",
          title: "Electrical Repairs",
          subtitle: "Wiring, installation & lighting setup",
          icon: "flash-outline",
          color: "#F59E0B",
        },
        {
          id: "8",
          title: "Painting & Décor",
          subtitle: "Transform your home with a fresh look",
          icon: "color-palette-outline",
          color: "#8B5CF6",
        },
      ],
    },
    {
      title: "🌿 Outdoor & Gardening",
      color: ["#16A34A", "#22C55E"],
      description:
        "Beautify your outdoors with expert gardening & maintenance services.",
      data: [
        {
          id: "9",
          title: "Garden Maintenance",
          subtitle: "Plant trimming, soil care & watering",
          icon: "leaf-outline",
          color: "#22C55E",
        },
        {
          id: "10",
          title: "Lawn Mowing",
          subtitle: "Perfectly trimmed and clean lawn service",
          icon: "cut-outline",
          color: "#10B981",
        },
        {
          id: "11",
          title: "Outdoor Cleaning",
          subtitle: "Patio, balcony & exterior wash service",
          icon: "rainy-outline",
          color: "#06B6D4",
        },
        {
          id: "12",
          title: "Garbage Removal",
          subtitle: "Eco-friendly waste pickup & disposal",
          icon: "trash-outline",
          color: "#F43F5E",
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Gradient Header */}
      <LinearGradient
        colors={["#7C3AED", "#A855F7"]}
        style={styles.headerGradient}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Home & Cleaning Services</Text>
          <View style={{ width: 24 }} />
        </View>
        <Text style={styles.headerSubtitle}>
          Transform your home into a sparkling, fresh, and comfortable space ✨
        </Text>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {sections.map((section, index) => {
          const sectionColor = (
            Array.isArray(section.color)
              ? section.color
              : ["#7C3AED", "#A855F7"]
          ) as readonly string[]; // ✅ correct type

          return (
            <View key={index} style={styles.section}> //// colors issue fixed here 
              <LinearGradient
                {...({
                  colors: sectionColor,
                  start: { x: 0, y: 0 },
                  end: { x: 1, y: 1 },
                  style: styles.sectionBanner,
                } as any)}
              >
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionDesc}>{section.description}</Text>
              </LinearGradient> 

              <FlatList
                data={section.data}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => console.log(`Selected ${item.title}`)}
                  >
                    <View
                      style={[
                        styles.iconBox,
                        { backgroundColor: item.color + "20" },
                      ]}
                    >
                      <Ionicons
                        name={item.icon as any}
                        size={26}
                        color={item.color}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          );
        })}

        {/* ✅ Big Promotional Banner */}
        <LinearGradient
          colors={["#7C3AED", "#EC4899"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.bigBanner}
        >
          <Image
            source={{
              uri: "https://images.pexels.com/photos/4107281/pexels-photo-4107281.jpeg?auto=compress&cs=tinysrgb&w=800",
            }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>✨ Premium Home Makeover</Text>
            <Text style={styles.bannerSubtitle}>
              Book a full home transformation package and get 25% OFF!
            </Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Explore Offers →</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* ✅ Bonus Section - Quick Essentials */}
        <View style={{ marginTop: 24 }}>
          <Text style={styles.quickTitle}>🧹 Quick Essentials</Text>
          <Text style={styles.quickSubtitle}>
            Must-have cleaning products to keep your home spotless
          </Text>

          <View style={styles.quickList}>
            {[
              "🧽 Floor Mop Set",
              "🪣 Cleaning Spray Kit",
              "🧴 Disinfectant",
              "🧼 Surface Cleaner",
              "🧤 Gloves & Cloth Pack",
            ].map((item, idx) => (
              <Text key={idx} style={styles.quickItem}>
                {item}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F9FAFB" },
  headerGradient: {
    paddingVertical: 30,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "#F3F4F6",
    fontSize: 13,
    marginTop: 10,
    lineHeight: 18,
  },
  scroll: { padding: 16, paddingBottom: 120 },
  section: { marginBottom: 24 },
  sectionBanner: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  sectionDesc: {
    fontSize: 13,
    color: "#F3F4F6",
    marginTop: 4,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },

  // ✅ Big Banner Styles
  bigBanner: {
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 24,
    marginBottom: 16,
  },
  bannerImage: {
    width: "100%",
    height: 150,
    opacity: 0.3,
    position: "absolute",
  },
  bannerContent: {
    padding: 20,
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  bannerSubtitle: {
    color: "#f3f4f6",
    fontSize: 13,
    marginBottom: 10,
  },
  bannerButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  bannerButtonText: {
    color: "#000",
    fontWeight: "600",
  },

  // ✅ Quick Essentials Section
  quickTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  quickSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 12,
  },
  quickList: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  quickItem: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 6,
  },
});
