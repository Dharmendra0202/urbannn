import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { MotiView, MotiImage } from "moti";
import { useRouter } from "expo-router";

export default function WomensSalonScreen() {
  const router = useRouter();

  const services = [
    {
      id: "1",
      title: "💇‍♀️ Hair Styling & Cut",
      desc: "Trendy haircuts and advanced styling for all occasions",
      price: "₹499",
      image:
        "https://images.pexels.com/photos/3997984/pexels-photo-3997984.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "2",
      title: "💆‍♀️ Facial & Spa",
      desc: "Relax, detox, and glow with our premium facials",
      price: "₹699",
      image:
        "https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "3",
      title: "💅 Manicure & Pedicure",
      desc: "Nail art, shaping, and spa for perfect hands & feet",
      price: "₹399",
      image:
        "https://images.pexels.com/photos/3993441/pexels-photo-3993441.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "4",
      title: "💄 Bridal Makeup",
      desc: "Professional HD makeup for your dream wedding day",
      price: "₹2499",
      image:
        "https://images.pexels.com/photos/286763/pexels-photo-286763.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  const beautyPackages = [
    "💆‍♀️ Glow Boost Facial + Hair Spa",
    "💅 Nail Art + Hand Polish",
    "💇‍♀️ Haircut + Blow Dry",
    "💄 Bridal Trial Makeup + Consultation",
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🌸 Animated Header */}
        <LinearGradient
          colors={["#FBCFE8", "#F9A8D4", "#FDE68A"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Women’s Salon 💄</Text>
          </View>
          <Text style={styles.headerSubtitle}>
            Luxury beauty & relaxation — right at your fingertips ✨
          </Text>

          {/* Floating Background Images */}
          <View style={styles.imageGrid}>
            {[
              "https://images.pexels.com/photos/3997984/pexels-photo-3997984.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/286763/pexels-photo-286763.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/3993441/pexels-photo-3993441.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/853441/pexels-photo-853441.jpeg?auto=compress&cs=tinysrgb&w=800",
            ].map((img, i) => (
              <MotiImage
                key={i}
                source={{ uri: img }}
                style={styles.headerSmallImage}
                resizeMode="cover"
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 200, type: "timing", duration: 600 }}
              />
            ))}
          </View>
        </LinearGradient>

        {/* ✨ Featured Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Premium Services 👑</Text>
          {services.map((service, index) => (
            <MotiView
              key={service.id}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: index * 150 }}
              style={styles.serviceCard}
            >
              <Image
                source={{ uri: service.image }}
                style={styles.serviceImage}
              />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDesc}>{service.desc}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.priceText}>{service.price}</Text>
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() =>
                      router.push({
                        pathname: "/offers/mens-booking",
                        params: {
                          service: service.title,
                          amount: service.price.replace(/[^\d]/g, ""),
                        },
                      } as any)
                    }
                  >
                    <Text style={styles.bookText}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </MotiView>
          ))}
        </View>

        {/* 💅 Beauty Packages */}
        <LinearGradient
          colors={["#FDF2F8", "#FCE7F3"]}
          style={styles.packageCard}
        >
          <Text style={styles.packageTitle}>Exclusive Beauty Packages 💝</Text>
          {beautyPackages.map((p, i) => (
            <Text key={i} style={styles.packageItem}>
              {p}
            </Text>
          ))}
        </LinearGradient>

        {/* 🌟 Offer Banner */}
        <LinearGradient
          colors={["#FDE68A", "#FCD34D"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.offerCard}
        >
          <Ionicons name="gift-outline" size={34} color="#92400E" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.offerTitle}>Glamour Week Offer 🎁</Text>
            <Text style={styles.offerDesc}>
              Enjoy 25% OFF on facials, spa & hair treatments this week!
            </Text>
          </View>
        </LinearGradient>

        {/* 💋 Virtual Salon Section */}
        <View style={styles.virtualSection}>
          <Text style={styles.virtualTitle}>
            💋 Step into the Virtual Salon
          </Text>
          <Text style={styles.virtualDesc}>
            Experience your favorite salon virtually — see styles & treatments
            come alive before booking!
          </Text>
          <TouchableOpacity
            style={styles.virtualButton}
            onPress={() => alert("Virtual Salon Coming Soon! 💖")}
          >
            <Text style={styles.virtualButtonText}>
              Launch Virtual Experience
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },

  headerGradient: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "800",
    marginLeft: 10,
  },
  headerSubtitle: { fontSize: 14, color: "#FFF0F6", marginBottom: 14 },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  headerSmallImage: {
    width: "31%",
    height: 90,
    borderRadius: 12,
    marginBottom: 8,
  },

  section: { marginTop: 22, paddingHorizontal: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#881337",
    marginBottom: 12,
  },

  serviceCard: {
    backgroundColor: "#FFF0F6",
    borderRadius: 18,
    flexDirection: "row",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceImage: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },
  serviceInfo: { flex: 1, padding: 10 },
  serviceTitle: { fontSize: 16, fontWeight: "700", color: "#BE185D" },
  serviceDesc: { fontSize: 13, color: "#6B7280", marginVertical: 4 },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: { fontSize: 14, fontWeight: "700", color: "#BE185D" },
  bookButton: {
    backgroundColor: "#BE185D",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  bookText: { color: "#fff", fontWeight: "600", fontSize: 13 },

  packageCard: {
    margin: 16,
    borderRadius: 20,
    padding: 16,
  },
  packageTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#9D174D",
    marginBottom: 8,
  },
  packageItem: { fontSize: 13, color: "#701A75", marginBottom: 6 },

  offerCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    padding: 16,
    margin: 16,
  },
  offerTitle: { fontSize: 16, fontWeight: "700", color: "#78350F" },
  offerDesc: { fontSize: 13, color: "#92400E" },

  virtualSection: {
    backgroundColor: "#FEF3C7",
    margin: 16,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  virtualTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#92400E",
    marginBottom: 6,
  },
  virtualDesc: {
    fontSize: 13,
    color: "#78350F",
    textAlign: "center",
    marginBottom: 14,
  },
  virtualButton: {
    backgroundColor: "#F59E0B",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  virtualButtonText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
