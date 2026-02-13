import React from "react";
import { ScrollView, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";

export default function Page() {
  return (
    <>
      <Stack.Screen options={{ title: "Plumbing Fix" }} />
      <ScrollView style={styles.container}>
        <Image source={{ uri: "https://images.pexels.com/photos/5854186/pexels-photo-5854186.jpeg" }} style={styles.banner} />

        <Text style={styles.heading}>Work Included</Text>
        <Text style={styles.item}>• Leak fixing</Text>
        <Text style={styles.item}>• Tap installation</Text>
        <Text style={styles.item}>• Pipe repair</Text>

        <Text style={styles.heading}>Tools Used</Text>
        <Text style={styles.item}>• Pipe wrench</Text>
        <Text style={styles.item}>• Sealant tools</Text>
        <Text style={styles.item}>• Pressure tools</Text>

        <TouchableOpacity style={styles.btn}><Text style={styles.btnText}>Book Now</Text></TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  banner: { width: "100%", height: 220 },

  heading: {
    fontSize: 18,
    fontWeight: "700",
    margin: 16,
  },

  item: {
    marginHorizontal: 16,
    marginBottom: 6,
    fontSize: 14,
  },

  btn: {
    backgroundColor: "#7C3AED",
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
});
