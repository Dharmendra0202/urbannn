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
      <Stack.Screen options={{ title: "Painting Service" }} />
      <ScrollView style={styles.container}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/3865792/pexels-photo-3865792.jpeg",
          }}
          style={styles.banner}
        />

        <Text style={styles.heading}>Work Included</Text>
        <Text style={styles.item}>• Wall painting</Text>
        <Text style={styles.item}>• Putty work</Text>
        <Text style={styles.item}>• Texture finish</Text>

        <Text style={styles.heading}>Tools Used</Text>
        <Text style={styles.item}>• Roller kit</Text>
        <Text style={styles.item}>• Spray machine</Text>
        <Text style={styles.item}>• Surface polish tools</Text>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  banner: {
    width: "100%",
    height: 220,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 18,
    marginHorizontal: 16,
  },
  item: {
    marginHorizontal: 16,
    marginTop: 8,
    fontSize: 14,
    color: "#374151",
  },
  btn: {
    backgroundColor: "#7C3AED",
    margin: 20,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
