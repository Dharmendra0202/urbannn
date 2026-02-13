import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { cleaningServices, getCleaningRoute } from "@/constants/cleaning-services";

const { width } = Dimensions.get("window");
const cardWidth = (width - 42) / 2;

const headingFont = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: undefined,
});

const bodyFont = Platform.select({
  ios: "AvenirNext-Regular",
  android: "sans-serif",
  default: undefined,
});

const uiFont = Platform.select({
  ios: "AvenirNext-DemiBold",
  android: "sans-serif-medium",
  default: undefined,
});

export default function CleaningIndex() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cleaningServices}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <LinearGradient colors={["#0E7490", "#C2410C"]} style={styles.hero}>
            <View style={styles.heroTopRow}>
              <Text style={styles.heroTag}>CLEANING ESSENTIALS</Text>
              <View style={styles.heroBadge}>
                <Ionicons name="sparkles-outline" size={12} color="#D97706" />
                <Text style={styles.heroBadgeText}>Verified teams</Text>
              </View>
            </View>
            <Text style={styles.heroTitle}>Professional Home Cleaning</Text>
            <Text style={styles.heroSubtitle}>
              Deep cleaning, hygiene maintenance, and product-safe treatments
              with clear package pricing.
            </Text>
          </LinearGradient>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => router.push(getCleaningRoute(item.slug) as any)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardBody}>
              <Text numberOfLines={1} style={styles.title}>
                {item.name}
              </Text>
              <View style={styles.metaRow}>
                <Text style={styles.price}>₹{item.price}</Text>
                <Text style={styles.rating}>★ {item.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5FBFA" },
  hero: {
    margin: 14,
    borderRadius: 20,
    padding: 18,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  heroTag: {
    color: "#CCFBF1",
    fontSize: 11,
    letterSpacing: 0.8,
    fontFamily: uiFont,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 999,
    backgroundColor: "#FFEDD5",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  heroBadgeText: {
    color: "#9A3412",
    fontSize: 10,
    fontFamily: uiFont,
  },
  heroTitle: {
    color: "#FFFFFF",
    marginTop: 7,
    fontSize: 28,
    lineHeight: 33,
    fontFamily: headingFont,
  },
  heroSubtitle: {
    color: "#DBEAFE",
    marginTop: 8,
    fontSize: 13,
    lineHeight: 19,
    maxWidth: "95%",
    fontFamily: bodyFont,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  card: {
    width: cardWidth,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D9E8E6",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 110,
  },
  cardBody: {
    padding: 10,
  },
  title: {
    color: "#0F172A",
    fontSize: 13,
    fontFamily: uiFont,
  },
  metaRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    color: "#0E7490",
    fontSize: 15,
    fontFamily: uiFont,
  },
  rating: {
    color: "#475569",
    fontSize: 12,
    fontFamily: bodyFont,
  },
});
