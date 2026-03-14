import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

const STORAGE_KEY = "@urbannn_addresses";

type AddressType = "home" | "work" | "other";

type Address = {
  id: string;
  label: AddressType;
  line1: string;
  landmark: string;
  city: string;
  pincode: string;
  isDefault: boolean;
};

const EMPTY_FORM: Omit<Address, "id" | "isDefault"> = {
  label: "home",
  line1: "",
  landmark: "",
  city: "",
  pincode: "",
};

const ADDRESS_ICONS: Record<AddressType, React.ComponentProps<typeof Ionicons>["name"]> = {
  home: "home-outline",
  work: "briefcase-outline",
  other: "location-outline",
};

const ADDRESS_COLORS: Record<AddressType, string> = {
  home: "#DBEAFE",
  work: "#DCFCE7",
  other: "#FEF3C7",
};

const ADDRESS_ICON_COLORS: Record<AddressType, string> = {
  home: "#2563EB",
  work: "#16A34A",
  other: "#D97706",
};

export default function SavedAddressesScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    bg: isDark ? "#0F172A" : "#F8FAFC",
    card: isDark ? "#1E293B" : "#FFFFFF",
    border: isDark ? "#334155" : "#E2E8F0",
    text: isDark ? "#F1F5F9" : "#0F172A",
    subtext: isDark ? "#94A3B8" : "#64748B",
    input: isDark ? "#0F172A" : "#F8FAFC",
    modalBg: isDark ? "#1E293B" : "#FFFFFF",
  };

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) setAddresses(JSON.parse(raw));
    });
  }, []);

  const persist = (updated: Address[]) => {
    setAddresses(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setShowModal(true);
  };

  const openEdit = (addr: Address) => {
    setEditingId(addr.id);
    setForm({
      label: addr.label,
      line1: addr.line1,
      landmark: addr.landmark,
      city: addr.city,
      pincode: addr.pincode,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.line1.trim() || !form.city.trim() || !form.pincode.trim()) {
      Alert.alert("Missing fields", "Please fill address, city and pincode.");
      return;
    }

    if (editingId) {
      persist(
        addresses.map((a) =>
          a.id === editingId ? { ...a, ...form } : a
        )
      );
    } else {
      const newAddr: Address = {
        id: Date.now().toString(),
        ...form,
        isDefault: addresses.length === 0,
      };
      persist([...addresses, newAddr]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete address?", "This will remove the address permanently.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updated = addresses.filter((a) => a.id !== id);
          // if deleted was default, make first one default
          if (updated.length > 0 && !updated.some((a) => a.isDefault)) {
            updated[0].isDefault = true;
          }
          persist(updated);
        },
      },
    ]);
  };

  const handleSetDefault = (id: string) => {
    persist(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Saved Addresses</Text>
        <TouchableOpacity onPress={openAdd} style={styles.addBtn}>
          <Ionicons name="add" size={24} color="#0F766E" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {addresses.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Ionicons name="location-outline" size={52} color="#CBD5E1" />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No saved addresses</Text>
            <Text style={[styles.emptySub, { color: colors.subtext }]}>
              Add your home, work, or other locations for faster booking.
            </Text>
            <TouchableOpacity style={styles.emptyBtn} onPress={openAdd}>
              <Text style={styles.emptyBtnText}>Add Address</Text>
            </TouchableOpacity>
          </View>
        ) : (
          addresses.map((addr) => (
            <View
              key={addr.id}
              style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <View style={styles.cardTop}>
                <View style={[styles.iconBubble, { backgroundColor: ADDRESS_COLORS[addr.label] }]}>
                  <Ionicons
                    name={ADDRESS_ICONS[addr.label]}
                    size={18}
                    color={ADDRESS_ICON_COLORS[addr.label]}
                  />
                </View>
                <View style={styles.cardInfo}>
                  <View style={styles.labelRow}>
                    <Text style={[styles.cardLabel, { color: colors.text }]}>
                      {addr.label.charAt(0).toUpperCase() + addr.label.slice(1)}
                    </Text>
                    {addr.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Text style={styles.defaultBadgeText}>Default</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.cardLine1, { color: colors.text }]}>{addr.line1}</Text>
                  {addr.landmark ? (
                    <Text style={[styles.cardMeta, { color: colors.subtext }]}>
                      Near {addr.landmark}
                    </Text>
                  ) : null}
                  <Text style={[styles.cardMeta, { color: colors.subtext }]}>
                    {addr.city} — {addr.pincode}
                  </Text>
                </View>
              </View>

              <View style={[styles.cardActions, { borderTopColor: colors.border }]}>
                {!addr.isDefault && (
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleSetDefault(addr.id)}
                  >
                    <Ionicons name="checkmark-circle-outline" size={15} color="#0F766E" />
                    <Text style={[styles.actionText, { color: "#0F766E" }]}>Set default</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.actionBtn} onPress={() => openEdit(addr)}>
                  <Ionicons name="create-outline" size={15} color={colors.subtext} />
                  <Text style={[styles.actionText, { color: colors.subtext }]}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} onPress={() => handleDelete(addr.id)}>
                  <Ionicons name="trash-outline" size={15} color="#DC2626" />
                  <Text style={[styles.actionText, { color: "#DC2626" }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Add / Edit Modal */}
      <Modal visible={showModal} transparent animationType="slide" onRequestClose={() => setShowModal(false)}>
        <Pressable style={styles.backdrop} onPress={() => setShowModal(false)}>
          <Pressable style={[styles.modalCard, { backgroundColor: colors.modalBg }]} onPress={() => {}}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {editingId ? "Edit Address" : "Add New Address"}
            </Text>

            {/* Label selector */}
            <View style={styles.labelSelector}>
              {(["home", "work", "other"] as AddressType[]).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.labelChip,
                    form.label === type && { backgroundColor: "#0F766E" },
                    form.label !== type && { backgroundColor: colors.input, borderColor: colors.border },
                  ]}
                  onPress={() => setForm((f) => ({ ...f, label: type }))}
                >
                  <Ionicons
                    name={ADDRESS_ICONS[type]}
                    size={14}
                    color={form.label === type ? "#fff" : colors.subtext}
                  />
                  <Text
                    style={[
                      styles.labelChipText,
                      { color: form.label === type ? "#fff" : colors.subtext },
                    ]}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.input }]}
              placeholder="Full address *"
              placeholderTextColor={colors.subtext}
              value={form.line1}
              onChangeText={(v) => setForm((f) => ({ ...f, line1: v }))}
              multiline
            />
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.input }]}
              placeholder="Landmark (optional)"
              placeholderTextColor={colors.subtext}
              value={form.landmark}
              onChangeText={(v) => setForm((f) => ({ ...f, landmark: v }))}
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.input }]}
                placeholder="City *"
                placeholderTextColor={colors.subtext}
                value={form.city}
                onChangeText={(v) => setForm((f) => ({ ...f, city: v }))}
              />
              <TextInput
                style={[styles.input, styles.halfInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.input }]}
                placeholder="Pincode *"
                placeholderTextColor={colors.subtext}
                value={form.pincode}
                onChangeText={(v) => setForm((f) => ({ ...f, pincode: v }))}
                keyboardType="number-pad"
                maxLength={6}
              />
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>{editingId ? "Update Address" : "Save Address"}</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  backBtn: { padding: 4, marginRight: 8 },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: "800" },
  addBtn: { padding: 4 },
  list: { padding: 16, gap: 12, paddingBottom: 40 },
  emptyWrap: { alignItems: "center", marginTop: 80, paddingHorizontal: 24 },
  emptyTitle: { fontSize: 18, fontWeight: "800", marginTop: 14 },
  emptySub: { fontSize: 13, textAlign: "center", marginTop: 6, lineHeight: 20 },
  emptyBtn: {
    marginTop: 20,
    backgroundColor: "#0F766E",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 11,
  },
  emptyBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  cardTop: { flexDirection: "row", padding: 14, gap: 12 },
  iconBubble: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfo: { flex: 1 },
  labelRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 3 },
  cardLabel: { fontSize: 14, fontWeight: "800" },
  defaultBadge: {
    backgroundColor: "#DCFCE7",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  defaultBadgeText: { color: "#166534", fontSize: 11, fontWeight: "700" },
  cardLine1: { fontSize: 13, fontWeight: "600", marginBottom: 2 },
  cardMeta: { fontSize: 12, marginTop: 1 },
  cardActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 16,
  },
  actionBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  actionText: { fontSize: 12, fontWeight: "700" },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(2,6,23,0.5)",
    justifyContent: "flex-end",
  },
  modalCard: {
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 20,
    paddingBottom: 36,
  },
  modalTitle: { fontSize: 18, fontWeight: "800", marginBottom: 14 },
  labelSelector: { flexDirection: "row", gap: 8, marginBottom: 14 },
  labelChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
  },
  labelChipText: { fontSize: 13, fontWeight: "700" },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
    marginBottom: 10,
  },
  row: { flexDirection: "row", gap: 10 },
  halfInput: { flex: 1 },
  saveBtn: {
    backgroundColor: "#0F766E",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 4,
  },
  saveBtnText: { color: "#fff", fontSize: 15, fontWeight: "800" },
});
