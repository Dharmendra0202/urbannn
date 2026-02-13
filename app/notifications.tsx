import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type NotificationType = "offer" | "booking" | "service" | "payment";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: NotificationType;
};

const initialNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Booking Confirmed",
    message: "Your bathroom deep cleaning is confirmed for tomorrow at 10:00 AM.",
    time: "2m ago",
    read: false,
    type: "booking",
  },
  {
    id: "n2",
    title: "Special Offer",
    message: "Flat 20% OFF on AC services is live for this weekend.",
    time: "15m ago",
    read: false,
    type: "offer",
  },
  {
    id: "n3",
    title: "Service Reminder",
    message: "Your technician is expected to arrive in the next 30 minutes.",
    time: "1h ago",
    read: true,
    type: "service",
  },
  {
    id: "n4",
    title: "Payment Successful",
    message: "Payment of ₹799 for Kitchen Cleaning has been completed.",
    time: "Yesterday",
    read: true,
    type: "payment",
  },
];

const typeConfig: Record<
  NotificationType,
  { icon: keyof typeof Ionicons.glyphMap; color: string }
> = {
  booking: { icon: "calendar-outline", color: "#4F46E5" },
  offer: { icon: "pricetag-outline", color: "#DB2777" },
  service: { icon: "construct-outline", color: "#0891B2" },
  payment: { icon: "card-outline", color: "#16A34A" },
};

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications]
  );

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const handleClearRead = () => {
    setNotifications((prev) => prev.filter((item) => !item.read));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>

        <View style={styles.headerTextWrap}>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.subtitle}>
            {unreadCount > 0
              ? `${unreadCount} unread updates`
              : "All caught up for now"}
          </Text>
        </View>

        {unreadCount > 0 ? (
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{unreadCount}</Text>
          </View>
        ) : (
          <View style={styles.badgeSpacer} />
        )}
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.actionBtnPrimary]}
          onPress={handleMarkAllAsRead}
          disabled={unreadCount === 0}
        >
          <Text style={styles.actionBtnPrimaryText}>Mark all read</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={handleClearRead}>
          <Text style={styles.actionBtnSecondaryText}>Clear read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={34} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptyText}>New updates will appear here.</Text>
          </View>
        }
        renderItem={({ item }) => {
          const config = typeConfig[item.type];

          return (
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.card, !item.read && styles.cardUnread]}
              onPress={() => handleMarkAsRead(item.id)}
            >
              <View style={[styles.iconWrap, { backgroundColor: config.color }]}>
                <Ionicons name={config.icon} size={18} color="#FFFFFF" />
              </View>

              <View style={styles.cardBody}>
                <View style={styles.rowTop}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
                <Text style={styles.messageText}>{item.message}</Text>
              </View>

              {!item.read ? <View style={styles.unreadDot} /> : null}
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 14,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTextWrap: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  countBadge: {
    minWidth: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#DC2626",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  countBadgeText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },
  badgeSpacer: {
    width: 26,
    height: 26,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  actionBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },
  actionBtnPrimary: {
    backgroundColor: "#4F46E5",
    borderColor: "#4F46E5",
  },
  actionBtnPrimaryText: {
    fontSize: 13,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  actionBtnSecondaryText: {
    fontSize: 13,
    color: "#0F172A",
    fontWeight: "600",
  },
  listContent: {
    paddingBottom: 40,
    gap: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  cardUnread: {
    borderColor: "#C7D2FE",
    backgroundColor: "#EEF2FF",
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  cardBody: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    paddingRight: 8,
  },
  timeText: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
  },
  messageText: {
    fontSize: 12,
    color: "#334155",
    lineHeight: 18,
  },
  unreadDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#4F46E5",
    marginTop: 4,
  },
  emptyState: {
    marginTop: 80,
    alignItems: "center",
  },
  emptyTitle: {
    marginTop: 8,
    fontSize: 17,
    color: "#0F172A",
    fontWeight: "700",
  },
  emptyText: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 13,
  },
});
