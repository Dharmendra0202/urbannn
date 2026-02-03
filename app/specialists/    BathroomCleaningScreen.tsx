import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import HorizontalCard, {
  HorizontalItem,
} from "../../components/HorizontalCard";

const services: HorizontalItem[] = [
  {
    id: "1",
    name: "Toilet Cleaning",
    price: 299,
    rating: 4.5,
    image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
  },
  {
    id: "2",
    name: "Shower Cleaning",
    price: 399,
    rating: 4.6,
    image: "https://images.pexels.com/photos/4239144/pexels-photo-4239144.jpeg",
  },
  {
    id: "3",
    name: "Sink & Faucet Cleaning",
    price: 299,
    rating: 4.4,
    image: "https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg",
  },
  {
    id: "4",
    name: "Mirror Cleaning",
    price: 199,
    rating: 4.3,
    image: "https://images.pexels.com/photos/4107282/pexels-photo-4107282.jpeg",
  },
  {
    id: "5",
    name: "Tile Cleaning",
    price: 499,
    rating: 4.6,
    image: "https://images.pexels.com/photos/4107284/pexels-photo-4107284.jpeg",
  },
  {
    id: "6",
    name: "Exhaust Fan Cleaning",
    price: 399,
    rating: 4.5,
    image: "https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg",
  },
  {
    id: "7",
    name: "Bath Mat Cleaning",
    price: 199,
    rating: 4.4,
    image: "https://images.pexels.com/photos/4239148/pexels-photo-4239148.jpeg",
  },
  {
    id: "8",
    name: "Cabinet & Shelf Cleaning",
    price: 299,
    rating: 4.5,
    image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
  },
];

const BathroomCleaningScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bathroom Cleaning Services</Text>
      <FlatList
        data={services}
        renderItem={({ item }) => <HorizontalCard item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default BathroomCleaningScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  heading: { fontSize: 20, fontWeight: "700", marginBottom: 16 },
});
