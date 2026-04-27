import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BACKEND_URL = 'https://urbannn-server.vercel.app';

type BookingStatus = 'all' | 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

interface Booking {
  id: string;
  booking_number: string;
  user_id: string;
  service_id: string;
  scheduled_date: string;
  scheduled_time: string;
  status: string;
  payment_status: string;
  total_amount: number;
  special_instructions: string;
  created_at: string;
  service: {
    name: string;
  };
  provider: {
    full_name: string;
  } | null;
  address: {
    address_line1: string;
    address_line2: string;
    city: string;
  };
}

interface Stats {
  total: number;
  today: number;
  thisMonth: number;
  byStatus: Record<string, number>;
}

export default function AdminBookingsScreen() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<BookingStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
    fetchStats();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/bookings?limit=100`);
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error('Fetch bookings error:', error);
      Alert.alert('Error', 'Failed to load bookings');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/bookings/stats`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Fetch stats error:', error);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchBookings();
    fetchStats();
  };

  const handleDeleteBooking = (bookingId: string, bookingNumber: string) => {
    Alert.alert(
      'Delete Booking',
      `Are you sure you want to delete booking ${bookingNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setDeleteLoading(bookingId);
            try {
              const response = await fetch(`${BACKEND_URL}/api/admin/bookings/${bookingId}`, {
                method: 'DELETE',
              });
              
              if (response.ok) {
                Alert.alert('Success', 'Booking deleted successfully');
                fetchBookings();
                fetchStats();
              } else {
                throw new Error('Delete failed');
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to delete booking');
            } finally {
              setDeleteLoading(null);
            }
          },
        },
      ]
    );
  };

  const handleCleanupOldBookings = () => {
    Alert.alert(
      'Cleanup Old Bookings',
      'Delete completed bookings older than 90 days?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`${BACKEND_URL}/api/admin/bookings/cleanup`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ days: 90, status: 'completed' }),
              });
              
              const data = await response.json();
              Alert.alert('Success', `Deleted ${data.deleted} old bookings`);
              fetchBookings();
              fetchStats();
            } catch (error) {
              Alert.alert('Error', 'Failed to cleanup bookings');
            }
          },
        },
      ]
    );
  };

  const handleExportCSV = () => {
    Alert.alert(
      'Export Bookings',
      'Download bookings as CSV file?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Export',
          onPress: () => {
            Alert.alert(
              'Export URL',
              `Open this URL in browser:\n\n${BACKEND_URL}/api/admin/bookings/export/csv`,
              [{ text: 'OK' }]
            );
          },
        },
      ]
    );
  };

  const filteredBookings = bookings.filter(booking => {
    // Filter by status
    if (activeTab !== 'all' && booking.status !== activeTab) {
      return false;
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        booking.booking_number.toLowerCase().includes(query) ||
        booking.service.name.toLowerCase().includes(query) ||
        booking.special_instructions?.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return { bg: '#FEF3C7', text: '#92400E' };
      case 'confirmed': return { bg: '#DBEAFE', text: '#1E40AF' };
      case 'in_progress': return { bg: '#EDE9FE', text: '#5B21B6' };
      case 'completed': return { bg: '#D1FAE5', text: '#065F46' };
      case 'cancelled': return { bg: '#FEE2E2', text: '#991B1B' };
      default: return { bg: '#F1F5F9', text: '#475569' };
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7C3AED" />
          <Text style={styles.loadingText}>Loading bookings...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Bookings Management</Text>
          <Text style={styles.headerSubtitle}>
            {stats?.total || 0} total bookings
          </Text>
        </View>
        <TouchableOpacity onPress={handleRefresh}>
          <Ionicons name="refresh" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Stats Cards */}
        {stats && (
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.total}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.today}</Text>
              <Text style={styles.statLabel}>Today</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.thisMonth}</Text>
              <Text style={styles.statLabel}>This Month</Text>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleCleanupOldBookings}
          >
            <Ionicons name="trash-outline" size={18} color="#EF4444" />
            <Text style={styles.actionButtonText}>Cleanup Old</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleExportCSV}
          >
            <Ionicons name="download-outline" size={18} color="#7C3AED" />
            <Text style={styles.actionButtonText}>Export CSV</Text>
          </TouchableOpacity>
        </View>

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
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
          {(['all', 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'] as BookingStatus[]).map((status) => (
            <TouchableOpacity
              key={status}
              style={[styles.tab, activeTab === status && styles.tabActive]}
              onPress={() => setActiveTab(status)}
            >
              <Text style={[styles.tabText, activeTab === status && styles.tabTextActive]}>
                {status === 'all' ? 'All' : status.replace('_', ' ')}
                {stats?.byStatus[status] ? ` (${stats.byStatus[status]})` : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Bookings List */}
        <View style={styles.bookingsContainer}>
          <Text style={styles.sectionTitle}>
            {filteredBookings.length} Booking{filteredBookings.length !== 1 ? 's' : ''}
          </Text>

          {filteredBookings.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="folder-open-outline" size={48} color="#CBD5E1" />
              <Text style={styles.emptyTitle}>No bookings found</Text>
              <Text style={styles.emptyText}>
                {searchQuery ? 'Try a different search' : 'No bookings in this category'}
              </Text>
            </View>
          ) : (
            filteredBookings.map((booking) => {
              const statusStyle = getStatusColor(booking.status);
              const isDeleting = deleteLoading === booking.id;

              return (
                <View key={booking.id} style={styles.bookingCard}>
                  <View style={styles.cardHeader}>
                    <View style={styles.cardLeft}>
                      <Text style={styles.bookingNumber}>{booking.booking_number}</Text>
                      <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                        <Text style={[styles.statusText, { color: statusStyle.text }]}>
                          {booking.status.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.amount}>₹{booking.total_amount}</Text>
                  </View>

                  <View style={styles.cardRow}>
                    <Ionicons name="briefcase-outline" size={14} color="#64748B" />
                    <Text style={styles.cardText}>{booking.service.name}</Text>
                  </View>

                  <View style={styles.cardRow}>
                    <Ionicons name="person-outline" size={14} color="#64748B" />
                    <Text style={styles.cardText}>
                      {booking.provider?.full_name || 'Unassigned'}
                    </Text>
                  </View>

                  <View style={styles.cardRow}>
                    <Ionicons name="calendar-outline" size={14} color="#64748B" />
                    <Text style={styles.cardText}>
                      {formatDate(booking.scheduled_date)} at {booking.scheduled_time}
                    </Text>
                  </View>

                  <View style={styles.cardRow}>
                    <Ionicons name="location-outline" size={14} color="#64748B" />
                    <Text style={styles.cardText} numberOfLines={1}>
                      {booking.address.address_line1}, {booking.address.city}
                    </Text>
                  </View>

                  <View style={styles.cardRow}>
                    <Ionicons name="card-outline" size={14} color="#64748B" />
                    <Text style={styles.cardText}>
                      Payment: {booking.payment_status}
                    </Text>
                  </View>

                  {booking.special_instructions && (
                    <View style={styles.cardRow}>
                      <Ionicons name="document-text-outline" size={14} color="#64748B" />
                      <Text style={styles.cardText} numberOfLines={2}>
                        {booking.special_instructions}
                      </Text>
                    </View>
                  )}

                  <View style={styles.cardFooter}>
                    <Text style={styles.createdAt}>
                      Created: {formatDate(booking.created_at)}
                    </Text>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteBooking(booking.id, booking.booking_number)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <ActivityIndicator size="small" color="#EF4444" />
                      ) : (
                        <>
                          <Ionicons name="trash-outline" size={16} color="#EF4444" />
                          <Text style={styles.deleteButtonText}>Delete</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748B',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#7C3AED',
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
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#E9D5FF',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#7C3AED',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#0F172A',
  },
  tabsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabActive: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'capitalize',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  bookingsContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cardLeft: {
    flex: 1,
  },
  bookingNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  amount: {
    fontSize: 16,
    fontWeight: '800',
    color: '#7C3AED',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  cardText: {
    fontSize: 13,
    color: '#64748B',
    marginLeft: 8,
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  createdAt: {
    fontSize: 11,
    color: '#94A3B8',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#FEE2E2',
  },
  deleteButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 12,
  },
  emptyText: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 6,
  },
});
