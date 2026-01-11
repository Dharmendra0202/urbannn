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
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MotiImage } from "moti";

export default function MensSalonScreen() {
  const router = useRouter();

  const services = [
    {
      id: "1",
      title: "💇‍♂️ Classic Haircut",
      desc: "Trendy and professional styles from expert barbers",
      price: "₹299",
      image:
        "https://images.pexels.com/photos/3992879/pexels-photo-3992879.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "2",
      title: "🧔 Beard Styling",
      desc: "Perfect trims and shaves for a sharp look",
      price: "₹199",
      image:
        "https://images.pexels.com/photos/3993446/pexels-photo-3993446.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "3",
      title: "💆 Head Massage",
      desc: "Relaxing oil therapy for stress relief and hair strength",
      price: "₹249",
      image:
        "https://images.pexels.com/photos/3997994/pexels-photo-3997994.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "4",
      title: "🪞 Hair Styling & Gel Finish",
      desc: "Get salon-level finishing before your big event",
      price: "₹349",
      image:
        "https://images.pexels.com/photos/3992871/pexels-photo-3992871.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  const topBarbers = [
    {
      id: "1",
      name: "Arjun Mehta",
      rating: 4.9,
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: "2",
      name: "Rohit Verma",
      rating: 4.8,
      image: "https://i.pravatar.cc/150?img=18",
    },
    {
      id: "3",
      name: "Vikas Singh",
      rating: 4.7,
      image: "https://i.pravatar.cc/150?img=14",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 💈 Header Banner with Multiple Images */}
        <LinearGradient
          colors={["#4C1D95", "#7C3AED"]}
          style={styles.headerBanner}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={26} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Men’s Salon 💈</Text>
          </View>

          <Text style={styles.headerSubtitle}>
            Fresh looks. Premium care. Delivered to your doorstep ✂️
          </Text>

          {/* 🖼️ Layered Background Image Collage */}
          <View style={styles.imageGrid}>
            {[
              "https://images.pexels.com/photos/3992879/pexels-photo-3992879.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/3993446/pexels-photo-3993446.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/3997994/pexels-photo-3997994.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/3992871/pexels-photo-3992871.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/3998034/pexels-photo-3998034.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/3997394/pexels-photo-3997394.jpeg?auto=compress&cs=tinysrgb&w=800",
            ].map((img, index) => (
              <MotiImage
                key={index}
                source={{ uri: img }}
                style={[styles.headerSmallImage, { zIndex: 6 - index }]}
                resizeMode="cover"
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  delay: index * 200,
                  type: "timing",
                  duration: 600,
                }}
              />
            ))}
          </View>
        </LinearGradient>

        {/* 🧔 Featured Barbers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Rated Barbers 🌟</Text>
          <FlatList
            horizontal
            data={topBarbers}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.barberCard}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.barberImage}
                />
                <Text style={styles.barberName}>{item.name}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#FACC15" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
            )}
          />
        </View>

        {/* 💇 Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Services ✂️</Text>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => router.push("/services/booking" as any)}
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
                  <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookText}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 💸 Offer Banner */}
        <LinearGradient
          colors={["#FDE68A", "#FCD34D"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.offerBanner}
        >
          <Ionicons name="gift-outline" size={34} color="#92400E" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.offerTitle}>Exclusive Offer 🎁</Text>
            <Text style={styles.offerDesc}>
              Get 20% OFF on your first salon service booking!
            </Text>
          </View>
        </LinearGradient>

        {/* 🧴 Add-on Care Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Grooming Add-ons 💅</Text>
          {[
            "🧴 Hair Spa & Nourishment",
            "🪮 Beard Coloring",
            "🧖‍♂️ Steam Facial",
            "💆 Head Relaxation Therapy",
          ].map((addon, i) => (
            <Text key={i} style={styles.addonItem}>
              {addon}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },

  headerBanner: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    position: "relative",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
    marginLeft: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#E0E7FF",
    marginBottom: 20,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  headerSmallImage: {
    width: "31%",
    height: 90,
    borderRadius: 12,
    marginBottom: 8,
    opacity: 0.95,
  },

  section: { marginTop: 22, paddingHorizontal: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },

  barberCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    alignItems: "center",
    marginRight: 16,
    width: 140,
    paddingVertical: 16,
    paddingHorizontal: 10,
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: "rgba(124, 58, 237, 0.15)", // light purple border for premium feel
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0,
    shadowRadius: 200,
    elevation: 2,
  },

  barberImage: {
    width: 80,
    height: 35,
    borderRadius: 35,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#7C3AED",
  },
  barberName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3E8FF",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
    color: "#6D28D9",
  },
  serviceCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    flexDirection: "row",
    marginBottom: 16,
    elevation: 2,
    overflow: "hidden",
  },
  serviceImage: { width: 120, height: 120 },
  serviceInfo: { flex: 1, padding: 10, justifyContent: "center" },
  serviceTitle: { fontSize: 15, fontWeight: "700", color: "#111827" },
  serviceDesc: { fontSize: 13, color: "#6B7280", marginVertical: 4 },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: { fontSize: 14, color: "#7C3AED", fontWeight: "700" },
  bookButton: {
    backgroundColor: "#7C3AED",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  bookText: { color: "#fff", fontWeight: "600", fontSize: 13 },

  offerBanner: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    padding: 16,
    margin: 16,
  },
  offerTitle: { fontSize: 16, fontWeight: "700", color: "#78350F" },
  offerDesc: { fontSize: 13, color: "#92400E" },

  addonItem: {
    backgroundColor: "#EEF2FF",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    fontSize: 14,
    color: "#4C1D95",
    fontWeight: "600",
  },
});
