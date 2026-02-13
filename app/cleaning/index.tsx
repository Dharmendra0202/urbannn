import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import HorizontalCard from "@/components/HorizontalCard";

const services = [
  {
    id: "1",
    name: "Intense Bathroom Cleaning",
    price: 2499,
    rating: 4.5,
    image: "https://images.pexels.com/photos/4108711/pexels-photo-4108711.jpeg",
  },
  {
    id: "2",
    name: "Pest Control Service",
    price: 999,
    rating: 4.4,
    image: "https://images.pexels.com/photos/6197120/pexels-photo-6197120.jpeg",
  },
  {
    id: "3",
    name: "Apartment Pest Control",
    price: 1549,
    rating: 4.3,
    image: "https://images.pexels.com/photos/6197119/pexels-photo-6197119.jpeg",
  },
  {
    id: "4",
    name: "Bathroom Deep Cleaning",
    price: 399,
    rating: 4.6,
    image: "https://images.pexels.com/photos/5649812/pexels-photo-5649812.jpeg",
  },
  {
    id: "5",
    name: "Mattress Cleaning",
    price: 399,
    rating: 4.5,
    image: "https://images.pexels.com/photos/4107284/pexels-photo-4107284.jpeg",
  },
  {
    id: "6",
    name: "Fridge Cleaning",
    price: 399,
    rating: 4.6,
    image: "https://images.pexels.com/photos/5824884/pexels-photo-5824884.jpeg",
  },
  {
    id: "7",
    name: "Carpet Cleaning",
    price: 399,
    rating: 4.7,
    image: "https://images.pexels.com/photos/4107282/pexels-photo-4107282.jpeg",
  },
  {
    id: "8",
    name: "Laundry & Ironing",
    price: 249,
    rating: 4.4,
    image: "https://images.pexels.com/photos/3951628/pexels-photo-3951628.jpeg",
  },
];

export default function CleaningIndex() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cleaning Services</Text>

      <FlatList
        data={services}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <HorizontalCard
            item={item}
            onPress={() =>
              router.push(
                `/cleaning/${item.name.replace(/\s+/g, "-").toLowerCase()}` as any,
              )
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  heading: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
});
