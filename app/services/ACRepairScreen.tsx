import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function ACRepairScreen() {
  const router = useRouter();

  const sections = [
    {
      title: "❄️ AC Repair & Services",
      color: ["#06B6D4", "#3B82F6"],
      description:
        "Beat the heat with our expert AC repair, cleaning, and installation services 🧊",
      data: [
        {
          id: "1",
          title: "AC General Service",
          subtitle: "Deep cleaning, inspection & maintenance",
          icon: "snow-outline",
          color: "#06B6D4",
        },
        {
          id: "2",
          title: "Gas Refilling",
          subtitle: "Quick & reliable refrigerant refill",
          icon: "thermometer-outline",
          color: "#3B82F6",
        },
        {
          id: "3",
          title: "Cooling Issue Fix",
          subtitle: "Low cooling or airflow problems",
          icon: "speedometer-outline",
          color: "#0EA5E9",
        },
        {
          id: "4",
          title: "AC Installation",
          subtitle: "Split & window AC mounting service",
          icon: "construct-outline",
          color: "#2563EB",
        },
      ],
    },
    {
      title: "🏠 Home Cooling Care",
      color: ["#38BDF8", "#0EA5E9"],
      description:
        "Ensure your home stays cool and fresh with proper AC care and cleaning 🌬️",
      data: [
        {
          id: "5",
          title: "AC Deep Cleaning",
          subtitle: "Coil, filter & blower deep cleaning",
          icon: "sparkles-outline",
          color: "#3B82F6",
        },
        {
          id: "6",
          title: "Noise Issue Fix",
          subtitle: "Eliminate strange noises or vibrations",
          icon: "volume-high-outline",
          color: "#06B6D4",
        },
        {
          id: "7",
          title: "AC Remote Setup",
          subtitle: "Pairing & configuration for remote",
          icon: "wifi-outline",
          color: "#0EA5E9",
        },
      ],
    },
  ];

return (
  <SafeAreaView style={styles.safeArea}>
    {/* Header Gradient */}
    <LinearGradient
      {...({
        colors: ["#3B82F6", "#06B6D4"],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
        style: styles.headerGradient,
      } as any)}
    >
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AC Repair & Maintenance</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.headerSubtitle}>
        Stay cool this summer ❄️ — Expert AC repair, cleaning & installation at
        your doorstep.
      </Text>
    </LinearGradient>

    {/* Scrollable Content */}
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
    >
      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <LinearGradient
            {...({
              colors: section.color,
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
                activeOpacity={0.8}
                onPress={() =>
                  router.push({
                    pathname: "/offers/mens-booking",
                    params: {
                      service: item.title,
                      amount: "599",
                    },
                  } as any)
                }
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
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          />
        </View>
      ))}

      {/* Promotional Banner */}
      <LinearGradient
        {...({
          colors: ["#3B82F6", "#06B6D4"],
          start: { x: 0, y: 0 },
          end: { x: 1, y: 1 },
          style: styles.offerBanner,
        } as any)}
      >
        <Ionicons name="gift-outline" size={30} color="#fff" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.offerTitle}>Cool Deal 🌬️</Text>
          <Text style={styles.offerDesc}>
            Get 20% off on your first AC service this summer!
          </Text>
        </View>
      </LinearGradient>
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
    position: "relative",
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#fff" },
  headerSubtitle: { fontSize: 13, color: "#E0F2FE", marginTop: 10 },
  headerImage: {
    position: "absolute",
    right: 20,
    bottom: 5,
    width: 90,
    height: 90,
    opacity: 0.2,
  },
  scroll: { padding: 16, paddingBottom: 120 },
  section: { marginBottom: 24 },
  sectionBanner: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#fff" },
  sectionDesc: { fontSize: 13, color: "#F0F9FF", marginTop: 4 },
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
  
  cardTitle: { fontSize: 15, fontWeight: "600", color: "#111827" },
  cardSubtitle: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  bookButton: {
    backgroundColor: "#06B6D4",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  
  bookText: { color: "#fff", fontWeight: "600", fontSize: 13 },
  offerBanner: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    padding: 16,
    marginTop: 10,
  },
  offerTitle: { fontSize: 16, fontWeight: "700", color: "#fff" },
  offerDesc: { fontSize: 13, color: "#E0F2FE" },
});
