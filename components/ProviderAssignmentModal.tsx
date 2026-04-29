import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const BACKEND_URL = 'https://urbannn-server.vercel.app';

interface Provider {
  id: string;
  full_name: string;
  rating: number;
  total_jobs: number;
  completed_jobs: number;
  availability_status: string;
  specialization: string[];
}

interface ProviderAssignmentModalProps {
  visible: boolean;
  bookingId: string;
  bookingService: string;
  onClose: () => void;
  onAssignSuccess: () => void;
}

export default function ProviderAssignmentModal({
  visible,
  bookingId,
  bookingService,
  onClose,
  onAssignSuccess,
}: ProviderAssignmentModalProps) {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);
  const [assigning, setAssigning] = useState<string | null>(null);

  useEffect(() => {
    if (visible && bookingId) {
      fetchAvailableProviders();
    }
  }, [visible, bookingId]);

  const fetchAvailableProviders = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/bookings/${bookingId}/available-providers`
      );
      const data = await response.json();
      
      if (response.ok) {
        setProviders(data.providers || []);
      } else {
        Alert.alert('Error', 'Failed to load available providers');
      }
    } catch (error) {
      console.error('Fetch providers error:', error);
      Alert.alert('Error', 'Failed to load providers');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignProvider = async (providerId: string) => {
    setAssigning(providerId);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/bookings/${bookingId}/assign-provider`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ provider_id: providerId }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Provider assigned successfully!');
        onAssignSuccess();
        onClose();
      } else {
        Alert.alert('Error', data.error || 'Failed to assign provider');
      }
    } catch (error) {
      console.error('Assign provider error:', error);
      Alert.alert('Error', 'Failed to assign provider');
    } finally {
      setAssigning(null);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.headerLeft}>
              <Ionicons name="people" size={24} color="#7C3AED" />
              <View style={styles.headerTextContainer}>
                <Text style={styles.modalTitle}>Assign Provider</Text>
                <Text style={styles.modalSubtitle}>
                  Service: {bookingService}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#7C3AED" />
              <Text style={styles.loadingText}>Loading providers...</Text>
            </View>
          ) : providers.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="alert-circle-outline" size={48} color="#CBD5E1" />
              <Text style={styles.emptyTitle}>No Available Providers</Text>
              <Text style={styles.emptyText}>
                No providers found for this service type or all providers are busy.
              </Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={fetchAvailableProviders}
              >
                <Ionicons name="refresh" size={18} color="#7C3AED" />
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView style={styles.providersList}>
              <Text style={styles.providersCount}>
                {providers.length} Available Provider{providers.length !== 1 ? 's' : ''}
              </Text>

              {providers.map((provider) => {
                const isAssigning = assigning === provider.id;

                return (
                  <View key={provider.id} style={styles.providerCard}>
                    <View style={styles.providerHeader}>
                      <View style={styles.providerInfo}>
                        <Text style={styles.providerName}>
                          {provider.full_name}
                        </Text>
                        <View style={styles.ratingContainer}>
                          <Ionicons name="star" size={14} color="#F59E0B" />
                          <Text style={styles.ratingText}>
                            {provider.rating.toFixed(1)}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={[
                          styles.statusBadge,
                          provider.availability_status === 'available' && styles.statusAvailable,
                        ]}
                      >
                        <Text style={styles.statusText}>
                          {provider.availability_status.toUpperCase()}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.providerDetails}>
                      <View style={styles.detailRow}>
                        <Ionicons name="briefcase-outline" size={14} color="#64748B" />
                        <Text style={styles.detailText}>
                          {provider.completed_jobs} / {provider.total_jobs} jobs completed
                        </Text>
                      </View>

                      <View style={styles.detailRow}>
                        <Ionicons name="construct-outline" size={14} color="#64748B" />
                        <Text style={styles.detailText}>
                          {provider.specialization.join(', ')}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.selectButton,
                        isAssigning && styles.selectButtonDisabled,
                      ]}
                      onPress={() => handleAssignProvider(provider.id)}
                      disabled={isAssigning}
                    >
                      {isAssigning ? (
                        <>
                          <ActivityIndicator size="small" color="#FFFFFF" />
                          <Text style={styles.selectButtonText}>Assigning...</Text>
                        </>
                      ) : (
                        <>
                          <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
                          <Text style={styles.selectButtonText}>Select Provider</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  closeButton: {
    padding: 4,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748B',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7C3AED',
  },
  providersList: {
    flex: 1,
    padding: 16,
  },
  providersCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 12,
  },
  providerCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  providerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F59E0B',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },
  statusAvailable: {
    backgroundColor: '#D1FAE5',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  providerDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 12,
    color: '#64748B',
    flex: 1,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    borderRadius: 8,
  },
  selectButtonDisabled: {
    backgroundColor: '#CBD5E1',
  },
  selectButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
