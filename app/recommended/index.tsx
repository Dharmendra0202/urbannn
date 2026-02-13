import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  getRecommendedRoute,
  recommendedServices,
} from "@/constants/recommended-services";

const { width } = Dimensions.get("window");
const cardWidth = (width - 42) / 2;

export default function RecommendedIndex() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recommendedServices}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <LinearGradient colors={["#0F172A", "#1D4ED8"]} style={styles.hero}>
            <Text style={styles.heroCaption}>CURATED FOR YOU</Text>
            <Text style={styles.heroTitle}>Recommended Services</Text>
            <Text style={styles.heroSubtitle}>
              Explore trusted professionals with transparent pricing and quick
              bookings.
            </Text>
          </LinearGradient>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.card}
            onPress={() => router.push(getRecommendedRoute(item.id) as any)}
          >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text numberOfLines={1} style={styles.cardTitle}>
                {item.name}
              </Text>
              <View style={styles.cardMetaRow}>
                <Text style={styles.cardPrice}>₹{item.price}</Text>
                <Text style={styles.cardRating}>★ {item.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  hero: {
    margin: 14,
    borderRadius: 20,
    padding: 18,
  },
  heroCaption: {
    color: "#93C5FD",
    letterSpacing: 0.8,
    fontSize: 11,
    fontWeight: "700",
  },
  heroTitle: {
    marginTop: 6,
    color: "#F8FAFC",
    fontSize: 24,
    fontWeight: "800",
  },
  heroSubtitle: {
    marginTop: 8,
    color: "#DBEAFE",
    fontSize: 13,
    lineHeight: 18,
    maxWidth: "90%",
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  card: {
    width: cardWidth,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 110,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    color: "#0F172A",
    fontWeight: "700",
    fontSize: 13,
  },
  cardMetaRow: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardPrice: {
    color: "#0F766E",
    fontWeight: "800",
    fontSize: 14,
  },
  cardRating: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "600",
  },
});
