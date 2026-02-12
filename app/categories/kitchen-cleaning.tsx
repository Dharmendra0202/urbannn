import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function KitchenCleaningScreen() {
  const [fridge, setFridge] = useState(false);
  const [microwave, setMicrowave] = useState(false);

  const basePrice = 799;
  const total = basePrice + (fridge ? 150 : 0) + (microwave ? 100 : 0);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Hero */}
        <Image
          source={{
            uri: "https://images.pexels.com/photos/5824872/pexels-photo-5824872.jpeg",
          }}
          style={styles.banner}
        />
        <Text style={styles.badge}>Removes 99% of Oil & Grime</Text>

        {/* Checklist */}
        <Text style={styles.heading}>Deep Cleaning Checklist</Text>

        <Text style={styles.item}>• Chimney / Exhaust fan degreasing</Text>
        <Text style={styles.item}>• Stovetop scrubbing</Text>
        <Text style={styles.item}>• Cabinet exterior wipe</Text>
        <Text style={styles.item}>• Sink disinfection & backsplash scrub</Text>

        {/* Add-ons */}
        <Text style={styles.heading}>Customization</Text>

        <TouchableOpacity
          onPress={() => setFridge(!fridge)}
          style={styles.toggle}
        >
          <Text>Inside Fridge Cleaning (+₹150)</Text>
          <Ionicons name={fridge ? "checkbox" : "square-outline"} size={22} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setMicrowave(!microwave)}
          style={styles.toggle}
        >
          <Text>Inside Microwave Cleaning (+₹100)</Text>
          <Ionicons
            name={microwave ? "checkbox" : "square-outline"}
            size={22}
          />
        </TouchableOpacity>

        {/* Pro tools */}
        <Text style={styles.heading}>Pro Tools Used</Text>
        <Text style={styles.item}>Industrial Degreasers</Text>
        <Text style={styles.item}>Vacuum Cleaners</Text>
        <Text style={styles.item}>Microfiber Cloths</Text>
      </ScrollView>

      {/* Sticky footer */}
      <View style={styles.footer}>
        <Text style={styles.price}>₹{total}</Text>
        <TouchableOpacity style={styles.bookBtn}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { width: "100%", height: 220 },
  badge: {
    backgroundColor: "#111",
    color: "#fff",
    alignSelf: "flex-start",
    margin: 16,
    padding: 6,
    borderRadius: 6,
  },
  heading: { fontSize: 18, fontWeight: "700", margin: 16 },
  item: { marginHorizontal: 16, marginBottom: 8 },
  toggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    paddingVertical: 12,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  price: { fontSize: 20, fontWeight: "700" },
  bookBtn: {
    backgroundColor: "#7C3AED",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 12,
  },
});
