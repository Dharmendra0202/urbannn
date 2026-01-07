import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors, gradients } from "../theme/colors";
import { useRouter } from "expo-router"; // ✅ Added import

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "cancelled">(
    "upcoming"
  );

  const router = useRouter(); // ✅ Added router instance

  // ✅ Sample data
  const bookings = {
    upcoming: [
      {
        id: 1,
        title: "Full Home Cleaning",
        date: "Sat, Jan 20",
        time: "10:00 AM",
        address: "123 Main Street, Apartment 4B",
        price: "₹1499",
        status: "Upcoming",
        image:
          "https://images.pexels.com/photos/4239148/pexels-photo-4239148.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    completed: [
      {
        id: 2,
        title: "AC Service",
        date: "Mon, Jan 15",
        time: "2:00 PM",
        address: "456 Oak Avenue, House 12",
        price: "₹499",
        status: "Completed",
        image:
          "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        id: 3,
        title: "Haircut",
        date: "Wed, Jan 10",
        time: "11:00 AM",
        address: "789 Pine Road, Suite 301",
        price: "₹299",
        status: "Completed",
        image:
          "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    cancelled: [],
  };

  const renderBookings = (list: any[], status: string) => {
    if (list.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={42} color="#9CA3AF" />
          <Text style={styles.emptyTitle}>No {status.toLowerCase()} bookings</Text>
          <Text style={styles.emptySubtitle}>
            You don’t have any {status.toLowerCase()} bookings
          </Text>
        </View>
      );
    }

    return list.map((item) => (
      <View key={item.id} style={styles.bookingCard}>
        <Image source={{ uri: item.image }} style={styles.image} />

        <View style={{ flex: 1, marginLeft: 10 }}>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>{item.title}</Text>
            <Text
              style={[
                styles.status,
                {
                  color:
                    item.status === "Upcoming"
                      ? "#7C3AED"
                      : item.status === "Completed"
                      ? "#16A34A"
                      : "#EF4444",
                },
              ]}
            >
              {item.status}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={14} color="#6B7280" />
            <Text style={styles.detailText}>{item.date}</Text>
            <Ionicons
              name="time-outline"
              size={14}
              color="#6B7280"
              style={{ marginLeft: 10 }}
            />
            <Text style={styles.detailText}>{item.time}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={14} color="#6B7280" />
            <Text numberOfLines={1} style={styles.detailText}>
              {item.address}
            </Text>
          </View>

          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.price}>{item.price}</Text>

          {/* Buttons */}
          {item.status === "Upcoming" ? (
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.rescheduleBtn}>
                <Text style={styles.rescheduleText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.bookAgainBtn}>
              <LinearGradient
                colors={gradients.purple}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.bookAgainGradient}
              >
                <Text style={styles.bookAgainText}>Book Again</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {/* ✅ Header with working back button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/categories")} // ✅ Updated navigation
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {["upcoming", "completed", "cancelled"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(tab as any)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderBookings(bookings[activeTab], activeTab)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    paddingTop: 60, // 🧭 Adjust this to control top spacing
  },

  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  backButton: { padding: 4, marginRight: 8 }, // ✅ Added padding for touch area
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 8,
  },
  tabText: { fontSize: 14, fontWeight: "600", color: "#6B7280" },
  activeTabButton: { backgroundColor: colors.white },
  activeTabText: { color: "#7C3AED" },

  bookingCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  image: { width: 70, height: 70, borderRadius: 8 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 16, fontWeight: "700", color: colors.textPrimary },
  status: { fontSize: 13, fontWeight: "600" },
  detailRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  detailText: { fontSize: 12, color: "#6B7280", marginLeft: 4 },
  totalText: { fontSize: 12, color: "#6B7280", marginTop: 6 },
  price: { fontSize: 15, fontWeight: "700", color: "#7C3AED" },

  bookAgainBtn: { marginTop: 10 },
  bookAgainGradient: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  bookAgainText: { color: "#fff", fontWeight: "600" },

  actionButtons: { justifyContent: "space-between", marginTop: 10 },
  rescheduleBtn: {
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 6,
  },
  rescheduleText: { color: "#7C3AED", fontWeight: "600" },
  cancelBtn: {
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  cancelText: { color: "#DC2626", fontWeight: "600" },

  emptyContainer: { alignItems: "center", marginTop: 60 },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 10,
  },
  emptySubtitle: { fontSize: 13, color: "#6B7280" },
});
