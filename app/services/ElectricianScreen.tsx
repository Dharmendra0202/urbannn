// app/services/ElectricianScreen.tsx
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
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function ElectricianScreen() {
  const router = useRouter();

  const sections = [
    {
      title: "⚡ Electrical Services",
      colors: ["#4F46E5", "#7C3AED"],
      description: "Expert electricians to light up your home and office.",
      data: [
        {
          icon: "bulb-outline",
          title: "Light Installation 💡",
          desc: "Ceiling, wall & decorative lighting setup",
          color: "#FACC15",
        },
        {
          icon: "flash-outline",
          title: "Switch Board Repair 🔌",
          desc: "Fix or replace old and damaged boards",
          color: "#F59E0B",
        },
        {
          icon: "construct-outline",
          title: "Wiring & Fittings 🧰",
          desc: "Full home wiring, repair & new installations",
          color: "#3B82F6",
        },
      ],
    },
    {
      title: "🔧 Repairs & Installation",
      colors: ["#0EA5E9", "#06B6D4"],
      description: "Seamless setup, repairs, and maintenance.",
      data: [
        {
          icon: "battery-charging-outline",
          title: "Inverter & Battery Setup 🔋",
          desc: "Complete power backup installation",
          color: "#22C55E",
        },
        {
          icon: "tv-outline",
          title: "Appliance Connections 📺",
          desc: "Geysers, washing machines & more",
          color: "#EC4899",
        },
        {
          icon: "speedometer-outline",
          title: "Voltage Stabilizer ⚙️",
          desc: "Protect your devices from power surges",
          color: "#8B5CF6",
        },
      ],
    },
    {
      title: "🧰 Safety & Verification",
      colors: ["#F97316", "#FB923C"],
      description: "We care about your safety and service quality.",
      data: [
        {
          icon: "shield-checkmark-outline",
          title: "Verified Professionals 🧑‍🔧",
          desc: "Background checked and certified staff",
          color: "#22C55E",
        },
        {
          icon: "ribbon-outline",
          title: "Guaranteed Work 🛠️",
          desc: "Warranty on every electrical service",
          color: "#3B82F6",
        },
        {
          icon: "happy-outline",
          title: "Customer Satisfaction 🌟",
          desc: "Rated 4.9⭐ across 5,000+ happy clients",
          color: "#F59E0B",
        },
      ],
    },
  ];

  const specialOffer = {
    title: "🎁 New Year Offer!",
    subtitle: "Get 25% OFF on all electrical services this month",
    gradient: ["#7C3AED", "#EC4899"],
    icon: "gift-outline",
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 🔹 Header */}
      <LinearGradient
        colors={["#6366F1", "#8B5CF6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Electrician Services ⚡</Text>
          <View style={{ width: 24 }} />
        </View>
        <Text style={styles.headerSubtitle}>
          Professional electricians for safe, bright, and powerful homes 🔌
        </Text>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2857/2857392.png",
          }}
          style={styles.headerImage}
        />
      </LinearGradient>

      {/* 🔹 Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {sections.map((section, index) => {
          const sectionColors = (
            Array.isArray(section.colors)
              ? section.colors
              : ["#7C3AED", "#A855F7"]
          ) as readonly string[];

          return (
            <View key={index} style={styles.section}>
              <LinearGradient
                {...({
                  colors: sectionColors,
                  start: { x: 0, y: 0 },
                  end: { x: 1, y: 1 },
                  style: styles.sectionBanner,
                } as any)}
              >
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionDesc}>{section.description}</Text>
              </LinearGradient>

              {section.data.map((item, i) => (
                <View key={i} style={styles.card}>
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
                    <Text style={styles.cardDesc}>{item.desc}</Text>
                  </View>
                  <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookText}>Book</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          );
        })}

        {/* 🔹 Special Offer */}
        <LinearGradient
          colors={specialOffer.gradient as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.offerCard}
        >
          <Ionicons name={specialOffer.icon as any} size={32} color="#fff" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.offerTitle}>{specialOffer.title}</Text>
            <Text style={styles.offerSubtitle}>{specialOffer.subtitle}</Text>
          </View>
        </LinearGradient>

        {/* 🔹 Footer Message */}
        <View style={styles.footer}>
          <Ionicons name="flash-outline" size={20} color="#7C3AED" />
          <Text style={styles.footerText}>
            Power your home with trusted professionals ⚡
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 💅🏻 Styles
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F9FAFB" },
  scroll: { padding: 16, paddingBottom: 140 },

  headerGradient: {
    paddingVertical: 35,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 12,
    position: "relative",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "#fff" },
  headerSubtitle: { color: "#E0E7FF", fontSize: 13, marginTop: 8 },
  headerImage: {
    position: "absolute",
    right: 10,
    bottom: 0,
    width: 100,
    height: 100,
    opacity: 0.25,
  },

  section: { marginBottom: 24 },
  sectionBanner: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#fff" },
  sectionDesc: { fontSize: 13, color: "#F3F4F6", marginTop: 4 },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardTitle: { fontSize: 15, fontWeight: "700", color: "#111827" },
  cardDesc: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  bookButton: {
    backgroundColor: "#7C3AED",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  bookText: { color: "#fff", fontWeight: "600", fontSize: 13 },

  offerCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 18,
    marginVertical: 24,
    elevation: 3,
  },
  offerTitle: { fontSize: 16, fontWeight: "700", color: "#fff" },
  offerSubtitle: { fontSize: 13, color: "#E0E7FF", marginTop: 2 },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  footerText: {
    color: "#4B5563",
    fontSize: 13,
    marginLeft: 8,
    textAlign: "center",
  },
});
