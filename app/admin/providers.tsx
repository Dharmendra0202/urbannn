import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput,
  Modal, ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';

interface Provider {
  id: string;
  name: string;
  phone: string;
  email: string;
  skills: string[];
  rating: number;
  is_available: boolean;
  total_jobs: number;
}

export default function ProvidersScreen() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', skills: '' });

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        Alert.alert('Error', 'Please login first');
        router.replace('/admin/login');
        return;
      }
      
      const response = await fetch('https://urbannn-server.vercel.app/api/providers', {
        headers: { 'Authorization': `Bearer ${session.access_token}` },
      });
      
      const result = await response.json();
      
      if (response.ok) {
        const safeProviders = (result.providers || []).map((p: any) => ({
          id: p.id || '',
          name: p.name || 'Unknown',
          phone: p.phone || '',
          email: p.email || '',
          skills: Array.isArray(p.skills) ? p.skills.filter(Boolean) : [],
          rating: typeof p.rating === 'number' ? p.rating : 0,
          is_available: Boolean(p.is_available),
          total_jobs: typeof p.total_jobs === 'number' ? p.total_jobs : 0,
        }));
        setProviders(safeProviders);
      } else {
        Alert.alert('Error', result.error || 'Failed to fetch providers');
        setProviders([]);
      }
    } catch (error) {
      console.error('Error fetching providers:', error);
      Alert.alert('Error', 'Failed to load providers');
      setProviders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProvider = async () => {
    if (!formData.name || !formData.phone || !formData.skills) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch('https://urbannn-server.vercel.app/api/providers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          skills: formData.skills.split(',').map(s => s.trim()),
          rating: 4.5,
        }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        Alert.alert('Success', 'Provider added successfully');
        setShowAddModal(false);
        setFormData({ name: '', phone: '', email: '', skills: '' });
        fetchProviders();
      } else {
        Alert.alert('Error', result.error || 'Failed to add provider');
      }
    } catch (error) {
      console.error('Error adding provider:', error);
      Alert.alert('Error', 'Failed to add provider');
    }
  };

  const handleToggleAvailability = async (provider: Provider) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(
        `https://urbannn-server.vercel.app/api/providers/${provider.id}/availability`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ is_available: !provider.is_available }),
        }
      );
      
      if (response.ok) {
        fetchProviders();
      } else {
        Alert.alert('Error', 'Failed to update availability');
      }
    } catch (error) {
      console.error('Error updating availability:', error);
      Alert.alert('Error', 'Failed to update availability');
    }
  };

  const filteredProviders = providers.filter(provider => {
    if (!searchQuery) return true;
    try {
      const query = searchQuery.toLowerCase();
      const nameMatch = provider?.name?.toLowerCase()?.includes(query) || false;
      const skillMatch = provider?.skills?.some(skill => 
        skill?.toLowerCase()?.includes(query)
      ) || false;
      return nameMatch || skillMatch;
    } catch (error) {
      return false;
    }
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B5CF6" />
        <Text style={styles.loadingText}>Loading providers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service Providers</Text>
        <TouchableOpacity onPress={() => setShowAddModal(true)} style={styles.addButton}>
          <Ionicons name="add" size={24} color="#8B5CF6" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or skill..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredProviders}
        renderItem={({ item }) => (
          <View style={styles.providerCard}>
            <View style={styles.providerHeader}>
              <View style={styles.providerInfo}>
                <Text style={styles.providerName}>{item.name}</Text>
                <Text style={styles.providerPhone}>{item.phone}</Text>
                {item.email ? <Text style={styles.providerEmail}>{item.email}</Text> : null}
              </View>
              <View style={styles.providerStats}>
                <View style={styles.statItem}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.statText}>{item.rating.toFixed(1)}</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="briefcase" size={16} color="#666" />
                  <Text style={styles.statText}>{item.total_jobs}</Text>
                </View>
              </View>
            </View>
            <View style={styles.skillsContainer}>
              {item.skills.map((skill, index) => (
                <View key={index} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
            <View style={styles.providerActions}>
              <TouchableOpacity
                style={[
                  styles.availabilityButton,
                  item.is_available ? styles.availableButton : styles.unavailableButton,
                ]}
                onPress={() => handleToggleAvailability(item)}
              >
                <Ionicons
                  name={item.is_available ? 'checkmark-circle' : 'close-circle'}
                  size={20}
                  color="#fff"
                />
                <Text style={styles.availabilityText}>
                  {item.is_available ? 'Available' : 'Unavailable'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No providers found</Text>
            <Text style={styles.emptySubtext}>Add your first service provider</Text>
          </View>
        }
      />

      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Provider</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter provider name"
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Phone *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChangeText={(text) => setFormData({ ...formData, phone: text })}
                  keyboardType="phone-pad"
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="provider@example.com"
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Skills * (comma separated)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Plumbing, Electrical, AC Repair"
                  value={formData.skills}
                  onChangeText={(text) => setFormData({ ...formData, skills: text })}
                  multiline
                  numberOfLines={3}
                />
              </View>
              <TouchableOpacity style={styles.submitButton} onPress={handleAddProvider}>
                <Text style={styles.submitButtonText}>Add Provider</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  loadingText: { marginTop: 12, fontSize: 16, color: '#666' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 60, paddingBottom: 16, backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: '#e0e0e0',
  },
  backButton: { padding: 8 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  addButton: { padding: 8 },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', margin: 16,
    paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: '#e0e0e0',
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16, color: '#000' },
  listContainer: { padding: 16 },
  providerCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12,
    borderWidth: 1, borderColor: '#e0e0e0',
  },
  providerHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  providerInfo: { flex: 1 },
  providerName: { fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 4 },
  providerPhone: { fontSize: 14, color: '#666', marginBottom: 2 },
  providerEmail: { fontSize: 14, color: '#666' },
  providerStats: { alignItems: 'flex-end' },
  statItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  statText: { marginLeft: 4, fontSize: 14, color: '#666', fontWeight: '600' },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  skillBadge: {
    backgroundColor: '#F3E8FF', paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 16, marginRight: 8, marginBottom: 8,
  },
  skillText: { fontSize: 12, color: '#8B5CF6', fontWeight: '600' },
  providerActions: { flexDirection: 'row', justifyContent: 'flex-end' },
  availabilityButton: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16,
    paddingVertical: 8, borderRadius: 8,
  },
  availableButton: { backgroundColor: '#10B981' },
  unavailableButton: { backgroundColor: '#EF4444' },
  availabilityText: { color: '#fff', fontSize: 14, fontWeight: '600', marginLeft: 6 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#666', marginTop: 16 },
  emptySubtext: { fontSize: 14, color: '#999', marginTop: 8 },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 20, borderBottomWidth: 1, borderBottomColor: '#e0e0e0',
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  modalBody: { padding: 20 },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#000', marginBottom: 8 },
  input: {
    borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, paddingHorizontal: 16,
    paddingVertical: 12, fontSize: 16, color: '#000', backgroundColor: '#fff',
  },
  textArea: { height: 80, textAlignVertical: 'top' },
  submitButton: {
    backgroundColor: '#8B5CF6', paddingVertical: 16, borderRadius: 12,
    alignItems: 'center', marginTop: 10,
  },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
