// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";
import { AuthProvider } from "../context/AuthContext";
import { BookingsProvider } from "../context/BookingsContext";
import { ThemeProvider } from "../context/ThemeContext";

/**
 * RootLayout - Main app navigation container.
 * This connects bottom tabs and service detail screens into one stack.
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BookingsProvider>
          <StatusBar style="dark" backgroundColor="#ffffff" hidden={false} />
          <Stack screenOptions={{ headerShown: false }}>
            {/* Bottom tab navigation (Home, Explore, etc.) */}
            <Stack.Screen name="(tabs)" />

            {/* Service screens (Cleaning, Electrician, etc.) */}
            <Stack.Screen name="services" />
            <Stack.Screen name="notifications" />
          </Stack>
        </BookingsProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
