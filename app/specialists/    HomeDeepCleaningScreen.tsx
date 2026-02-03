import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import HorizontalCard, {
  HorizontalItem,
} from "../../components/HorizontalCard";

const services: HorizontalItem[] = [
  {
    id: "1",
    name: "Sofa Cleaning",
    price: 499,
    rating: 4.8,
    image: "https://images.pexels.com/photos/4239148/pexels-photo-4239148.jpeg",
  },
  {
    id: "2",
    name: "Carpet Cleaning",
    price: 699,
    rating: 4.7,
    image: "https://images.pexels.com/photos/4107281/pexels-photo-4107281.jpeg",
  },
  {
    id: "3",
    name: "Bathroom Deep Cleaning",
    price: 599,
    rating: 4.6,
    image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
  },
  {
    id: "4",
    name: "Kitchen Deep Cleaning",
    price: 799,
    rating: 4.7,
    image: "https://images.pexels.com/photos/5854186/pexels-photo-5854186.jpeg",
  },
  {
    id: "5",
    name: "Window Cleaning",
    price: 399,
    rating: 4.5,
    image: "https://images.pexels.com/photos/4107282/pexels-photo-4107282.jpeg",
  },
  {
    id: "6",
    name: "Cupboard Cleaning",
    price: 299,
    rating: 4.4,
    image: "https://images.pexels.com/photos/4239144/pexels-photo-4239144.jpeg",
  },
  {
    id: "7",
    name: "Floor Polishing",
    price: 499,
    rating: 4.6,
    image: "https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg",
  },
  {
    id: "8",
    name: "Sofa Shampoo",
    price: 599,
    rating: 4.7,
    image: "https://images.pexels.com/photos/4107284/pexels-photo-4107284.jpeg",
  },
];

const HomeDeepCleaningScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Home Deep Cleaning Services</Text>
      <FlatList
        data={services}
        renderItem={({ item }) => <HorizontalCard item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeDeepCleaningScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  heading: { fontSize: 20, fontWeight: "700", marginBottom: 16 },
});
