import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Alert,
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookingStatus, ServiceBooking, useBookings } from "../../context/BookingsContext";

type StatusMeta = {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  softBg: string;
};

const STATUS_META: Record<BookingStatus, StatusMeta> = {
  upcoming: {
    label: "Upcoming",
    icon: "time-outline",
    color: "#2563EB",
    softBg: "#DBEAFE",
  },
  completed: {
    label: "Completed",
    icon: "checkmark-done-outline",
    color: "#16A34A",
    softBg: "#DCFCE7",
  },
  cancelled: {
    label: "Cancelled",
    icon: "close-circle-outline",
    color: "#DC2626",
    softBg: "#FEE2E2",
  },
};

const BOOKING_TABS: BookingStatus[] = ["upcoming", "completed", "cancelled"];

const formatVisitDate = (scheduledAt: string) => {
  const date = new Date(scheduledAt);
  if (Number.isNaN(date.getTime())) {
    return "Scheduled date unavailable";
  }

  const day = date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${day} • ${time}`;
};

const getNextDayLabel = (date: Date) =>
  date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });

export default function BookingsScreen() {
  const router = useRouter();
  const {
    getBookingsByStatus,
    getEffectiveStatus,
    cancelBooking,
    completeBooking,
    rescheduleBooking,
    rateBooking,
  } = useBookings();

  const [activeTab, setActiveTab] = useState<BookingStatus>("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<ServiceBooking | null>(null);

  const counts = useMemo(
    () => ({
      upcoming: getBookingsByStatus("upcoming").length,
      completed: getBookingsByStatus("completed").length,
      cancelled: getBookingsByStatus("cancelled").length,
    }),
    [getBookingsByStatus],
  );

  const filteredBookings = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = getBookingsByStatus(activeTab);

    if (!query) {
      return list;
    }

    return list.filter((booking) => {
      const text = `${booking.serviceName} ${booking.address} ${booking.professionalName}`.toLowerCase();
      return text.includes(query);
    });
  }, [activeTab, getBookingsByStatus, searchQuery]);

  const handleCancel = (booking: ServiceBooking) => {
    Alert.alert(
      "Cancel this booking?",
      "This will move the service to your cancelled list.",
      [
        { text: "Keep", style: "cancel" },
        {
          text: "Cancel Booking",
          style: "destructive",
          onPress: () => cancelBooking(booking.id),
        },
      ],
    );
  };

  const handleComplete = (booking: ServiceBooking) => {
    Alert.alert(
      "Mark service complete?",
      "Use this after the technician has finished the job.",
      [
        { text: "Not yet", style: "cancel" },
        {
          text: "Mark Complete",
          onPress: () => completeBooking(booking.id),
        },
      ],
    );
  };

  const handleReschedule = (booking: ServiceBooking) => {
    const nextDate = new Date(booking.scheduledAt);
    if (Number.isNaN(nextDate.getTime())) {
      Alert.alert("Unable to reschedule", "This booking has an invalid schedule.");
      return;
    }

    nextDate.setDate(nextDate.getDate() + 1);
    const nextDayLabel = getNextDayLabel(nextDate);

    rescheduleBooking(booking.id, {
      scheduledAt: nextDate.toISOString(),
      dateLabel: nextDayLabel,
      slot: booking.slot,
    });

    Alert.alert("Rescheduled", `Moved to ${nextDayLabel} (${booking.slot}).`);
  };

  const handleRate = (bookingId: string, rating: number) => {
    rateBooking(bookingId, rating);
  };

  const renderRating = (booking: ServiceBooking) => (
    <View style={styles.ratingRow}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => handleRate(booking.id, star)}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Ionicons
            name={star <= (booking.rating ?? 0) ? "star" : "star-outline"}
            size={18}
            color="#F59E0B"
            style={styles.starIcon}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderActions = (booking: ServiceBooking, status: BookingStatus) => {
    if (status === "upcoming") {
      return (
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.subtleActionButton]}
            onPress={() => handleReschedule(booking)}
          >
            <Text style={styles.subtleActionText}>+1 Day</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.positiveActionButton]}
            onPress={() => handleComplete(booking)}
          >
            <Text style={styles.positiveActionText}>Complete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.destructiveActionButton]}
            onPress={() => handleCancel(booking)}
          >
            <Text style={styles.destructiveActionText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (status === "completed") {
      return (
        <View style={styles.completedActionsWrap}>
          <View>
            <Text style={styles.rateLabel}>Rate service</Text>
            {renderRating(booking)}
          </View>
          <TouchableOpacity
            style={[styles.actionButton, styles.subtleActionButton]}
            onPress={() => router.push("/categories")}
          >
            <Text style={styles.subtleActionText}>Book Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={[styles.actionButton, styles.subtleActionButton]}
        onPress={() => router.push("/categories")}
      >
        <Text style={styles.subtleActionText}>Book Service</Text>
      </TouchableOpacity>
    );
  };

  const renderBookingCard = ({ item }: { item: ServiceBooking }) => {
    const status = getEffectiveStatus(item);
    const statusMeta = STATUS_META[status];

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.card}
        onPress={() => setSelectedBooking(item)}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.serviceName}>{item.serviceName}</Text>
          <View style={[styles.statusPill, { backgroundColor: statusMeta.softBg }]}>
            <Ionicons name={statusMeta.icon} size={13} color={statusMeta.color} />
            <Text style={[styles.statusText, { color: statusMeta.color }]}>{statusMeta.label}</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <Ionicons name="calendar-outline" size={14} color="#64748B" />
          <Text style={styles.metaText}>{formatVisitDate(item.scheduledAt)}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.metaText}>₹{item.totalAmount}</Text>
        </View>

        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={14} color="#64748B" />
          <Text style={styles.metaText} numberOfLines={1}>
            {item.address}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <Ionicons name="person-outline" size={14} color="#64748B" />
          <Text style={styles.metaText}>{item.professionalName}</Text>
        </View>

        {renderActions(item, status)}
      </TouchableOpacity>
    );
  };

  const hasSearch = searchQuery.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrap}>
        <Text style={styles.title}>My Bookings</Text>
        <Text style={styles.subtitle}>
          {counts.upcoming} upcoming • {counts.completed} completed • {counts.cancelled} cancelled
        </Text>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={16} color="#64748B" />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by service, area, or professional"
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
        />
      </View>

      <View style={styles.tabsRow}>
        {BOOKING_TABS.map((tab) => {
          const active = activeTab === tab;
          const tabMeta = STATUS_META[tab];
          const count = counts[tab];

          return (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                active && { borderColor: tabMeta.color, backgroundColor: tabMeta.softBg },
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabButtonText, active && { color: tabMeta.color }]}>
                {tabMeta.label} ({count})
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={filteredBookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBookingCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Ionicons name={STATUS_META[activeTab].icon} size={42} color="#94A3B8" />
            <Text style={styles.emptyTitle}>
              {hasSearch ? "No match found" : `No ${STATUS_META[activeTab].label.toLowerCase()} bookings`}
            </Text>
            <Text style={styles.emptyText}>
              {hasSearch
                ? "Try searching with a service name or area."
                : "Once you confirm a service booking, it will appear here automatically."}
            </Text>
            {!hasSearch && (
              <TouchableOpacity
                style={styles.emptyCtaButton}
                onPress={() => router.push("/categories")}
              >
                <Text style={styles.emptyCtaText}>Book a Service</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />

      <Modal visible={!!selectedBooking} transparent animationType="slide" onRequestClose={() => setSelectedBooking(null)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setSelectedBooking(null)}>
          <Pressable style={styles.modalCard}>
            <Text style={styles.modalTitle}>{selectedBooking?.serviceName}</Text>

            <View style={styles.modalItem}>
              <Text style={styles.modalLabel}>Visit</Text>
              <Text style={styles.modalValue}>{selectedBooking?.dateLabel} • {selectedBooking?.slot}</Text>
            </View>
            <View style={styles.modalItem}>
              <Text style={styles.modalLabel}>Address</Text>
              <Text style={styles.modalValue}>{selectedBooking?.address}</Text>
            </View>
            <View style={styles.modalItem}>
              <Text style={styles.modalLabel}>Customer</Text>
              <Text style={styles.modalValue}>{selectedBooking?.customerName} ({selectedBooking?.phone})</Text>
            </View>
            <View style={styles.modalItem}>
              <Text style={styles.modalLabel}>Professional</Text>
              <Text style={styles.modalValue}>{selectedBooking?.professionalName}</Text>
            </View>
            <View style={styles.modalItem}>
              <Text style={styles.modalLabel}>Payment</Text>
              <Text style={styles.modalValue}>{selectedBooking?.paymentLabel}</Text>
            </View>
            <View style={styles.modalItem}>
              <Text style={styles.modalLabel}>Total</Text>
              <Text style={styles.modalValue}>₹{selectedBooking?.totalAmount}</Text>
            </View>
            {!!selectedBooking?.notes && (
              <View style={styles.modalItem}>
                <Text style={styles.modalLabel}>Notes</Text>
                <Text style={styles.modalValue}>{selectedBooking.notes}</Text>
              </View>
            )}

            {selectedBooking && getEffectiveStatus(selectedBooking) === "upcoming" && (
              <View style={styles.modalActionsRow}>
                <TouchableOpacity
                  style={[styles.modalActionButton, styles.modalCancelButton]}
                  onPress={() => {
                    if (selectedBooking) {
                      setSelectedBooking(null);
                      handleCancel(selectedBooking);
                    }
                  }}
                >
                  <Ionicons name="close-circle-outline" size={18} color="#B91C1C" />
                  <Text style={styles.modalCancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalActionButton, styles.modalCompleteButton]}
                  onPress={() => {
                    if (selectedBooking) {
                      setSelectedBooking(null);
                      handleComplete(selectedBooking);
                    }
                  }}
                >
                  <Ionicons name="checkmark-circle-outline" size={18} color="#166534" />
                  <Text style={styles.modalCompleteButtonText}>Complete</Text>
                </TouchableOpacity>
              </View>
            )}

            {selectedBooking && getEffectiveStatus(selectedBooking) === "completed" && (
              <View style={styles.modalCompletedSection}>
                <Text style={styles.modalRateLabel}>Rate this service</Text>
                <View style={styles.modalRatingRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => {
                        if (selectedBooking) {
                          handleRate(selectedBooking.id, star);
                        }
                      }}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Ionicons
                        name={star <= (selectedBooking.rating ?? 0) ? "star" : "star-outline"}
                        size={28}
                        color="#F59E0B"
                        style={styles.modalStarIcon}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.modalBookAgainButton}
                  onPress={() => {
                    setSelectedBooking(null);
                    router.push("/categories");
                  }}
                >
                  <Ionicons name="repeat-outline" size={20} color="#FFFFFF" />
                  <Text style={styles.modalBookAgainButtonText}>Book Again</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity style={styles.closeModalButton} onPress={() => setSelectedBooking(null)}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 16,
  },
  headerWrap: {
    paddingTop: 6,
    marginBottom: 12,
  },
  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
  },
  searchBox: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 11,
    marginLeft: 8,
    color: "#0F172A",
    fontSize: 14,
  },
  tabsRow: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
  },
  listContent: {
    paddingBottom: 34,
    gap: 10,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    padding: 14,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  serviceName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  statusText: {
    marginLeft: 4,
    fontSize: 11,
    fontWeight: "700",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  metaText: {
    marginLeft: 6,
    flexShrink: 1,
    color: "#475569",
    fontSize: 12,
    fontWeight: "500",
  },
  dot: {
    marginHorizontal: 6,
    color: "#CBD5E1",
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  subtleActionButton: {
    backgroundColor: "#E2E8F0",
  },
  subtleActionText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "700",
  },
  positiveActionButton: {
    backgroundColor: "#DCFCE7",
    flex: 1,
  },
  positiveActionText: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "700",
  },
  destructiveActionButton: {
    backgroundColor: "#FEE2E2",
  },
  destructiveActionText: {
    color: "#B91C1C",
    fontSize: 12,
    fontWeight: "700",
  },
  completedActionsWrap: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  rateLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    marginRight: 2,
  },
  emptyWrap: {
    marginTop: 84,
    alignItems: "center",
    paddingHorizontal: 18,
  },
  emptyTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
  },
  emptyText: {
    marginTop: 8,
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
  },
  emptyCtaButton: {
    marginTop: 16,
    backgroundColor: "#0F172A",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  emptyCtaText: {
    color: "#F8FAFC",
    fontSize: 13,
    fontWeight: "700",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(15, 23, 42, 0.4)",
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 12,
  },
  modalItem: {
    marginTop: 8,
  },
  modalLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 2,
  },
  modalValue: {
    fontSize: 14,
    color: "#0F172A",
    fontWeight: "600",
  },
  modalActionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  modalActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
  },
  modalCancelButton: {
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  modalCancelButtonText: {
    color: "#B91C1C",
    fontSize: 14,
    fontWeight: "700",
  },
  modalCompleteButton: {
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#86EFAC",
  },
  modalCompleteButtonText: {
    color: "#166534",
    fontSize: 14,
    fontWeight: "700",
  },
  modalCompletedSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    alignItems: "center",
  },
  modalRateLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 8,
  },
  modalRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  modalStarIcon: {
    marginHorizontal: 4,
  },
  modalBookAgainButton: {
    width: "100%",
    backgroundColor: "#0F172A",
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  modalBookAgainButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  closeModalButton: {
    marginTop: 18,
    borderRadius: 12,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  closeModalButtonText: {
    color: "#F8FAFC",
    fontSize: 14,
    fontWeight: "700",
  },
});
