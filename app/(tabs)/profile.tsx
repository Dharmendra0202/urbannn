import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBookings } from "../../context/BookingsContext";
import { useTheme } from "../../context/ThemeContext";

type ProfileData = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
};

type QuickAction = {
  key: "bookings" | "addresses" | "payments" | "support" | "offers";
  title: string;
  subtitle: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  iconBg: string;
};

type PersistedProfileState = {
  profile: ProfileData;
  notificationEnabled: boolean;
  biometricEnabled: boolean;
};

const PROFILE_STORAGE_FILE = "profile-settings.json";

const getProfileStorageUri = () => {
  if (!FileSystem.documentDirectory) {
    return null;
  }
  return `${FileSystem.documentDirectory}${PROFILE_STORAGE_FILE}`;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const formatNextVisit = (scheduledAt: string, slot: string) => {
  const date = new Date(scheduledAt);
  if (Number.isNaN(date.getTime())) {
    return slot;
  }

  const dayLabel = date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });

  return `${dayLabel} • ${slot}`;
};

const initialsFrom = (name: string) => {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) {
    return "U";
  }

  const first = parts[0]?.[0] ?? "";
  const second = parts[1]?.[0] ?? "";
  return `${first}${second}`.toUpperCase();
};

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme, toggleTheme } = useTheme();
  const { bookings, getEffectiveStatus } = useBookings();
  const isDarkTheme = theme === "dark";
  const isDark = false;

  const [profile, setProfile] = useState<ProfileData>({
    fullName: "Majnu",
    email: "dv45564@gmail.com",
    phone: "8383999973",
    city: "Thane",
  });

  const [draftProfile, setDraftProfile] = useState(profile);
  const [showEditModal, setShowEditModal] = useState(false);

  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutStep, setLogoutStep] = useState<"email" | "otp">("email");
  const [logoutEmail, setLogoutEmail] = useState(profile.email);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");

  useEffect(() => {
    let alive = true;

    const hydrateProfile = async () => {
      try {
        const storageUri = getProfileStorageUri();
        if (!storageUri) {
          return;
        }

        const fileInfo = await FileSystem.getInfoAsync(storageUri);
        if (!fileInfo.exists) {
          return;
        }

        const rawData = await FileSystem.readAsStringAsync(storageUri);
        const parsedData = JSON.parse(rawData) as PersistedProfileState;
        if (!alive) {
          return;
        }

        if (parsedData.profile) {
          setProfile(parsedData.profile);
          setDraftProfile(parsedData.profile);
        }
        if (typeof parsedData.notificationEnabled === "boolean") {
          setNotificationEnabled(parsedData.notificationEnabled);
        }
        if (typeof parsedData.biometricEnabled === "boolean") {
          setBiometricEnabled(parsedData.biometricEnabled);
        }
      } catch {
        Alert.alert("Profile restore failed", "Using default profile values for now.");
      } finally {
        if (alive) {
          setIsProfileLoaded(true);
        }
      }
    };

    hydrateProfile();

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!isProfileLoaded) {
      return;
    }

    const persistProfile = async () => {
      const storageUri = getProfileStorageUri();
      if (!storageUri) {
        return;
      }

      const payload: PersistedProfileState = {
        profile,
        notificationEnabled,
        biometricEnabled,
      };

      await FileSystem.writeAsStringAsync(storageUri, JSON.stringify(payload));
    };

    persistProfile().catch(() => {
      Alert.alert("Profile save failed", "Could not save profile locally.");
    });
  }, [profile, notificationEnabled, biometricEnabled, isProfileLoaded]);

  const palette = {
    pageBg: isDark ? "#05070D" : "#EEF2FF",
    cardBg: isDark ? "#0F172A" : "#FFFFFF",
    textPrimary: isDark ? "#E2E8F0" : "#0F172A",
    textSecondary: isDark ? "#94A3B8" : "#64748B",
    border: isDark ? "#1E293B" : "#E2E8F0",
    inputBg: isDark ? "#111827" : "#F8FAFC",
    divider: isDark ? "#1E293B" : "#E5E7EB",
  };

  const insights = useMemo(() => {
    const upcoming = [] as typeof bookings;
    let completedCount = 0;
    let cancelledCount = 0;
    let totalSpent = 0;
    let ratingSum = 0;
    let ratingCount = 0;

    for (const booking of bookings) {
      const status = getEffectiveStatus(booking);

      if (status === "upcoming") {
        upcoming.push(booking);
      }

      if (status === "completed") {
        completedCount += 1;
        totalSpent += booking.totalAmount;
        if (booking.rating && booking.rating > 0) {
          ratingSum += booking.rating;
          ratingCount += 1;
        }
      }

      if (status === "cancelled") {
        cancelledCount += 1;
      }
    }

    upcoming.sort(
      (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
    );

    return {
      upcomingCount: upcoming.length,
      completedCount,
      cancelledCount,
      totalSpent,
      averageRating: ratingCount > 0 ? ratingSum / ratingCount : null,
      nextBooking: upcoming[0] ?? null,
    };
  }, [bookings, getEffectiveStatus]);

  const quickActions: QuickAction[] = [
    {
      key: "bookings",
      title: "My Bookings",
      subtitle: `${insights.upcomingCount} upcoming services`,
      icon: "calendar-outline",
      iconBg: "#DBEAFE",
    },
    {
      key: "addresses",
      title: "Saved Addresses",
      subtitle: "Manage home and office locations",
      icon: "location-outline",
      iconBg: "#E0E7FF",
    },
    {
      key: "payments",
      title: "Payment Methods",
      subtitle: "Cards, UPI, and saved options",
      icon: "card-outline",
      iconBg: "#DCFCE7",
    },
    {
      key: "support",
      title: "Help & Support",
      subtitle: "Call, chat, or raise a ticket",
      icon: "headset-outline",
      iconBg: "#FCE7F3",
    },
    {
      key: "offers",
      title: "Special Offers",
      subtitle: "Explore curated premium deals",
      icon: "gift-outline",
      iconBg: "#FEF3C7",
    },
  ];

  const handleQuickAction = (key: QuickAction["key"]) => {
    if (key === "bookings") {
      router.push("/bookings");
      return;
    }

    if (key === "offers") {
      router.push("/special-offer");
      return;
    }

    if (key === "addresses") {
      Alert.alert("Saved Addresses", "Address management can be added next.");
      return;
    }

    if (key === "payments") {
      Alert.alert("Payment Methods", "Payment method management can be added next.");
      return;
    }

    Alert.alert(
      "Support",
      "For quick help, contact us at support@urbannn.app or call +91 98765 43210.",
    );
  };

  const openEditModal = () => {
    setDraftProfile(profile);
    setShowEditModal(true);
  };

  const saveProfile = () => {
    const cleanedName = draftProfile.fullName.trim();
    const cleanedEmail = draftProfile.email.trim();
    const cleanedPhone = draftProfile.phone.replace(/\D/g, "");

    if (cleanedName.length < 2) {
      Alert.alert("Invalid name", "Please enter your full name.");
      return;
    }

    if (!cleanedEmail.includes("@")) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    if (cleanedPhone.length < 10) {
      Alert.alert("Invalid phone", "Please enter a valid 10-digit mobile number.");
      return;
    }

    setProfile({
      fullName: cleanedName,
      email: cleanedEmail,
      phone: cleanedPhone,
      city: draftProfile.city.trim() || "Not set",
    });
    setLogoutEmail(cleanedEmail);
    setShowEditModal(false);
  };

  const openLogoutModal = () => {
    setLogoutStep("email");
    setLogoutEmail(profile.email);
    setOtpInput("");
    setGeneratedOtp("");
    setShowLogoutModal(true);
  };

  const sendOtp = () => {
    const email = logoutEmail.trim();
    if (!email.includes("@")) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setLogoutStep("otp");
    Alert.alert("OTP Sent", `Demo OTP for testing: ${otp}`);
  };

  const verifyOtpAndLogout = () => {
    if (otpInput.trim() !== generatedOtp) {
      Alert.alert("Invalid OTP", "Please enter the correct OTP.");
      return;
    }

    setShowLogoutModal(false);
    setOtpInput("");
    setGeneratedOtp("");
    Alert.alert("Logged out", "You have been logged out successfully.");
    router.replace("/");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: palette.pageBg }]}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingTop: Math.max(insets.top + 10, 24) },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <MotiView
        from={{ opacity: 0, translateY: 24 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500 }}
        style={styles.heroMotion}
      >
        <View style={styles.heroShell}>
          <View style={styles.heroSphereTop} />
          <View style={styles.heroSphereRight} />

          <LinearGradient
            colors={isDark ? ["#0F172A", "#1E293B"] : ["#0F766E", "#0EA5E9"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <View style={styles.heroSheen} />

            <View style={styles.heroTopRow}>
              <View style={styles.heroIdentity}>
                <View style={styles.avatarWrap}>
                  <Text style={styles.avatarText}>{initialsFrom(profile.fullName)}</Text>
                </View>
                <View>
                  <Text style={styles.heroName}>{profile.fullName}</Text>
                  <Text style={styles.heroMeta}>{profile.city}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.heroEditButton} onPress={openEditModal}>
                <Ionicons name="create-outline" size={17} color="#FFFFFF" />
                <Text style={styles.heroEditText}>Edit</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.heroEmailRow}>
              <Ionicons name="mail-outline" size={14} color="rgba(255,255,255,0.9)" />
              <Text style={styles.heroEmail}>{profile.email}</Text>
            </View>

            {!!insights.nextBooking && (
              <View style={styles.nextVisitPill}>
                <Ionicons name="sparkles-outline" size={14} color="#E0F2FE" />
                <Text style={styles.nextVisitText}>
                  Next: {formatNextVisit(insights.nextBooking.scheduledAt, insights.nextBooking.slot)}
                </Text>
              </View>
            )}
          </LinearGradient>
        </View>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 120, type: "timing", duration: 450 }}
        style={[styles.statsCard, { backgroundColor: palette.cardBg, borderColor: palette.border }]}
      >
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: palette.textPrimary }]}>{insights.upcomingCount}</Text>
          <Text style={[styles.statLabel, { color: palette.textSecondary }]}>Upcoming</Text>
        </View>
        <View style={[styles.verticalDivider, { backgroundColor: palette.divider }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: palette.textPrimary }]}>{insights.completedCount}</Text>
          <Text style={[styles.statLabel, { color: palette.textSecondary }]}>Completed</Text>
        </View>
        <View style={[styles.verticalDivider, { backgroundColor: palette.divider }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: palette.textPrimary }]}>{formatCurrency(insights.totalSpent)}</Text>
          <Text style={[styles.statLabel, { color: palette.textSecondary }]}>Spent</Text>
        </View>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 220, type: "timing", duration: 450 }}
      >
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionTitle, { color: palette.textPrimary }]}>Quick Actions</Text>
          <Text style={[styles.sectionHint, { color: palette.textSecondary }]}>Premium account</Text>
        </View>

        <View style={[styles.sectionCard, { backgroundColor: palette.cardBg, borderColor: palette.border }]}> 
          {quickActions.map((action, index) => (
            <MotiView
              key={action.key}
              from={{ opacity: 0, translateX: 18 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: 260 + index * 80, type: "timing", duration: 380 }}
            >
              <TouchableOpacity
                style={[styles.rowItem, index !== quickActions.length - 1 && { borderBottomColor: palette.divider, borderBottomWidth: 1 }]}
                onPress={() => handleQuickAction(action.key)}
              >
                <View style={styles.rowLeft}>
                  <View style={[styles.iconBubble, { backgroundColor: action.iconBg }]}> 
                    <Ionicons name={action.icon} size={18} color="#1E293B" />
                  </View>
                  <View>
                    <Text style={[styles.rowTitle, { color: palette.textPrimary }]}>{action.title}</Text>
                    <Text style={[styles.rowSubtitle, { color: palette.textSecondary }]}>{action.subtitle}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color={palette.textSecondary} />
              </TouchableOpacity>
            </MotiView>
          ))}
        </View>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 340, type: "timing", duration: 450 }}
      >
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionTitle, { color: palette.textPrimary }]}>Preferences</Text>
          <Text style={[styles.sectionHint, { color: palette.textSecondary }]}>Control experience</Text>
        </View>

        <View style={[styles.sectionCard, { backgroundColor: palette.cardBg, borderColor: palette.border }]}> 
          <View style={[styles.switchRow, { borderBottomColor: palette.divider }]}> 
            <View style={styles.switchLeft}>
              <Ionicons name="moon-outline" size={20} color={palette.textPrimary} />
              <Text style={[styles.switchLabel, { color: palette.textPrimary }]}>Dark mode</Text>
            </View>
            <Switch
              value={isDarkTheme}
              onValueChange={toggleTheme}
              thumbColor={isDarkTheme ? "#A78BFA" : "#F8FAFC"}
              trackColor={{ false: "#CBD5E1", true: "#7C3AED" }}
            />
          </View>

          <View style={[styles.switchRow, { borderBottomColor: palette.divider }]}> 
            <View style={styles.switchLeft}>
              <Ionicons name="notifications-outline" size={20} color={palette.textPrimary} />
              <Text style={[styles.switchLabel, { color: palette.textPrimary }]}>Notifications</Text>
            </View>
            <Switch
              value={notificationEnabled}
              onValueChange={setNotificationEnabled}
              thumbColor={notificationEnabled ? "#86EFAC" : "#F8FAFC"}
              trackColor={{ false: "#CBD5E1", true: "#16A34A" }}
            />
          </View>

          <View style={styles.switchRow}>
            <View style={styles.switchLeft}>
              <Ionicons name="finger-print-outline" size={20} color={palette.textPrimary} />
              <Text style={[styles.switchLabel, { color: palette.textPrimary }]}>Biometric lock</Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              thumbColor={biometricEnabled ? "#FDE68A" : "#F8FAFC"}
              trackColor={{ false: "#CBD5E1", true: "#F59E0B" }}
            />
          </View>
        </View>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 430, type: "timing", duration: 450 }}
      >
        <TouchableOpacity style={styles.logoutButton} onPress={openLogoutModal}>
          <LinearGradient
            colors={["#FEE2E2", "#FECACA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoutGradient}
          >
            <Ionicons name="log-out-outline" size={20} color="#B91C1C" />
            <Text style={styles.logoutText}>Secure Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </MotiView>

      <Text style={[styles.versionText, { color: palette.textSecondary }]}>Version 1.0.0</Text>

      <Modal
        visible={showEditModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowEditModal(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setShowEditModal(false)}>
          <Pressable
            style={[styles.modalCard, { backgroundColor: palette.cardBg, borderColor: palette.border }]}
            onPress={() => undefined}
          >
            <Text style={[styles.modalTitle, { color: palette.textPrimary }]}>Edit Profile</Text>

            <TextInput
              style={[styles.input, { color: palette.textPrimary, borderColor: palette.border, backgroundColor: palette.inputBg }]}
              placeholder="Full name"
              placeholderTextColor={palette.textSecondary}
              value={draftProfile.fullName}
              onChangeText={(value) => setDraftProfile((prev) => ({ ...prev, fullName: value }))}
            />
            <TextInput
              style={[styles.input, { color: palette.textPrimary, borderColor: palette.border, backgroundColor: palette.inputBg }]}
              placeholder="Email"
              placeholderTextColor={palette.textSecondary}
              value={draftProfile.email}
              onChangeText={(value) => setDraftProfile((prev) => ({ ...prev, email: value }))}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={[styles.input, { color: palette.textPrimary, borderColor: palette.border, backgroundColor: palette.inputBg }]}
              placeholder="Phone"
              placeholderTextColor={palette.textSecondary}
              value={draftProfile.phone}
              onChangeText={(value) => setDraftProfile((prev) => ({ ...prev, phone: value }))}
              keyboardType="phone-pad"
            />
            <TextInput
              style={[styles.input, { color: palette.textPrimary, borderColor: palette.border, backgroundColor: palette.inputBg }]}
              placeholder="City"
              placeholderTextColor={palette.textSecondary}
              value={draftProfile.city}
              onChangeText={(value) => setDraftProfile((prev) => ({ ...prev, city: value }))}
            />

            <TouchableOpacity style={styles.primaryModalButton} onPress={saveProfile}>
              <Text style={styles.primaryModalButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setShowLogoutModal(false)}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.modalKeyboardWrap}
          >
            <Pressable
              style={[styles.modalCard, { backgroundColor: palette.cardBg, borderColor: palette.border }]}
              onPress={() => undefined}
            >
              <Text style={[styles.modalTitle, { color: palette.textPrimary }]}>Verify Before Logout</Text>
              <Text style={[styles.modalSubtitle, { color: palette.textSecondary }]}>For account security, confirm with email OTP.</Text>

              {logoutStep === "email" ? (
                <>
                  <TextInput
                    style={[styles.input, { color: palette.textPrimary, borderColor: palette.border, backgroundColor: palette.inputBg }]}
                    placeholder="Enter your email"
                    placeholderTextColor={palette.textSecondary}
                    value={logoutEmail}
                    onChangeText={setLogoutEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <TouchableOpacity style={styles.primaryModalButton} onPress={sendOtp}>
                    <Text style={styles.primaryModalButtonText}>Send OTP</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TextInput
                    style={[styles.input, { color: palette.textPrimary, borderColor: palette.border, backgroundColor: palette.inputBg }]}
                    placeholder="Enter 6-digit OTP"
                    placeholderTextColor={palette.textSecondary}
                    keyboardType="numeric"
                    value={otpInput}
                    onChangeText={setOtpInput}
                    maxLength={6}
                  />
                  <TouchableOpacity style={styles.primaryModalButton} onPress={verifyOtpAndLogout}>
                    <Text style={styles.primaryModalButtonText}>Verify & Logout</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryModalButton}
                    onPress={() => {
                      setLogoutStep("email");
                      setOtpInput("");
                    }}
                  >
                    <Text style={styles.secondaryModalButtonText}>Change Email</Text>
                  </TouchableOpacity>
                </>
              )}
            </Pressable>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  heroMotion: {
    marginTop: 6,
    marginBottom: 2,
  },
  heroShell: {
    position: "relative",
    borderRadius: 26,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.24,
    shadowRadius: 24,
    elevation: 12,
  },
  heroSphereTop: {
    position: "absolute",
    top: -14,
    left: 22,
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.26)",
    zIndex: 2,
  },
  heroSphereRight: {
    position: "absolute",
    right: -12,
    bottom: 18,
    width: 78,
    height: 78,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    zIndex: 2,
  },
  heroCard: {
    borderRadius: 26,
    padding: 18,
    overflow: "hidden",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  heroSheen: {
    position: "absolute",
    top: -50,
    left: -20,
    width: "80%",
    height: 120,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.12)",
    transform: [{ rotate: "-8deg" }],
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
    gap: 10,
  },
  heroIdentity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  avatarWrap: {
    width: 58,
    height: 58,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  heroEditButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "rgba(15,23,42,0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    paddingVertical: 7,
    paddingHorizontal: 10,
    gap: 4,
  },
  heroEditText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  heroName: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 1,
  },
  heroMeta: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    fontWeight: "600",
  },
  heroEmailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  heroEmail: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 13,
    fontWeight: "500",
  },
  nextVisitPill: {
    marginTop: 2,
    alignSelf: "flex-start",
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 5,
  },
  nextVisitText: {
    color: "#F0F9FF",
    fontSize: 12,
    fontWeight: "600",
  },
  statsCard: {
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    paddingVertical: 14,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
  },
  statLabel: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "600",
  },
  verticalDivider: {
    width: 1,
    marginVertical: 6,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
  },
  sectionHint: {
    fontSize: 12,
    fontWeight: "600",
  },
  sectionCard: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 16,
  },
  rowItem: {
    paddingVertical: 13,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexShrink: 1,
    marginRight: 8,
  },
  iconBubble: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
  rowSubtitle: {
    marginTop: 1,
    fontSize: 12,
    fontWeight: "500",
  },
  switchRow: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  switchLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
  logoutButton: {
    marginTop: 2,
  },
  logoutGradient: {
    borderRadius: 16,
    paddingVertical: 13,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  logoutText: {
    color: "#B91C1C",
    fontSize: 15,
    fontWeight: "800",
  },
  versionText: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 12,
    fontWeight: "600",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(2, 6, 23, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  modalKeyboardWrap: {
    width: "100%",
    alignItems: "center",
  },
  modalCard: {
    width: "100%",
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 10,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 10,
    fontSize: 14,
  },
  primaryModalButton: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 2,
  },
  primaryModalButtonText: {
    color: "#EFF6FF",
    fontSize: 14,
    fontWeight: "700",
  },
  secondaryModalButton: {
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  secondaryModalButtonText: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "700",
  },
});
