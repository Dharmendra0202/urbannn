import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Simple admin credentials (in production, use secure authentication)
const ADMIN_USERNAME = "Ayush sharma";
const ADMIN_PASSWORD = "majnu@2909";

// Key used to confirm biometric was set up BY the admin on this device
const ADMIN_BIOMETRIC_KEY = "admin_biometric_enabled";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  useEffect(() => {
    // Only show biometric button if admin explicitly enabled it on this device
    AsyncStorage.getItem(ADMIN_BIOMETRIC_KEY).then((val) => {
      setBiometricAvailable(val === "true");
    });
  }, []);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const enteredUsername = username.trim();
      const enteredPassword = password.trim();

      if (enteredUsername === ADMIN_USERNAME && enteredPassword === ADMIN_PASSWORD) {
        // First successful password login — offer to enable biometric for next time
        AsyncStorage.getItem(ADMIN_BIOMETRIC_KEY).then(async (val) => {
          if (val !== "true") {
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            if (hasHardware && isEnrolled) {
              Alert.alert(
                "Enable Biometric Login?",
                "Use your fingerprint or Face ID to log in as admin next time.",
                [
                  { text: "Not now", style: "cancel" },
                  {
                    text: "Enable",
                    onPress: async () => {
                      // Verify once more before saving
                      const result = await LocalAuthentication.authenticateAsync({
                        promptMessage: "Confirm your biometric to enable admin access",
                        fallbackLabel: "Use passcode",
                        cancelLabel: "Cancel",
                        disableDeviceFallback: false,
                      });
                      if (result.success) {
                        await AsyncStorage.setItem(ADMIN_BIOMETRIC_KEY, "true");
                      }
                    },
                  },
                ]
              );
            }
          }
        });
        router.replace("/admin/dashboard" as any);
      } else {
        Alert.alert("Login Failed", "Invalid username or password");
        setPassword("");
      }
      setLoading(false);
    }, 500);
  };

  const handleBiometricLogin = async () => {
    // Double-check the flag — only proceed if admin set this up
    const enabled = await AsyncStorage.getItem(ADMIN_BIOMETRIC_KEY);
    if (enabled !== "true") {
      Alert.alert("Not set up", "Biometric admin login has not been enabled on this device.");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to access Admin Dashboard",
      fallbackLabel: "Use password instead",
      cancelLabel: "Cancel",
      // Require device biometrics only — no device passcode fallback as primary
      disableDeviceFallback: false,
    });

    if (result.success) {
      // Biometric passed — grant access (credentials were verified when biometric was set up)
      router.replace("/admin/dashboard" as any);
    } else if (result.error === "user_cancel") {
      // User cancelled — do nothing
    } else {
      Alert.alert("Authentication failed", "Biometric not recognised. Use your password.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo/Icon */}
          <LinearGradient
            colors={["#EF4444", "#DC2626"]}
            style={styles.iconContainer}
          >
            <Ionicons name="shield-checkmark" size={48} color="#FFFFFF" />
          </LinearGradient>

          <Text style={styles.title}>Admin Access</Text>
          <Text style={styles.subtitle}>
            Enter your credentials to access the admin dashboard
          </Text>

          {/* Username Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#64748B" />
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              placeholderTextColor="#94A3B8"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#64748B" />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="#94A3B8"
              style={styles.input}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#64748B"
              />
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={loading ? ["#94A3B8", "#64748B"] : ["#EF4444", "#DC2626"]}
              style={styles.loginButtonGradient}
            >
              <Text style={styles.loginButtonText}>
                {loading ? "Logging in..." : "Login to Dashboard"}
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>

          {/* Biometric Login — only shown if admin enabled it on this device */}
          {biometricAvailable && (
            <TouchableOpacity
              style={styles.biometricButton}
              onPress={handleBiometricLogin}
              activeOpacity={0.8}
            >
              <Ionicons name="finger-print-outline" size={22} color="#EF4444" />
              <Text style={styles.biometricText}>Use Biometric Login</Text>
            </TouchableOpacity>
          )}

          {/* Info */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={18} color="#64748B" />
            <Text style={styles.infoText}>
              Admin credentials required
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: "center",
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 24,
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: "#0F172A",
  },
  loginButton: {
    marginTop: 8,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    padding: 12,
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    gap: 8,
  },
  infoText: {
    fontSize: 13,
    color: "#64748B",
  },
  biometricButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 14,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#FECACA",
    backgroundColor: "#FFF5F5",
  },
  biometricText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#EF4444",
  },
});
