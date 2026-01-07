// app/_layout.tsx
import { Stack } from "expo-router";
import React from "react";
import "react-native-reanimated";
import { ThemeProvider } from "./context/ThemeContext"; // ✅ fixed path

/**
 * RootLayout - Main app navigation container.
 * This connects bottom tabs and service detail screens into one stack.
 */
export default function RootLayout() {
  return (
    // ✅ Wrap everything inside ThemeProvider for global dark/light theme
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Bottom tab navigation (Home, Explore, etc.) */}
        <Stack.Screen name="(tabs)" />

        {/* Service screens (Cleaning, Electrician, etc.) */}
        <Stack.Screen name="services" />
      </Stack>
    </ThemeProvider>
  );
}
