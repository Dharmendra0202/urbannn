import { specialists } from "@/constants/home-data";
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
const cardWidth = (width - 42) / 2;

export default function CategoriesIndex() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={specialists}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <LinearGradient colors={["#0E7490", "#1D4ED8"]} style={styles.hero}>
            <View style={styles.heroTopRow}>
              <Text style={styles.heroTag}>SPECIALISTS</Text>
              <View style={styles.heroBadge}>
                <Ionicons name="shield-checkmark-outline" size={12} color="#0E7490" />
                <Text style={styles.heroBadgeText}>Verified pros</Text>
              </View>
            </View>
            <Text style={styles.heroTitle}>We Are Specialists In</Text>
            <Text style={styles.heroSubtitle}>
              Expert-led services with trained professionals and quality guarantee.
            </Text>
          </LinearGradient>
        }
        renderItem={({ item, index }) => (
          <MotiView
            from={{ opacity: 0, scale: 0.92, translateY: 20 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            transition={{ delay: index * 80, type: "timing", duration: 350 }}
            style={{ width: cardWidth }}
          >
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => item.route && router.push(item.route as any)}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.cardBody}>
                <Text numberOfLines={1} style={styles.title}>{item.name}</Text>
                <View style={styles.metaRow}>
                  <Text style={styles.price}>₹{item.price}</Text>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={11} color="#F59E0B" />
                    <Text style={styles.rating}>{item.rating}</Text>
                  </View>
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
  container: { flex: 1, backgroundColor: "#F5FBFA" },
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
  heroTag: { color: "#CCFBF1", fontSize: 11, letterSpacing: 0.8, fontWeight: "700" },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 999,
    backgroundColor: "#CCFBF1",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  heroBadgeText: { color: "#0E7490", fontSize: 10, fontWeight: "700" },
  heroTitle: { color: "#FFFFFF", fontSize: 26, fontWeight: "800", lineHeight: 32 },
  heroSubtitle: { color: "#DBEAFE", marginTop: 6, fontSize: 13, lineHeight: 19 },
  row: { justifyContent: "space-between", marginBottom: 10 },
  card: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D9E8E6",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  image: { width: "100%", height: 110 },
  cardBody: { padding: 10 },
  title: { color: "#0F172A", fontSize: 13, fontWeight: "700" },
  metaRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: { color: "#0E7490", fontSize: 15, fontWeight: "700" },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  rating: { color: "#475569", fontSize: 12 },
});
