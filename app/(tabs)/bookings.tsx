import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  RefreshControl,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors, gradients } from "../../theme/colors";
import { useRouter } from "expo-router";

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState<
    "upcoming" | "completed" | "cancelled"
  >("upcoming");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

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
       {
         id: 2,
         title: "Car Wash & Wax",
         date: "Sun, Jan 21",
         time: "9:30 AM",
         address: "201 King Street, Parking Lot B",
         price: "₹699",
         status: "Upcoming",
         image:
           "https://images.pexels.com/photos/6872590/pexels-photo-6872590.jpeg?auto=compress&cs=tinysrgb&w=600",
       },
       {
         id: 3,
         title: "Kitchen Deep Cleaning",
         date: "Mon, Jan 22",
         time: "8:00 AM",
         address: "742 Evergreen Terrace, Flat 9A",
         price: "₹899",
         status: "Upcoming",
         image:
           "https://images.pexels.com/photos/4239035/pexels-photo-4239035.jpeg?auto=compress&cs=tinysrgb&w=600",
       },
       {
         id: 4,
         title: "Plumber Service",
         date: "Tue, Jan 23",
         time: "1:00 PM",
         address: "55 Baker Street, Apt 14",
         price: "₹499",
         status: "Upcoming",
         image:
           "https://images.pexels.com/photos/5854191/pexels-photo-5854191.jpeg?auto=compress&cs=tinysrgb&w=600",
       },
       {
         id: 5,
         title: "Salon at Home – Hair Spa",
         date: "Wed, Jan 24",
         time: "3:30 PM",
         address: "99 Palm Avenue, Villa 2",
         price: "₹1299",
         status: "Upcoming",
         image:
           "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600",
       },
       {
         id: 6,
         title: "AC Repair & Gas Filling",
         date: "Thu, Jan 25",
         time: "11:00 AM",
         address: "18 Garden View Apartments, Block C",
         price: "₹1599",
         status: "Upcoming",
         image:
           "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=600",
       },
       {
         id: 7,
         title: "Sofa Shampoo Cleaning",
         date: "Fri, Jan 26",
         time: "9:00 AM",
         address: "22 Elm Street, Tower 5, Floor 2",
         price: "₹999",
         status: "Upcoming",
         image:
           "https://images.pexels.com/photos/4239148/pexels-photo-4239148.jpeg?auto=compress&cs=tinysrgb&w=600",
       },
       {
         id: 8,
         title: "Bathroom Deep Cleaning",
         date: "Sat, Jan 27",
         time: "2:00 PM",
         address: "7 Blue Horizon Society, Wing A",
         price: "₹799",
         status: "Upcoming",
         image:
           "https://images.pexels.com/photos/4239151/pexels-photo-4239151.jpeg?auto=compress&cs=tinysrgb&w=600",
       },
       {
         id: 9,
         title: "Pest Control (Ants & Cockroaches)",
         date: "Sun, Jan 28",
         time: "12:30 PM",
         address: "114 Rosewood Lane, Block D",
         price: "₹1199",
         status: "Upcoming",
         image:
           "https://images.pexels.com/photos/6197120/pexels-photo-6197120.jpeg?auto=compress&cs=tinysrgb&w=600",
       },
       {
         id: 10,
         title: "Electrician – Switchboard Fix",
         date: "Mon, Jan 29",
         time: "5:00 PM",
         address: "301 Riverwalk, Apt 11",
         price: "₹299",
         status: "Upcoming",
         image:
           "https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=600",
       },
       {
         id: 11,
         title: "Carpet Shampoo & Dry",
         date: "Tue, Jan 30",
         time: "4:00 PM",
         address: "45 Downtown Plaza, Tower 3",
         price: "₹1399",
         status: "Upcoming",
         image:
           "https://images.pexels.com/photos/4239148/pexels-photo-4239148.jpeg?auto=compress&cs=tinysrgb&w=600",
       },
       {
         id: 12,
         title: "Home Painting – Living Room",
         date: "Wed, Jan 31",
         time: "9:30 AM",
         address: "20 Hill View Residency, Block F",
         price: "₹2499",
         status: "Upcoming",
         image:
           "https://images.pexels.com/photos/6474475/pexels-photo-6474475.jpeg?auto=compress&cs=tinysrgb&w=600",
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
       {
         id: 4,
         title: "Bathroom Deep Cleaning",
         date: "Tue, Jan 9",
         time: "9:30 AM",
         address: "23 Green View Apartments, Tower 2",
         price: "₹899",
         status: "Completed",
         image:
           "https://images.pexels.com/photos/4239151/pexels-photo-4239151.jpeg?auto=compress&cs=tinysrgb&w=600",
       },
       {
         id: 5,
         title: "Sofa & Carpet Cleaning",
         date: "Sun, Jan 7",
         time: "3:00 PM",
         address: "221B Baker Street, Floor 1",
         price: "₹1199",
         status: "Completed",
         image:
           "https://images.pexels.com/photos/4239148/pexels-photo-4239148.jpeg?auto=compress&cs=tinysrgb&w=600",
       },
       {
         id: 6,
         title: "Electrician – Light Fixture Install",
         date: "Fri, Jan 5",
         time: "6:00 PM",
         address: "12 Park Avenue, Apartment 10C",
         price: "₹349",
         status: "Completed",
         image:
           "https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=600",
       },
       {
         id: 7,
         title: "Salon at Home – Facial & Manicure",
         date: "Thu, Jan 4",
         time: "10:30 AM",
         address: "8 Rose Garden Complex, Flat 16",
         price: "₹999",
         status: "Completed",
         image:
           "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600",
       },
       {
         id: 8,
         title: "Pest Control (Termites)",
         date: "Wed, Jan 3",
         time: "8:00 AM",
         address: "100 Lakeside Residency, Wing B",
         price: "₹1499",
         status: "Completed",
         image:
           "https://images.pexels.com/photos/6197120/pexels-photo-6197120.jpeg?auto=compress&cs=tinysrgb&w=600",
       },
     ],

     cancelled: [],
   };

  // ✅ Filter bookings based on search
  const filteredBookings = bookings[activeTab].filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // ⭐ Rating component
  const RatingStars = ({ rating, setRating }: any) => (
    <View style={{ flexDirection: "row", marginTop: 8 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => setRating(star)}>
          <Ionicons
            name={star <= rating ? "star" : "star-outline"}
            size={20}
            color="#FACC15"
            style={{ marginRight: 4 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  // ✅ Render Bookings
  const renderBookings = (list: any[], status: string) => {
    if (list.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={42} color="#9CA3AF" />
          <Text style={styles.emptyTitle}>
            No {status.toLowerCase()} bookings
          </Text>
          <Text style={styles.emptySubtitle}>
            You don’t have any {status.toLowerCase()} bookings
          </Text>
        </View>
      );
    }

    return list.map((item) => (
      <TouchableOpacity
        key={item.id}
        style={styles.bookingCard}
        onPress={() => setSelectedBooking(item)}
      >
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
            <>
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
              <RatingStars rating={rating} setRating={setRating} />
            </>
          )}
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      {/* ✅ Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/categories")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>

      {/* 🔍 Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search bookings..."
        placeholderTextColor="#9CA3AF"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

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

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderBookings(filteredBookings, activeTab)}
      </ScrollView>

      {/* ➕ Floating Button */}
      {/* <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/book-service")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity> */}

      {/* 📋 Booking Details Modal */}
      <Modal visible={!!selectedBooking} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedBooking?.title}</Text>
            <Text style={styles.modalText}>Date: {selectedBooking?.date}</Text>
            <Text style={styles.modalText}>Time: {selectedBooking?.time}</Text>
            <Text style={styles.modalText}>
              Address: {selectedBooking?.address}
            </Text>
            <Text style={styles.modalText}>
              Price: {selectedBooking?.price}
            </Text>
            <Text style={styles.modalText}>Staff: John Doe</Text>
            <Text style={styles.modalText}>Payment: Online</Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedBooking(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    paddingTop: 60,
  },

  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  backButton: { padding: 4, marginRight: 8 },
  headerTitle: { fontSize: 20, fontWeight: "700", color: colors.textPrimary },

  searchInput: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 12,
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

  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#7C3AED",
    borderRadius: 50,
    padding: 16,
    elevation: 4,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "85%",
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  modalText: { fontSize: 14, color: "#4B5563", marginBottom: 4 },
  closeButton: {
    backgroundColor: "#7C3AED",
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 12,
  },
  closeButtonText: { color: "#fff", fontWeight: "600", textAlign: "center" },
});
