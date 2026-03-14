import { offers } from "@/constants/home-data";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React from "react";
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function OffersIndex() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <LinearGradient colors={["#7C3AED", "#1D4ED8"]} style={styles.hero}>
            <View style={styles.heroTopRow}>
              <Text style={styles.heroTag}>OFFERS & DISCOUNTS</Text>
              <View style={styles.heroBadge}>
                <Ionicons name="pricetag-outline" size={12} color="#7C3AED" />
                <Text style={styles.heroBadgeText}>Limited time</Text>
              </View>
            </View>
            <Text style={styles.heroTitle}>Best Deals For You</Text>
            <Text style={styles.heroSubtitle}>
              Handpicked offers on top-rated home services at unbeatable prices.
            </Text>
          </LinearGradient>
        }
        renderItem={({ item, index }) => (
          <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 60, type: "timing", duration: 350 }}
          >
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => router.push(item.route as any)}
            >
            <Image source={{ uri: item.image }} style={styles.image} />
            <LinearGradient
              colors={["rgba(2,6,23,0.0)", "rgba(2,6,23,0.55)"]}
              style={styles.overlay}
            />
            <View style={styles.topRow}>
              <View style={styles.discountPill}>
                <Ionicons name="pricetag" size={11} color="#082F49" />
                <Text style={styles.discountText}>{item.discount}</Text>
              </View>
              <View style={styles.etaPill}>
                <Ionicons name="flash" size={11} color="#fff" />
                <Text style={styles.etaText}>{item.eta}</Text>
              </View>
            </View>
            <View style={styles.bottom}>
              <Text numberOfLines={2} style={styles.cardTitle}>{item.name}</Text>
              <View style={styles.metaRow}>
                <View style={styles.ratingPill}>
                  <Ionicons name="star" size={11} color="#FCD34D" />
                  <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                </View>
                <Text style={styles.fromText}>from</Text>
                <Text style={styles.priceText}>₹{item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
          </MotiView>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFF" },
  list: { paddingHorizontal: 14, paddingBottom: 30 },
  hero: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    marginTop: 4,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  heroTag: { color: "#DDD6FE", fontSize: 11, letterSpacing: 0.8, fontWeight: "700" },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 999,
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  heroBadgeText: { color: "#7C3AED", fontSize: 10, fontWeight: "700" },
  heroTitle: { color: "#FFFFFF", fontSize: 26, fontWeight: "800", lineHeight: 32 },
  heroSubtitle: { color: "#DDD6FE", marginTop: 6, fontSize: 13, lineHeight: 19 },
  card: {
    width: "100%",
    height: 200,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 14,
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  image: { ...StyleSheet.absoluteFillObject },
  overlay: { ...StyleSheet.absoluteFillObject },
  topRow: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  discountPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.93)",
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  discountText: { color: "#082F49", fontSize: 11, fontWeight: "800" },
  etaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 999,
    backgroundColor: "rgba(15,23,42,0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.26)",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  etaText: { color: "#E2E8F0", fontSize: 10, fontWeight: "700" },
  bottom: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
  },
  cardTitle: { color: "#F8FAFC", fontSize: 16, fontWeight: "800", marginBottom: 8 },
  metaRow: { flexDirection: "row", alignItems: "center" },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 999,
    backgroundColor: "rgba(15,23,42,0.45)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingText: { color: "#F8FAFC", fontSize: 11, fontWeight: "700" },
  fromText: { marginLeft: 8, color: "#CBD5E1", fontSize: 11, fontWeight: "600" },
  priceText: { marginLeft: 4, color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
});
