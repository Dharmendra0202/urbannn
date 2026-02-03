import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import HorizontalCard, {
  HorizontalItem,
} from "../../components/HorizontalCard";

const services: HorizontalItem[] = [
  {
    id: "1",
    name: "Kitchen Counter Cleaning",
    price: 399,
    rating: 4.5,
    image: "https://images.pexels.com/photos/5854186/pexels-photo-5854186.jpeg",
  },
  {
    id: "2",
    name: "Sink Cleaning",
    price: 299,
    rating: 4.4,
    image: "https://images.pexels.com/photos/4239144/pexels-photo-4239144.jpeg",
  },
  {
    id: "3",
    name: "Cabinet Cleaning",
    price: 499,
    rating: 4.6,
    image: "https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg",
  },
  {
    id: "4",
    name: "Floor Cleaning",
    price: 399,
    rating: 4.5,
    image: "https://images.pexels.com/photos/4107282/pexels-photo-4107282.jpeg",
  },
  {
    id: "5",
    name: "Exhaust Cleaning",
    price: 599,
    rating: 4.7,
    image: "https://images.pexels.com/photos/4107284/pexels-photo-4107284.jpeg",
  },
  {
    id: "6",
    name: "Fridge Cleaning",
    price: 699,
    rating: 4.6,
    image: "https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg",
  },
  {
    id: "7",
    name: "Oven Cleaning",
    price: 799,
    rating: 4.8,
    image: "https://images.pexels.com/photos/4107281/pexels-photo-4107281.jpeg",
  },
  {
    id: "8",
    name: "Microwave Cleaning",
    price: 499,
    rating: 4.5,
    image: "https://images.pexels.com/photos/4239148/pexels-photo-4239148.jpeg",
  },
];

const KitchenCleaningScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Kitchen Cleaning Services</Text>
      <FlatList
        data={services}
        renderItem={({ item }) => <HorizontalCard item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default KitchenCleaningScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  heading: { fontSize: 20, fontWeight: "700", marginBottom: 16 },
});
