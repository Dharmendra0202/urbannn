import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

export default function BathroomCleaningScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/5649812/pexels-photo-5649812.jpeg",
          }}
          style={styles.banner}
        />

        <Text style={styles.heading}>Service Highlights</Text>
        <Text style={styles.item}>• Tile grout deep cleaning</Text>
        <Text style={styles.item}>• Hard water stain removal</Text>
        <Text style={styles.item}>• Mirror & chrome polishing</Text>
        <Text style={styles.item}>• Sink & commode disinfection</Text>

        {/* Trust signals */}
        <View style={styles.badges}>
          <Text style={styles.badge}>✔ Verified Professionals</Text>
          <Text style={styles.badge}>✔ Chemicals Included</Text>
        </View>
      </ScrollView>

      {/* Sticky */}
      <View style={styles.footer}>
        <Text style={styles.price}>₹699</Text>
        <TouchableOpacity style={styles.bookBtn}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { width: "100%", height: 220 },
  heading: { fontSize: 18, fontWeight: "700", margin: 16 },
  item: { marginHorizontal: 16, marginBottom: 8 },
  badges: { margin: 16 },
  badge: {
    backgroundColor: "#EEF2FF",
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
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
