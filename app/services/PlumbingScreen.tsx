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

export default function PlumbingScreen() {
  const router = useRouter();

  const sections = [
    {
      title: "🚰 Plumbing Services",
      color: ["#3B82F6", "#06B6D4"],
      description:
        "Expert plumbing care to keep your home’s water systems flowing smoothly and reliably 💧",
      data: [
        {
          id: "1",
          title: "Pipe Leakage Fix",
          subtitle: "Quick repair for burst or leaky pipes",
          icon: "water-outline",
          color: "#0EA5E9",
        },
        {
          id: "2",
          title: "Tap & Faucet Repair",
          subtitle: "Fix dripping taps and water fixtures",
          icon: "construct-outline",
          color: "#3B82F6",
        },
        {
          id: "3",
          title: "Bathroom Fittings",
          subtitle: "Shower, basin & toilet installation",
          icon: "hand-left-outline",
          color: "#0284C7",
        },
        {
          id: "4",
          title: "Water Tank Cleaning",
          subtitle: "Deep cleaning and sanitization",
          icon: "water-outline",
          color: "#0EA5E9",
        },
      ],
    },
    {
      title: "🏡 Home Water Systems",
      color: ["#06B6D4", "#0EA5E9"],
      description:
        "Reliable maintenance for pumps, pipelines, and drainage systems 🌊",
      data: [
        {
          id: "5",
          title: "Motor Installation",
          subtitle: "Professional water pump setup",
          icon: "flash-outline",
          color: "#06B6D4",
        },
        {
          id: "6",
          title: "Drainage Cleaning",
          subtitle: "Unclog drains and ensure smooth flow",
          icon: "trail-sign-outline",
          color: "#0891B2",
        },
        {
          id: "7",
          title: "Water Heater Setup",
          subtitle: "Installation & servicing of geysers",
          icon: "flame-outline",
          color: "#F97316",
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Gradient Header */}
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
          <Text style={styles.headerTitle}>Plumbing Services</Text>
          <View style={{ width: 24 }} />
        </View>
        <Text style={styles.headerSubtitle}>
          Keep your home leak-free and water systems healthy 🚿
        </Text>

        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2942/2942853.png",
          }}
          style={styles.headerImage}
        />
      </LinearGradient>

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
                  onPress={() =>
                    router.push({
                      pathname: "/offers/mens-booking",
                      params: {
                        service: item.title,
                        amount: "249",
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

                  <TouchableOpacity
                    style={[styles.bookButton, { backgroundColor: item.color }]}
                    onPress={() =>
                      router.push({
                        pathname: "/offers/mens-booking",
                        params: {
                          service: item.title,
                          amount: "249",
                        },
                      } as any)
                    }
                  >
                    <Text style={styles.bookText}>Book</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          </View>
        ))}

        {/* Promotional Banner */}
        <LinearGradient
          {...({
            colors: ["#0EA5E9", "#06B6D4"],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 1 },
            style: styles.offerBanner,
          } as any)}
        >
          <Ionicons name="gift-outline" size={30} color="#fff" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.offerTitle}>Special Discount 💧</Text>
            <Text style={styles.offerDesc}>
              Get 15% off on first-time plumbing services
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
