import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useRouter } from "expo-router";

export default function ApplianceRepairScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const appliances = [
    {
      id: "1",
      name: "🧊 Refrigerator Repair",
      desc: "Cooling issues, gas refill, or compressor service",
      icon: "fridge-outline",
      color: "#06B6D4",
    },
    {
      id: "2",
      name: "🌀 Washing Machine Repair",
      desc: "Top & front load repair, drum, and drainage fix",
      icon: "washing-machine",
      color: "#3B82F6",
    },
    {
      id: "3",
      name: "🔥 Microwave Oven Service",
      desc: "Heating coil, timer, and sensor issues resolved",
      icon: "microwave",
      color: "#F59E0B",
    },
    {
      id: "4",
      name: "❄️ AC Installation & Repair",
      desc: "Split, window & inverter AC servicing",
      icon: "air-conditioner",
      color: "#0EA5E9",
    },
    {
      id: "5",
      name: "📺 TV Repair",
      desc: "LED, LCD, smart TV board and display fix",
      icon: "television",
      color: "#6366F1",
    },
    {
      id: "6",
      name: "🍳 Kitchen Appliance Setup",
      desc: "Mixer, gas stove, chimney & water purifier",
      icon: "toaster-oven",
      color: "#EC4899",
    },
  ];

  const perks = [
    "✅ Trained & Certified Technicians",
    "🔧 Original spare parts used",
    "🏠 Home visit within 2 hours",
    "💵 Transparent pricing & warranty",
    "⭐ Rated 4.8+ by 10K+ happy customers",
  ];

  // ✅ Search filter
  const filteredAppliances = appliances.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🌈 Header Banner */}
        <LinearGradient
          colors={["#06B6D4", "#3B82F6"]}
          style={styles.headerGradient}
        >
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={26} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Appliance Repair ⚙️</Text>
            <TouchableOpacity
              onPress={() => alert("Notifications Coming Soon!")}
            >
              <Ionicons name="notifications-outline" size={26} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerSubtitle}>
            Reliable repairs for your home & kitchen appliances 🔧
          </Text>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3643/3643104.png",
            }}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </LinearGradient>

        {/* 🔍 Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Search for an appliance..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* ⭐ Featured Service */}
        <LinearGradient
          colors={["#A78BFA", "#7C3AED"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.featureCard}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/8080/8080852.png",
            }}
            style={styles.featureImage}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.featureTitle}>Premium Home AC Tune-Up</Text>
            <Text style={styles.featureDesc}>
              Get your AC cleaned, repaired, and optimized for summer 🌞
            </Text>
            <TouchableOpacity
              style={styles.featureBtn}
              onPress={() => router.push("/booking" as any)}
            >
              <Text style={styles.featureBtnText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* ⚡ Appliance Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose a Service 🔌</Text>

          {filteredAppliances.length === 0 ? (
            <Text style={styles.noResultsText}>
              No matching appliance found
            </Text>
          ) : (
            <View style={styles.grid}>
              {filteredAppliances.map((appliance, index) => (
                <MotiView
                  key={appliance.id}
                  from={{ opacity: 0, translateY: 15 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ delay: index * 80 }}
                  style={[styles.card, { borderColor: appliance.color }]}
                >
                  <MaterialCommunityIcons
                    name={appliance.icon as any}
                    size={36}
                    color={appliance.color}
                  />
                  <Text style={styles.cardTitle}>{appliance.name}</Text>
                  <Text style={styles.cardDesc}>{appliance.desc}</Text>
                  <TouchableOpacity
                    style={[
                      styles.bookBtn,
                      { backgroundColor: appliance.color },
                    ]}
                    onPress={() => router.push("/booking" as any)}
                  >
                    <Text style={styles.bookText}>Book Now</Text>
                  </TouchableOpacity>
                </MotiView>
              ))}
            </View>
          )}
        </View>

        {/* 💡 Why Choose Us */}
        <LinearGradient colors={["#E0F2FE", "#F0F9FF"]} style={styles.whyCard}>
          <Text style={styles.whyTitle}>Why Choose Us 💯</Text>
          {perks.map((p, i) => (
            <Text key={i} style={styles.perkText}>
              {p}
            </Text>
          ))}
        </LinearGradient>

        {/* 🧰 Trusted Brands */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>We Service Top Brands 🏷️</Text>
          <View style={styles.brandRow}>
            {[
              "https://upload.wikimedia.org/wikipedia/commons/0/0e/LG_logo_%282015%29.svg",
              "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/b/b8/Whirlpool_Logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/e/e0/Haier_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/f/f3/Voltas_logo.svg",
            ].map((logo, i) => (
              <Image key={i} source={{ uri: logo }} style={styles.brandLogo} />
            ))}
          </View>
        </View>

        {/* 💬 Ratings & Reviews */}
        <View style={styles.reviewSection}>
          <Text style={styles.reviewHeading}>Customer Love ❤️</Text>
          <Text style={styles.reviewQuote}>
            "Quick, reliable, and affordable! My fridge works like new again."
          </Text>
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Ionicons key={i} name="star" size={18} color="#FACC15" />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  headerGradient: {
    paddingVertical: 30,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "relative",
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#fff" },
  headerSubtitle: {
    color: "#E5E7EB",
    fontSize: 14,
    marginTop: 10,
    lineHeight: 18,
  },
  headerImage: {
    width: "100%",
    height: 140,
    opacity: 0.8,
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 16,
    marginHorizontal: 16,
  },
  searchInput: { flex: 1, fontSize: 14, color: "#111" },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 20,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featureImage: { width: 70, height: 70 },
  featureTitle: { fontSize: 15, fontWeight: "700", color: "#fff" },
  featureDesc: { fontSize: 12, color: "#E0E7FF", marginVertical: 4 },
  featureBtn: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  featureBtnText: { color: "#7C3AED", fontWeight: "600", fontSize: 12 },
  section: { marginTop: 8, paddingHorizontal: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
    marginTop: 8,
    textAlign: "center",
  },
  cardDesc: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginVertical: 4,
  },
  bookBtn: {
    marginTop: 6,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  bookText: { color: "#fff", fontWeight: "600", fontSize: 12 },
  noResultsText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 20,
  },
  whyCard: {
    margin: 16,
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#F0F9FF",
  },
  whyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0369A1",
    marginBottom: 10,
  },
  perkText: { fontSize: 13, color: "#0C4A6E", marginBottom: 6 },
  brandRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginTop: 8,
  },
  brandLogo: { width: 80, height: 40, margin: 6 },
  reviewSection: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  reviewHeading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  reviewQuote: {
    fontSize: 13,
    color: "#6B7280",
    fontStyle: "italic",
    marginBottom: 10,
  },
  ratingRow: { flexDirection: "row" },
});
