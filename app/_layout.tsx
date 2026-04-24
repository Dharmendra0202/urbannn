// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";
import { AuthProvider } from "../context/AuthContext";
import { BookingsProvider } from "../context/BookingsContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

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
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}
