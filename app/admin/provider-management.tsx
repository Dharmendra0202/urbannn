import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Modal,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BACKEND_URL = "https://urbannn-server.vercel.app";

type Provider = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string;
  photo_url: string | null;
  specialization: string[];
  experience_years: number;
  rating: number;
  total_jobs: number;
  completed_jobs: number;
  cancelled_jobs: number;
  status: "active" | "inactive" | "suspended";
  availability_status: "available" | "busy" | "offline";
  hourly_rate: number | null;
  city: string | null;
  state: string | null;
  created_at: string;
};

type FilterStatus = "all" | "active" | "inactive" | "suspended";
type FilterAvailability = "all" | "available" | "busy" | "offline";

export default function ProviderManagementScreen() {
  const router = useRouter();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterAvailability, setFilterAvailability] = useState<FilterAvailability>("all");
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchProviders();
  }, [filterStatus, filterAvailability]);

  const fetchProviders = async () => {
    try {
      let url = `${BACKEND_URL}/api/admin/provider-management/providers?limit=100`;
      
      if (filterStatus !== "all") {
        url += `&status=${filterStatus}`;
      }
      
      if (filterAvailability !== "all") {
        url += `&availability=${filterAvailability}`;
      }

      const response = await fetch(url);
      
      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Provider management API not deployed yet. Please deploy backend first.");
      }
      
      const data = await response.json();
      setProviders(data.providers || []);
    } catch (error) {
      console.error("Fetch providers error:", error);
      
      if (error.message.includes("not deployed")) {
        Alert.alert(
          "Backend Not Deployed",
          "The provider management API needs to be deployed first.\n\nSteps:\n1. Run SQL schema in Supabase\n2. Deploy backend to Vercel\n3. Restart app\n\nSee SETUP_PROVIDER_MANAGEMENT.md",
          [{ text: "OK", onPress: () => router.back() }]
        );
      } else {
        Alert.alert("Error", "Failed to load providers");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProviders();
  };

  const handleUpdateAvailability = async (
    providerId: string,
    newStatus: "available" | "busy" | "offline"
  ) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/provider-management/providers/${providerId}/availability`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ availability_status: newStatus }),
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Availability updated");
        fetchProviders();
        setSelectedProvider(null);
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update availability");
    }
  };

  const handleDeleteProvider = (providerId: string, providerName: string) => {
    Alert.alert(
      "Delete Provider",
      `Are you sure you want to delete ${providerName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(
                `${BACKEND_URL}/api/admin/provider-management/providers/${providerId}`,
                { method: "DELETE" }
              );

              if (response.ok) {
                Alert.alert("Success", "Provider deleted");
                fetchProviders();
                setSelectedProvider(null);
              } else {
                throw new Error("Delete failed");
              }
            } catch (error) {
              Alert.alert("Error", "Failed to delete provider");
            }
          },
        },
      ]
    );
  };

  const filteredProviders = providers.filter((provider) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      provider.full_name.toLowerCase().includes(query) ||
      provider.phone.includes(query) ||
      provider.email?.toLowerCase().includes(query) ||
      provider.specialization.some((s) => s.toLowerCase().includes(query))
    );
  });

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "available":
        return { bg: "#D1FAE5", text: "#065F46", dot: "#10B981" };
      case "busy":
        return { bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B" };
      case "offline":
        return { bg: "#F1F5F9", text: "#475569", dot: "#94A3B8" };
      default:
        return { bg: "#F1F5F9", text: "#475569", dot: "#94A3B8" };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return { bg: "#D1FAE5", text: "#065F46" };
      case "inactive":
        return { bg: "#FEE2E2", text: "#991B1B" };
      case "suspended":
        return { bg: "#FEF3C7", text: "#92400E" };
      default:
        return { bg: "#F1F5F9", text: "#475569" };
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7C3AED" />
          <Text style={styles.loadingText}>Loading providers...</Text>
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
          <Text style={styles.headerTitle}>Provider Management</Text>
          <Text style={styles.headerSubtitle}>{providers.length} providers</Text>
        </View>
        <TouchableOpacity onPress={() => setShowAddModal(true)}>
          <Ionicons name="add-circle" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {providers.filter((p) => p.status === "active").length}
            </Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {providers.filter((p) => p.availability_status === "available").length}
            </Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {providers.reduce((sum, p) => sum + p.completed_jobs, 0)}
            </Text>
            <Text style={styles.statLabel}>Jobs Done</Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#64748B" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search providers..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          <Text style={styles.filterLabel}>Status:</Text>
          {(["all", "active", "inactive", "suspended"] as FilterStatus[]).map((status) => (
            <TouchableOpacity
              key={status}
              style={[styles.filterChip, filterStatus === status && styles.filterChipActive]}
              onPress={() => setFilterStatus(status)}
            >
              <Text style={[styles.filterChipText, filterStatus === status && styles.filterChipTextActive]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          <Text style={styles.filterLabel}>Availability:</Text>
          {(["all", "available", "busy", "offline"] as FilterAvailability[]).map((avail) => (
            <TouchableOpacity
              key={avail}
              style={[styles.filterChip, filterAvailability === avail && styles.filterChipActive]}
              onPress={() => setFilterAvailability(avail)}
            >
              <Text style={[styles.filterChipText, filterAvailability === avail && styles.filterChipTextActive]}>
                {avail.charAt(0).toUpperCase() + avail.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Providers List */}
        <View style={styles.providersContainer}>
          <Text style={styles.sectionTitle}>
            {filteredProviders.length} Provider{filteredProviders.length !== 1 ? "s" : ""}
          </Text>

          {filteredProviders.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="people-outline" size={48} color="#CBD5E1" />
              <Text style={styles.emptyTitle}>No providers found</Text>
              <Text style={styles.emptyText}>
                {searchQuery ? "Try a different search" : "Add your first provider"}
              </Text>
            </View>
          ) : (
            filteredProviders.map((provider) => {
              const availColor = getAvailabilityColor(provider.availability_status);
              const statusColor = getStatusColor(provider.status);

              return (
                <TouchableOpacity
                  key={provider.id}
                  style={styles.providerCard}
                  onPress={() => setSelectedProvider(provider)}
                  activeOpacity={0.7}
                >
                  <View style={styles.providerHeader}>
                    <View style={styles.providerAvatar}>
                      {provider.photo_url ? (
                        <Image source={{ uri: provider.photo_url }} style={styles.avatarImage} />
                      ) : (
                        <Text style={styles.avatarText}>
                          {provider.full_name.charAt(0).toUpperCase()}
                        </Text>
                      )}
                      <View style={[styles.availabilityDot, { backgroundColor: availColor.dot }]} />
                    </View>

                    <View style={styles.providerInfo}>
                      <Text style={styles.providerName}>{provider.full_name}</Text>
                      <Text style={styles.providerPhone}>{provider.phone}</Text>
                      <View style={styles.providerMeta}>
                        <Ionicons name="star" size={12} color="#F59E0B" />
                        <Text style={styles.providerRating}>{provider.rating.toFixed(1)}</Text>
                        <Text style={styles.providerJobs}>• {provider.completed_jobs} jobs</Text>
                      </View>
                    </View>

                    <View style={styles.providerBadges}>
                      <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
                        <Text style={[styles.statusText, { color: statusColor.text }]}>
                          {provider.status.toUpperCase()}
                        </Text>
                      </View>
                      <View style={[styles.availBadge, { backgroundColor: availColor.bg }]}>
                        <Text style={[styles.availText, { color: availColor.text }]}>
                          {provider.availability_status}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.providerSkills}>
                    {provider.specialization.slice(0, 3).map((skill, idx) => (
                      <View key={idx} style={styles.skillChip}>
                        <Text style={styles.skillText}>{skill}</Text>
                      </View>
                    ))}
                    {provider.specialization.length > 3 && (
                      <Text style={styles.moreSkills}>+{provider.specialization.length - 3}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Provider Detail Modal */}
      <Modal
        visible={!!selectedProvider}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedProvider(null)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setSelectedProvider(null)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Provider Details</Text>
              <TouchableOpacity onPress={() => setSelectedProvider(null)}>
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            {selectedProvider && (
              <ScrollView style={styles.modalBody}>
                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Name</Text>
                  <Text style={styles.modalValue}>{selectedProvider.full_name}</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Contact</Text>
                  <Text style={styles.modalValue}>{selectedProvider.phone}</Text>
                  {selectedProvider.email && (
                    <Text style={styles.modalSubValue}>{selectedProvider.email}</Text>
                  )}
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Specialization</Text>
                  <View style={styles.skillsWrap}>
                    {selectedProvider.specialization.map((skill, idx) => (
                      <View key={idx} style={styles.skillChip}>
                        <Text style={styles.skillText}>{skill}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Experience</Text>
                  <Text style={styles.modalValue}>{selectedProvider.experience_years} years</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Performance</Text>
                  <Text style={styles.modalValue}>
                    ⭐ {selectedProvider.rating.toFixed(1)} rating
                  </Text>
                  <Text style={styles.modalSubValue}>
                    {selectedProvider.completed_jobs} completed • {selectedProvider.cancelled_jobs} cancelled
                  </Text>
                </View>

                {selectedProvider.hourly_rate && (
                  <View style={styles.modalSection}>
                    <Text style={styles.modalLabel}>Hourly Rate</Text>
                    <Text style={styles.modalValue}>₹{selectedProvider.hourly_rate}/hour</Text>
                  </View>
                )}

                {selectedProvider.city && (
                  <View style={styles.modalSection}>
                    <Text style={styles.modalLabel}>Location</Text>
                    <Text style={styles.modalValue}>
                      {selectedProvider.city}, {selectedProvider.state}
                    </Text>
                  </View>
                )}

                {/* Actions */}
                <View style={styles.modalActions}>
                  <Text style={styles.actionsTitle}>Update Availability</Text>
                  <View style={styles.availabilityButtons}>
                    <TouchableOpacity
                      style={[styles.availButton, styles.availButtonAvailable]}
                      onPress={() => handleUpdateAvailability(selectedProvider.id, "available")}
                    >
                      <Text style={styles.availButtonText}>Available</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.availButton, styles.availButtonBusy]}
                      onPress={() => handleUpdateAvailability(selectedProvider.id, "busy")}
                    >
                      <Text style={styles.availButtonText}>Busy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.availButton, styles.availButtonOffline]}
                      onPress={() => handleUpdateAvailability(selectedProvider.id, "offline")}
                    >
                      <Text style={styles.availButtonText}>Offline</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() =>
                      handleDeleteProvider(selectedProvider.id, selectedProvider.full_name)
                    }
                  >
                    <Ionicons name="trash-outline" size={18} color="#B91C1C" />
                    <Text style={styles.deleteButtonText}>Delete Provider</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </Pressable>
        </Pressable>
      </Modal>

      {/* Add Provider Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Provider</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.comingSoonText}>
                Add provider form coming soon!{"\n\n"}
                For now, providers can be added directly in the database.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#64748B",
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
    color: "#E9D5FF",
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "800",
    color: "#7C3AED",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    marginTop: 4,
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
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: "row",
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
    marginRight: 8,
    alignSelf: "center",
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  filterChipActive: {
    backgroundColor: "#7C3AED",
    borderColor: "#7C3AED",
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  filterChipTextActive: {
    color: "#FFFFFF",
  },
  providersContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },
  providerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  providerHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  providerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E9D5FF",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatarImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#7C3AED",
  },
  availabilityDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  providerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  providerName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  providerPhone: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  providerMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  providerRating: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0F172A",
    marginLeft: 4,
  },
  providerJobs: {
    fontSize: 12,
    color: "#64748B",
    marginLeft: 4,
  },
  providerBadges: {
    alignItems: "flex-end",
    gap: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 9,
    fontWeight: "700",
  },
  availBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  availText: {
    fontSize: 10,
    fontWeight: "600",
  },
  providerSkills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillChip: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  skillText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#475569",
  },
  moreSkills: {
    fontSize: 11,
    fontWeight: "600",
    color: "#7C3AED",
    alignSelf: "center",
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
  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  modalActions: {
    marginTop: 10,
  },
  actionsTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },
  availabilityButtons: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  availButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  availButtonAvailable: {
    backgroundColor: "#D1FAE5",
  },
  availButtonBusy: {
    backgroundColor: "#FEF3C7",
  },
  availButtonOffline: {
    backgroundColor: "#F1F5F9",
  },
  availButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEE2E2",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#B91C1C",
  },
  comingSoonText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
  },
});
