import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";

export default function CleaningServicePage({
  title,
  price,
  image,
}: {
  title: string;
  price: number;
  image: string;
}) {
  return (
    <>
      <Stack.Screen options={{ title }} />

      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />

        <View style={{ padding: 16 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>₹{price}</Text>
        </View>

        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Add Service</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 250 },
  title: { fontSize: 22, fontWeight: "700" },
  price: { marginTop: 6, fontSize: 18, color: "#7C3AED" },
  btn: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#7C3AED",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
});
