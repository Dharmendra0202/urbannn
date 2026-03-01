import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Alert,
    Dimensions,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { ServiceBooking, useBookings } from "../../context/BookingsContext";

const { width } = Dimensions.get("window");

type AdminStatus = "all" | "pending" | "ongoing" | "completed" | "cancelled";

const STATUS_COLORS = {
  pending: { color: "#F59E0B", bg: "#FEF3C7", text: "#92400E" },
  ongoing: { color: "#8B5CF6", bg: "#EDE9FE", text: "#5B21B6" },
  completed: { color: "#10B981", bg: "#D1FAE5", text: "#065F46" },
  cancelled: { color: "#EF4444", bg: "#FEE2E2", text: "#991B1B" },
};

export default function AdminDashboard() {
  const router = useRouter();
  const { bookings, completeBooking, cancelBooking } = useBookings();
  
  const [activeTab, setActiveTab] = useState<AdminStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<ServiceBooking | null>(null);

  // Map booking status to admin status
  const getAdminStatus = (booking: ServiceBooking): Exclude<AdminStatus, "all"> => {
    if (booking.status === "cancelled") return "cancelled";
    if (booking.status === "completed") return "completed";
    
    const scheduledTime = new Date(booking.scheduledAt).getTime();
    const now = Date.now();
    
    if (scheduledTime <= now) return "ongoing";
    return "pending";
  };

  // Get counts and calculate revenue
  const analytics = useMemo(() => {
    const counts = {
      all: bookings.length,
      pending: 0,
      ongoing: 0,
      completed: 0,
      cancelled: 0,
    };

    let totalRevenue = 0;
    let completedRevenue = 0;

    bookings.forEach((booking) => {
      const status = getAdminStatus(booking);
      counts[status]++;
      
      totalRevenue += booking.totalAmount;
      if (status === "completed") {
        completedRevenue += booking.totalAmount;
      }
    });

    return { counts, totalRevenue, completedRevenue };
  }, [bookings]);

  // Pie chart data
  const pieChartData = [
    {
      name: "Pending",
      population: analytics.counts.pending,
      color: STATUS_COLORS.pending.color,
      legendFontColor: "#64748B",
      legendFontSize: 12,
    },
    {
      name: "Ongoing",
      population: analytics.counts.ongoing,
      color: STATUS_COLORS.ongoing.color,
      legendFontColor: "#64748B",
      legendFontSize: 12,
    },
    {
      name: "Completed",
      population: analytics.counts.completed,
      color: STATUS_COLORS.completed.color,
      legendFontColor: "#64748B",
      legendFontSize: 12,
    },
    {
      name: "Cancelled",
      population: analytics.counts.cancelled,
      color: STATUS_COLORS.cancelled.color,
      legendFontColor: "#64748B",
      legendFontSize: 12,
    },
  ].filter(item => item.population > 0);

  // Filter bookings
  const filteredBookings = useMemo(() => {
    let filtered = bookings;

    if (activeTab !== "all") {
      filtered = filtered.filter((booking) => getAdminStatus(booking) === activeTab);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((booking) =>
        booking.serviceName.toLowerCase().includes(query) ||
        booking.customerName.toLowerCase().includes(query) ||
        booking.phone.includes(query)
      );
    }

    return filtered.sort((a, b) => 
      new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()
    );
  }, [bookings, activeTab, searchQuery]);

  const handleMarkComplete = (booking: ServiceBooking) => {
    Alert.alert(
      "Mark as Completed",
      `Mark "${booking.serviceName}" as completed?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Complete",
          onPress: () => {
            completeBooking(booking.id);
            setSelectedBooking(null);
            Alert.alert("Success", "Booking marked as completed");
          },
        },
      ]
    );
  };

  const handleCancelBooking = (booking: ServiceBooking) => {
    Alert.alert(
      "Cancel Booking",
      `Cancel "${booking.serviceName}"?`,
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            cancelBooking(booking.id);
            setSelectedBooking(null);
            Alert.alert("Cancelled", "Booking has been cancelled");
          },
        },
      ]
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });
  };

  const renderBookingCard = (booking: ServiceBooking) => {
    const adminStatus = getAdminStatus(booking);
    const statusStyle = STATUS_COLORS[adminStatus];

    return (
      <TouchableOpacity
        key={booking.id}
        style={styles.bookingCard}
        onPress={() => setSelectedBooking(booking)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardLeft}>
            <Text style={styles.serviceName} numberOfLines={1}>{booking.serviceName}</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
              <Text style={[styles.statusText, { color: statusStyle.text }]}>
                {adminStatus.toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.amount}>₹{booking.totalAmount}</Text>
        </View>

        <View style={styles.cardRow}>
          <Ionicons name="person" size={12} color="#94A3B8" />
          <Text style={styles.cardText}>{booking.customerName}</Text>
        </View>

        <View style={styles.cardRow}>
          <Ionicons name="calendar" size={12} color="#94A3B8" />
          <Text style={styles.cardText}>{formatDate(booking.scheduledAt)} • {booking.slot}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
          <Text style={styles.headerSubtitle}>Manage all bookings</Text>
        </View>
        <Ionicons name="shield-checkmark" size={28} color="#FFFFFF" />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statBox, { backgroundColor: "#F8FAFC" }]}>
            <Text style={styles.statNumber}>{analytics.counts.all}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: STATUS_COLORS.pending.bg }]}>
            <Text style={[styles.statNumber, { color: STATUS_COLORS.pending.text }]}>
              {analytics.counts.pending}
            </Text>
            <Text style={[styles.statLabel, { color: STATUS_COLORS.pending.text }]}>Pending</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: STATUS_COLORS.ongoing.bg }]}>
            <Text style={[styles.statNumber, { color: STATUS_COLORS.ongoing.text }]}>
              {analytics.counts.ongoing}
            </Text>
            <Text style={[styles.statLabel, { color: STATUS_COLORS.ongoing.text }]}>Ongoing</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: STATUS_COLORS.completed.bg }]}>
            <Text style={[styles.statNumber, { color: STATUS_COLORS.completed.text }]}>
              {analytics.counts.completed}
            </Text>
            <Text style={[styles.statLabel, { color: STATUS_COLORS.completed.text }]}>Completed</Text>
          </View>
        </View>

        {/* Revenue Cards */}
        <View style={styles.revenueContainer}>
          <LinearGradient
            colors={["#8B5CF6", "#7C3AED"]}
            style={styles.revenueCard}
          >
            <Ionicons name="trending-up" size={24} color="#FFFFFF" />
            <Text style={styles.revenueLabel}>Total Revenue</Text>
            <Text style={styles.revenueAmount}>₹{analytics.totalRevenue.toLocaleString()}</Text>
          </LinearGradient>

          <LinearGradient
            colors={["#06B6D4", "#0891B2"]}
            style={styles.revenueCard}
          >
            <Ionicons name="checkmark-done" size={24} color="#FFFFFF" />
            <Text style={styles.revenueLabel}>Completed</Text>
            <Text style={styles.revenueAmount}>₹{analytics.completedRevenue.toLocaleString()}</Text>
          </LinearGradient>
        </View>

        {/* Pie Chart */}
        {pieChartData.length > 0 && (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Booking Distribution</Text>
            <PieChart
              data={pieChartData}
              width={width - 32}
              height={200}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        )}

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#64748B" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search bookings..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
          {(["all", "pending", "ongoing", "completed", "cancelled"] as AdminStatus[]).map((status) => (
            <TouchableOpacity
              key={status}
              style={[styles.tab, activeTab === status && styles.tabActive]}
              onPress={() => setActiveTab(status)}
            >
              <Text style={[styles.tabText, activeTab === status && styles.tabTextActive]}>
                {status.charAt(0).toUpperCase() + status.slice(1)} ({analytics.counts[status]})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Bookings List */}
        <View style={styles.bookingsContainer}>
          <Text style={styles.sectionTitle}>
            {filteredBookings.length} Booking{filteredBookings.length !== 1 ? "s" : ""}
          </Text>
          
          {filteredBookings.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="folder-open-outline" size={48} color="#CBD5E1" />
              <Text style={styles.emptyTitle}>No bookings found</Text>
              <Text style={styles.emptyText}>
                {searchQuery ? "Try a different search" : "No bookings in this category"}
              </Text>
            </View>
          ) : (
            filteredBookings.map(renderBookingCard)
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Booking Detail Modal */}
      <Modal
        visible={!!selectedBooking}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedBooking(null)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setSelectedBooking(null)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Booking Details</Text>
              <TouchableOpacity onPress={() => setSelectedBooking(null)}>
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            {selectedBooking && (
              <ScrollView style={styles.modalBody}>
                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Service</Text>
                  <Text style={styles.modalValue}>{selectedBooking.serviceName}</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Customer</Text>
                  <Text style={styles.modalValue}>{selectedBooking.customerName}</Text>
                  <Text style={styles.modalSubValue}>{selectedBooking.phone}</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Scheduled</Text>
                  <Text style={styles.modalValue}>{formatDate(selectedBooking.scheduledAt)}</Text>
                  <Text style={styles.modalSubValue}>{selectedBooking.slot}</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Address</Text>
                  <Text style={styles.modalValue}>{selectedBooking.address}</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Professional</Text>
                  <Text style={styles.modalValue}>{selectedBooking.professionalName}</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Payment</Text>
                  <Text style={styles.modalValue}>{selectedBooking.paymentLabel}</Text>
                  <Text style={styles.modalSubValue}>₹{selectedBooking.totalAmount}</Text>
                </View>

                {selectedBooking.notes && (
                  <View style={styles.modalSection}>
                    <Text style={styles.modalLabel}>Notes</Text>
                    <Text style={styles.modalValue}>{selectedBooking.notes}</Text>
                  </View>
                )}

                {/* Admin Actions */}
                {selectedBooking.status === "upcoming" && (
                  <View style={styles.modalActions}>
                    <TouchableOpacity
                      style={styles.completeButton}
                      onPress={() => handleMarkComplete(selectedBooking)}
                    >
                      <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                      <Text style={styles.completeButtonText}>Mark Complete</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => handleCancelBooking(selectedBooking)}
                    >
                      <Ionicons name="close-circle" size={20} color="#B91C1C" />
                      <Text style={styles.cancelButtonText}>Cancel Booking</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#7C3AED",
  },
  backButton: {
    padding: 4,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    gap: 12,
  },
  statBox: {
    width: (width - 44) / 2,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
  },
  statLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
    marginTop: 4,
  },
  revenueContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  revenueCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  revenueLabel: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.9,
    marginTop: 8,
  },
  revenueAmount: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 4,
  },
  chartContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#0F172A",
  },
  tabsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  tabActive: {
    backgroundColor: "#7C3AED",
    borderColor: "#7C3AED",
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  tabTextActive: {
    color: "#FFFFFF",
  },
  bookingsContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },
  bookingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  cardLeft: {
    flex: 1,
  },
  serviceName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },
  amount: {
    fontSize: 16,
    fontWeight: "800",
    color: "#7C3AED",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  cardText: {
    fontSize: 12,
    color: "#64748B",
    marginLeft: 6,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 12,
  },
  emptyText: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 6,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "85%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  modalBody: {
    padding: 20,
    paddingBottom: 30,
  },
  modalSection: {
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 6,
  },
  modalValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },
  modalSubValue: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
  },
  modalActions: {
    gap: 12,
    marginTop: 10,
    marginBottom: 20,
  },
  completeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7C3AED",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  completeButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEE2E2",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#B91C1C",
  },
});
