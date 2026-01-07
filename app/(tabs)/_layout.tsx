import "react-native-gesture-handler";
import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 0.5,
          borderTopColor: "#e5e7eb",
          height: 60,
          paddingBottom: 6,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <AnimatedIcon
              name={focused ? "home" : "home-outline"}
              color={focused ? "#7C3AED" : "#9CA3AF"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ focused }) => (
            <AnimatedIcon
              name={focused ? "grid" : "grid-outline"}
              color={focused ? "#3B82F6" : "#9CA3AF"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ focused }) => (
            <AnimatedIcon
              name={focused ? "calendar" : "calendar-outline"}
              color={focused ? "#22C55E" : "#9CA3AF"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <AnimatedIcon
              name={focused ? "person" : "person-outline"}
              color={focused ? "#EC4899" : "#9CA3AF"}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

// ✨ Animated Icon Component
function AnimatedIcon({ name, color, focused }: any) {
  return (
    <MotiView
      from={{ scale: 1, translateY: 0 }}
      animate={{
        scale: focused ? 1.2 : 1,
        translateY: focused ? -4 : 0,
      }}
      transition={{
        type: "timing",
        duration: 250,
      }}
    >
      <Ionicons name={name} size={26} color={color} />
    </MotiView>
  );
}
