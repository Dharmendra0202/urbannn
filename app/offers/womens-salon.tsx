import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function WomensSalonScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient colors={["#EC4899", "#A855F7"]} style={styles.header}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
          }}
          style={styles.headerImage}
        />
        <Text style={styles.title}>💇‍♀️ Salon at Home</Text>
        <Text style={styles.subtitle}>For Women • Beauty at your doorstep</Text>
      </LinearGradient>

      {/* Services */}
      <Text style={styles.sectionTitle}>✨ Services We Provide</Text>

      <ServiceItem icon="cut-outline" name="Haircut & Styling" price="₹499" />
      <ServiceItem
        icon="sparkles-outline"
        name="Facial & Cleanup"
        price="₹799"
      />
      <ServiceItem icon="body-outline" name="Waxing" price="₹599" />
      <ServiceItem
        icon="hand-left-outline"
        name="Manicure & Pedicure"
        price="₹699"
      />
      <ServiceItem icon="rose-outline" name="Bridal Makeup" price="₹2999" />

      {/* Facilities */}
      <Text style={styles.sectionTitle}>🌸 Why Choose Us</Text>

      <View style={styles.facilitiesBox}>
        <Text style={styles.facility}>👩‍🔬 Female professionals only</Text>
        <Text style={styles.facility}>🏠 Home service comfort</Text>
        <Text style={styles.facility}>🧼 Hygienic & sanitized tools</Text>
        <Text style={styles.facility}>💄 Premium beauty products</Text>
        <Text style={styles.facility}>⏰ On-time service</Text>
      </View>

      {/* Book Button */}
      <TouchableOpacity style={styles.bookBtn}>
        <Text style={styles.bookText}>Book Now 💕</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ---------- Small Component ---------- */
function ServiceItem({
  icon,
  name,
  price,
}: {
  icon: any;
  name: string;
  price: string;
}) {
  return (
    <View style={styles.serviceCard}>
      <Ionicons name={icon} size={24} color="#EC4899" />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.serviceName}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
      <TouchableOpacity style={styles.addBtn}>
        <Text style={{ color: "#fff" }}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    height: 220,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    padding: 16,
    justifyContent: "flex-end",
  },
  headerImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.25,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    color: "#FCE7F3",
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    margin: 16,
  },

  serviceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDF2F8",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    borderRadius: 14,
  },
  serviceName: {
    fontSize: 15,
    fontWeight: "600",
  },
  price: {
    fontSize: 13,
    color: "#EC4899",
  },
  addBtn: {
    backgroundColor: "#EC4899",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  facilitiesBox: {
    backgroundColor: "#FAE8FF",
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
  },
  facility: {
    fontSize: 14,
    marginBottom: 8,
  },

  bookBtn: {
    backgroundColor: "#A855F7",
    margin: 20,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  bookText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
