// app/(tabs)/profile.tsx
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function ProfileScreen() {
  const { theme, toggleTheme } = useTheme();
  const navigation = useNavigation<any>();
  const isDark = theme === "dark";

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");

  const colors = {
    background: isDark ? "#0B0B0E" : "#FFFFFF",
    text: isDark ? "#F5F5F7" : "#1A1A1A",
    subText: isDark ? "#A1A1AA" : "#6B7280",
    card: isDark ? "#15151A" : "#F8FAFC",
    border: isDark ? "#2A2A2F" : "#E5E7EB",
  };

  // 🧠 Step 1: When user presses logout
  const handleLogoutPress = () => {
    setShowOtpModal(true);
    setStep("email");
  };

  // 🧠 Step 2: Generate OTP
  const sendOtp = () => {
    if (!email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setStep("otp");

    // Simulate sending email (in real app you'd call backend here)
    Alert.alert("OTP Sent", `An OTP has been sent to ${email}`);
  };

  // 🧠 Step 3: Verify OTP
  const verifyOtpAndLogout = () => {
    if (otp === generatedOtp) {
      setShowOtpModal(false);
      setOtp("");
      setEmail("");
      setGeneratedOtp("");
      Alert.alert("Success", "Email verified. Logging out...");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } else {
      Alert.alert("Invalid OTP", "The OTP you entered is incorrect.");
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <LinearGradient
        colors={isDark ? ["#3B82F6", "#8B5CF6"] : ["#A855F7", "#EC4899"]}
        style={styles.header}
      >
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=8" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Ayush Sharma</Text>
        <Text style={styles.email}>as4408847@email.com</Text>
        <TouchableOpacity activeOpacity={0.9} style={styles.editButton}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* STATS */}
      <View style={styles.statsContainer}>
        {[
          { label: "Bookings", value: "12" },
          { label: "Spent", value: "₹8,450" },
          { label: "Rating", value: "4.9" },
        ].map((item, index) => (
          <MotiView
            key={index}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 100 }}
            style={styles.statBox}
          >
            <Text style={[styles.statValue, { color: colors.text }]}>
              {item.value}
            </Text>
            <Text style={[styles.statLabel, { color: colors.subText }]}>
              {item.label}
            </Text>
          </MotiView>
        ))}
      </View>

      {/* ACCOUNT SECTION */}
      <View style={styles.sectionWrapper}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          ACCOUNT
        </Text>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          {[
            { icon: "person-outline", label: "Edit Profile" },
            { icon: "location-outline", label: "Saved Addresses" },
            { icon: "card-outline", label: "Payment Methods" },
            { icon: "notifications-outline", label: "Notifications" },
            { icon: "star-outline", label: "My Reviews" },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.8}
              style={[styles.item, { borderBottomColor: colors.border }]}
            >
              <View style={styles.itemLeft}>
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={colors.text}
                />
                <Text style={[styles.itemText, { color: colors.text }]}>
                  {item.label}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.subText}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* SETTINGS */}
      <View style={styles.sectionWrapper}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          SETTINGS
        </Text>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <TouchableOpacity
            style={[styles.item, { borderBottomColor: colors.border }]}
          >
            <View style={styles.itemLeft}>
              <Ionicons name="shield-outline" size={22} color={colors.text} />
              <Text style={[styles.itemText, { color: colors.text }]}>
                Privacy & Security
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.subText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.item, { borderBottomColor: colors.border }]}
          >
            <View style={styles.itemLeft}>
              <Ionicons
                name="help-circle-outline"
                size={22}
                color={colors.text}
              />
              <Text style={[styles.itemText, { color: colors.text }]}>
                Help & Support
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.subText} />
          </TouchableOpacity>

          {/* Dark Mode */}
          <View style={[styles.item, { borderBottomColor: colors.border }]}>
            <View style={styles.itemLeft}>
              <Ionicons name="moon-outline" size={22} color={colors.text} />
              <Text style={[styles.itemText, { color: colors.text }]}>
                Dark Mode
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              thumbColor={isDark ? "#A855F7" : "#f4f3f4"}
              trackColor={{ false: "#ccc", true: "#7C3AED" }}
            />
          </View>
        </View>
      </View>

      {/* LOGOUT BUTTON */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.logoutCard}
        onPress={handleLogoutPress}
      >
        <LinearGradient
          colors={["#FEE2E2", "#FECACA"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logoutGradient}
        >
          <Ionicons name="log-out-outline" size={22} color="#B91C1C" />
          <Text style={styles.logoutText}>Log Out</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* OTP MODAL */}
      <Modal visible={showOtpModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={[styles.modalBox, { backgroundColor: colors.card }]}>
            {step === "email" ? (
              <>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Enter Email
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    { color: colors.text, borderColor: colors.border },
                  ]}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.subText}
                  value={email}
                  onChangeText={setEmail}
                />
                <TouchableOpacity style={styles.modalButton} onPress={sendOtp}>
                  <Text style={styles.modalButtonText}>Send OTP</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Enter OTP
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    { color: colors.text, borderColor: colors.border },
                  ]}
                  placeholder="Enter 6-digit OTP"
                  placeholderTextColor={colors.subText}
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={verifyOtpAndLogout}
                >
                  <Text style={styles.modalButtonText}>Verify & Logout</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity onPress={() => setShowOtpModal(false)}>
              <Text style={[styles.cancelText, { color: colors.subText }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={[styles.version, { color: colors.subText }]}>
        Version 1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingVertical: 50,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
  name: { color: "#fff", fontSize: 20, fontWeight: "700" },
  email: { color: "#EDE9FE", fontSize: 14, marginBottom: 10 },
  editButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  editText: { color: "#111", fontWeight: "600" },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 25,
  },
  statBox: { alignItems: "center" },
  statValue: { fontSize: 18, fontWeight: "700" },
  statLabel: { fontSize: 13 },
  sectionWrapper: { marginHorizontal: 16, marginBottom: 25 },
  sectionTitle: { fontSize: 14, fontWeight: "700", marginBottom: 10 },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
  },
  itemLeft: { flexDirection: "row", alignItems: "center" },
  itemText: { fontSize: 15, marginLeft: 10 },
  logoutCard: { marginHorizontal: 20, marginTop: 10 },
  logoutGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 14,
  },
  logoutText: {
    color: "#B91C1C",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 6,
  },
  version: { textAlign: "center", fontSize: 13, marginVertical: 20 },

  // 🔹 Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: "85%",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
  },
  cancelText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 14,
  },
});
