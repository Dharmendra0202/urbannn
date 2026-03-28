// app/_layout.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { AppState, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "react-native-reanimated";
import { AuthProvider } from "../context/AuthContext";
import { BookingsProvider } from "../context/BookingsContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

const BIOMETRIC_KEY = "biometric_enabled";

function BiometricGate({ children }: { children: React.ReactNode }) {
  const [locked, setLocked] = useState(false);
  const [checking, setChecking] = useState(true);
  const appState = useRef(AppState.currentState);

  const authenticate = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Unlock Urbannn",
      fallbackLabel: "Use passcode",
      cancelLabel: "Cancel",
    });
    if (result.success) setLocked(false);
  };

  const checkAndLock = async () => {
    const enabled = await AsyncStorage.getItem(BIOMETRIC_KEY);
    if (enabled === "true") {
      setLocked(true);
      await authenticate();
    }
    setChecking(false);
  };

  useEffect(() => {
    checkAndLock();

    const sub = AppState.addEventListener("change", async (nextState) => {
      if (appState.current.match(/inactive|background/) && nextState === "active") {
        const enabled = await AsyncStorage.getItem(BIOMETRIC_KEY);
        if (enabled === "true") {
          setLocked(true);
          await authenticate();
        }
      }
      appState.current = nextState;
    });

    return () => sub.remove();
  }, []);

  if (checking) return null;

  return (
    <>
      {children}
      <Modal visible={locked} transparent animationType="fade">
        <View style={gateStyles.overlay}>
          <View style={gateStyles.card}>
            <Text style={gateStyles.icon}>🔒</Text>
            <Text style={gateStyles.title}>App Locked</Text>
            <Text style={gateStyles.subtitle}>Authenticate to continue</Text>
            <TouchableOpacity style={gateStyles.button} onPress={authenticate}>
              <Text style={gateStyles.buttonText}>Unlock with Biometrics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const gateStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(2,6,23,0.92)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#0F172A",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    width: "80%",
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  icon: { fontSize: 48, marginBottom: 12 },
  title: { color: "#F8FAFC", fontSize: 22, fontWeight: "800", marginBottom: 6 },
  subtitle: { color: "#94A3B8", fontSize: 14, marginBottom: 24 },
  button: {
    backgroundColor: "#F59E0B",
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 28,
  },
  buttonText: { color: "#0F172A", fontSize: 15, fontWeight: "800" },
});

function AppContent() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <BookingsProvider>
      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={isDark ? "#0F172A" : "#ffffff"}
        hidden={false}
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="services" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="offers/index" options={{ animation: "slide_from_bottom", animationDuration: 320 }} />
        <Stack.Screen name="categories/index" options={{ animation: "slide_from_bottom", animationDuration: 320 }} />
        <Stack.Screen name="cleaning/index" options={{ animation: "slide_from_bottom", animationDuration: 320 }} />
        <Stack.Screen name="repair/index" options={{ animation: "slide_from_bottom", animationDuration: 320 }} />
        <Stack.Screen name="recommended/index" options={{ animation: "slide_from_bottom", animationDuration: 320 }} />
      </Stack>
    </BookingsProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BiometricGate>
          <AppContent />
        </BiometricGate>
      </ThemeProvider>
    </AuthProvider>
  );
}
