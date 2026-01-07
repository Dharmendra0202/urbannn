// app/services/ElectricianScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function ElectricianScreen() {
  const router = useRouter();

  // 🔹 Sample data (Replace with backend data later)
  const topElectricians = [
    {
      id: "1",
      name: "Amit Sharma",
      rating: 4.9,
      experience: "8 yrs experience",
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: "2",
      name: "Rahul Verma",
      rating: 4.8,
      experience: "5 yrs experience",
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: "3",
      name: "Vijay Singh",
      rating: 4.7,
      experience: "6 yrs experience",
      image: "https://i.pravatar.cc/150?img=7",
    },
  ];

  const commonServices = [
    {
      icon: "bulb-outline",
      title: "Light Installation",
      desc: "Ceiling, wall & decorative lights",
    },
    {
      icon: "flash-outline",
      title: "Switch Board Repair",
      desc: "Replace or fix switches & sockets",
    },
    {
      icon: "construct-outline",
      title: "Wiring & Fittings",
      desc: "Home wiring, circuit repair & upgrades",
    },
    {
      icon: "battery-charging-outline",
      title: "Inverter Setup",
      desc: "Installation & maintenance of inverters",
    },
    {
      icon: "tv-outline",
      title: "Appliance Connections",
      desc: "Washing machines, geysers, TVs, etc.",
    },
  ];

  const safetyChecks = [
    "All electricians are background verified",
    "100% satisfaction guaranteed",
    "Use of high-quality wires and components",
    "Trained and certified professionals",
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER SECTION */}
      <LinearGradient
        colors={["#6366F1", "#8B5CF6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Electrician Services</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Reliable electricians for your home and office
        </Text>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/2857/2857392.png" }}
          style={styles.headerImage}
        />
      </LinearGradient>

      {/* BODY */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* 🔹 BEST ELECTRICIANS SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Best Electricians Near You</Text>

          <FlatList
            data={topElectricians}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.electricianCard} activeOpacity={0.8}>
                <Image source={{ uri: item.image }} style={styles.profileImage} />
                <Text style={styles.electricianName}>{item.name}</Text>
                <Text style={styles.electricianExp}>{item.experience}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#FBBF24" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* 🔹 COMMON SERVICES SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Common Electrical Services</Text>
          {commonServices.map((service, index) => (
            <View key={index} style={styles.serviceCard}>
              <View style={styles.serviceIconBox}>
                <Ionicons name={service.icon as any} size={24} color="#6366F1" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDesc}>{service.desc}</Text>
              </View>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookText}>Book</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* 🔹 SAFETY CHECKS SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety & Quality Assurance</Text>
          {safetyChecks.map((item, index) => (
            <View key={index} style={styles.checkItem}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#22C55E" />
              <Text style={styles.checkText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* 🔹 OFFERS SECTION */}
        <View style={styles.section}>
          <LinearGradient
            colors={["#FDE68A", "#FCD34D"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.offerCard}
          >
            <Ionicons name="gift-outline" size={28} color="#92400E" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.offerTitle}>Special Offer</Text>
              <Text style={styles.offerDesc}>Get 20% off on your first electrician service</Text>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 💅🏻 Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  headerGradient: {
    paddingHorizontal: 16,
    paddingTop: 35,
    paddingBottom: 45,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "relative",
    overflow: "hidden",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  backButton: { marginRight: 10 },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#fff" },
  headerSubtitle: { fontSize: 14, color: "#E0E7FF", marginTop: 4 },
  headerImage: {
    position: "absolute",
    right: 20,
    bottom: 10,
    width: 100,
    height: 100,
    opacity: 0.25,
  },

  section: { marginTop: 20, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#111827", marginBottom: 12 },

  electricianCard: {
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginRight: 14,
    width: 140,
    elevation: 3,
  },
  profileImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 8 },
  electricianName: { fontSize: 15, fontWeight: "600", color: "#111" },
  electricianExp: { fontSize: 12, color: "#6B7280", marginBottom: 4 },
  ratingRow: { flexDirection: "row", alignItems: "center" },
  ratingText: { fontSize: 12, color: "#111", marginLeft: 4 },

  serviceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    elevation: 1,
  },
  serviceIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  serviceTitle: { fontSize: 15, fontWeight: "600", color: "#111" },
  serviceDesc: { fontSize: 13, color: "#6B7280" },
  bookButton: {
    backgroundColor: "#6366F1",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  bookText: { color: "#fff", fontWeight: "600", fontSize: 13 },

  checkItem: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  checkText: { fontSize: 14, color: "#374151", marginLeft: 8 },

  offerCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    padding: 16,
    elevation: 2,
  },
  offerTitle: { fontSize: 16, fontWeight: "700", color: "#78350F" },
  offerDesc: { fontSize: 13, color: "#92400E" },
});
