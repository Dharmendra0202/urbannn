import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useRouter } from "expo-router";

export default function ApplianceRepairScreen() {
  const router = useRouter();

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
            <Text style={styles.headerTitle}>Appliance Repair Services ⚙️</Text>
          </View>
          <Text style={styles.headerSubtitle}>
            Reliable repairs for all your home & kitchen appliances 🔧
          </Text>

          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3643/3643104.png",
            }}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </LinearGradient>

        {/* ⚡ Appliance Grid Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose a Service 🔌</Text>

          <View style={styles.grid}>
            {appliances.map((appliance, index) => (
              <MotiView
                key={appliance.id}
                from={{ opacity: 0, translateY: 15 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: index * 100 }}
                style={[styles.card, { borderColor: appliance.color }]}
              >
                <MaterialCommunityIcons
                  name={appliance.icon as any}
                  size={34}
                  color={appliance.color}
                />
                <Text style={styles.cardTitle}>{appliance.name}</Text>
                <Text style={styles.cardDesc}>{appliance.desc}</Text>
                <TouchableOpacity
                  style={[styles.bookBtn, { backgroundColor: appliance.color }]}
                  onPress={() => router.push("/services/booking" as any)}
                >
                  <Text style={styles.bookText}>Book Now</Text>
                </TouchableOpacity>
              </MotiView>
            ))}
          </View>
        </View>

        {/* 💡 Why Choose Us */}
        <LinearGradient colors={["#E0F2FE", "#F0F9FF"]} style={styles.whyCard}>
          <Text style={styles.whyTitle}>Why Choose Us? 💯</Text>
          {perks.map((p, i) => (
            <Text key={i} style={styles.perkText}>
              {p}
            </Text>
          ))}
        </LinearGradient>

        {/* 💥 Offer Section */}
        <LinearGradient
          colors={["#FCD34D", "#FBBF24"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.offerCard}
        >
          <Ionicons name="gift-outline" size={34} color="#78350F" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.offerTitle}>Special Festive Offer 🎁</Text>
            <Text style={styles.offerDesc}>
              Get flat 25% off on your first appliance service!
            </Text>
          </View>
        </LinearGradient>

        {/* 🧰 Trusted Brands */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            We Service All Major Brands 🏷️
          </Text>
          <View style={styles.brandRow}>
            {[
              "https://upload.wikimedia.org/wikipedia/commons/0/0e/LG_logo_%282015%29.svg",
              "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/b/b8/Whirlpool_Logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/e/e0/Haier_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/f/f3/Voltas_logo.svg",
            ].map((logo, i) => (
              <Image
                key={i}
                source={{ uri: logo }}
                style={styles.brandLogo}
                resizeMode="contain"
              />
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
    color: "#F3F4F6",
    fontSize: 14,
    marginTop: 10,
    lineHeight: 18,
  },
  headerImage: {
    width: "100%",
    height: 160,
    opacity: 0.8,
    marginTop: 10,
  },

  section: { marginTop: 24, paddingHorizontal: 16 },
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
    backgroundColor: "#F9FAFB",
    borderWidth: 2,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    alignItems: "center",
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

  whyCard: {
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },
  whyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0369A1",
    marginBottom: 10,
  },
  perkText: { fontSize: 13, color: "#0C4A6E", marginBottom: 6 },

  offerCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  offerTitle: { fontSize: 16, fontWeight: "700", color: "#78350F" },
  offerDesc: { fontSize: 13, color: "#92400E" },

  brandRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginTop: 8,
  },
  brandLogo: {
    width: 80,
    height: 40,
    margin: 6,
  },
});
