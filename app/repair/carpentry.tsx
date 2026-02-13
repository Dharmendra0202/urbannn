import React from "react";
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Stack } from "expo-router";

export default function Page() {
  return (
    <>
      <Stack.Screen options={{ title: "Carpentry Work" }} />
      <ScrollView style={styles.container}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/4505170/pexels-photo-4505170.jpeg",
          }}
          style={styles.banner}
        />

        <Text style={styles.heading}>Work Included</Text>
        <Text style={styles.item}>• Furniture repair</Text>
        <Text style={styles.item}>• Door & window fixing</Text>
        <Text style={styles.item}>• Drawer channel installation</Text>

        <Text style={styles.heading}>Tools Used</Text>
        <Text style={styles.item}>• Electric drill</Text>
        <Text style={styles.item}>• Cutting tools</Text>
        <Text style={styles.item}>• Measuring tools</Text>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  banner: { width: "100%", height: 220 },
  heading: { fontSize: 18, fontWeight: "700", margin: 16 },
  item: { marginHorizontal: 16, marginBottom: 6 },
  btn: {
    backgroundColor: "#7C3AED",
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "700" },
});
