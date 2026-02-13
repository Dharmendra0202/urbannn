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
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { getRepairRoute, repairServices } from "@/constants/repair-services";

const { width } = Dimensions.get("window");
const cardWidth = (width - 42) / 2;

export default function RepairIndex() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={repairServices}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <LinearGradient colors={["#111827", "#7C2D12"]} style={styles.hero}>
            <Text style={styles.heroTag}>REPAIR & INSTALLATION</Text>
            <Text style={styles.heroTitle}>Home Repair Services</Text>
            <Text style={styles.heroSubtitle}>
              Verified technicians for carpentry, plumbing, electricals, and
              installations with transparent pricing.
            </Text>
          </LinearGradient>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => router.push(getRepairRoute(item.id) as any)}
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
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  hero: {
    margin: 14,
    borderRadius: 20,
    padding: 18,
  },
  heroTag: {
    color: "#FDBA74",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  heroTitle: {
    color: "#FFFFFF",
    marginTop: 6,
    fontSize: 24,
    fontWeight: "800",
  },
  heroSubtitle: {
    color: "#E5E7EB",
    marginTop: 8,
    fontSize: 13,
    lineHeight: 18,
    maxWidth: "92%",
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
    borderColor: "#E2E8F0",
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
    color: "#111827",
    fontSize: 13,
    fontWeight: "700",
  },
  metaRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    color: "#0F766E",
    fontWeight: "800",
    fontSize: 14,
  },
  rating: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "600",
  },
});
