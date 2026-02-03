// components/HorizontalCard.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Define the item type
export interface HorizontalItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}

// Props for the card
interface HorizontalCardProps {
  item: HorizontalItem;
  onPress?: () => void; // ✅ optional to fix TS error
}

const HorizontalCard: React.FC<HorizontalCardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.8}
      onPress={onPress} // ✅ now safe to pass from FlatList
    >
      <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.priceText}>₹{item.price}</Text>
        <View style={styles.ratingBox}>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    width: 150,
    borderRadius: 20,
    marginRight: 14,
    shadowColor: "#9498a0ff",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    paddingBottom: 10,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#ccc",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
    marginHorizontal: 8,
    marginTop: 6,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 8,
    marginTop: 2,
  },
  priceText: {
    fontSize: 13,
    color: "#7C3AED",
    fontWeight: "600",
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: "#111",
    marginLeft: 2,
  },
});
