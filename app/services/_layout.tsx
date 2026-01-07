// app/services/_layout.tsx
import { Stack } from "expo-router";
import React from "react";

/**
 * ✅ ServicesLayout - Central layout for all service detail pages
 * --------------------------------------------------------------
 * - Removes default white header bar (headerShown: false)
 * - Allows each service screen (Electrician, Cleaning, etc.) to render its own gradient header
 * - Keeps navigation stack intact for smooth back transitions
 */
export default function ServicesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // ✅ Hides default Expo header across all services
        animation: "slide_from_right", // 👈 Adds a smooth page transition
        gestureEnabled: true, // 👈 Enables swipe-back gesture on iOS
      }}
    >
      {/* ✅ Individual service pages */}
      <Stack.Screen name="CleaningScreen" />
      <Stack.Screen name="ElectricianScreen" />
      <Stack.Screen name="PlumbingScreen" />
      <Stack.Screen name="ACRepairScreen" />
      <Stack.Screen name="WomenSalonScreen" />
      <Stack.Screen name="MenSalonScreen" />
      <Stack.Screen name="PaintingScreen" />
      <Stack.Screen name="MassageScreen" />
    </Stack>
  );
}
