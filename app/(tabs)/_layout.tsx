import "react-native-gesture-handler";
import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MotiText, MotiView } from "moti";
import { StyleSheet } from "react-native";
import { Easing } from "react-native-reanimated";

type TabName = React.ComponentProps<typeof Ionicons>["name"];
type AccentColor = "#7C3AED" | "#3B82F6" | "#22C55E" | "#EC4899";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
          height: 67,
          paddingTop: 8,
          paddingBottom: 10,
          elevation: 14,
          shadowColor: "#0f172a",
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: ({ focused }) => (
            <AnimatedTabLabel label="Home" focused={focused} accentColor="#7C3AED" />
          ),
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon
              name={focused ? "home" : "home-outline"}
              accentColor="#7C3AED"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarLabel: ({ focused }) => (
            <AnimatedTabLabel
              label="Categories"
              focused={focused}
              accentColor="#3B82F6"
            />
          ),
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon
              name={focused ? "grid" : "grid-outline"}
              accentColor="#3B82F6"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarLabel: ({ focused }) => (
            <AnimatedTabLabel label="Bookings" focused={focused} accentColor="#22C55E" />
          ),
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon
              name={focused ? "calendar" : "calendar-outline"}
              accentColor="#22C55E"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: ({ focused }) => (
            <AnimatedTabLabel label="Profile" focused={focused} accentColor="#EC4899" />
          ),
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon
              name={focused ? "person" : "person-outline"}
              accentColor="#EC4899"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

function AnimatedTabIcon({
  name,
  accentColor,
  focused,
}: {
  name: TabName;
  accentColor: AccentColor;
  focused: boolean;
}) {
  return (
    <MotiView
      animate={{
        scale: focused ? 1.06 : 1,
        translateY: focused ? -1 : 0,
      }}
      transition={{
        type: "timing",
        duration: 280,
        easing: Easing.out(Easing.cubic),
      }}
      style={styles.iconContainer}
    >
      <MotiView
        animate={{
          opacity: focused ? 0.95 : 0,
          scale: focused ? 1 : 0.68,
        }}
        transition={{
          type: "timing",
          duration: 320,
          easing: Easing.out(Easing.exp),
        }}
        style={[
          styles.iconGlow,
          {
            backgroundColor: `${accentColor}24`,
          },
        ]}
      />
      <MotiView
        animate={{
          opacity: focused ? 0.55 : 0,
          scale: focused ? 1.16 : 0.74,
        }}
        transition={{
          type: "timing",
          duration: 340,
          easing: Easing.out(Easing.cubic),
        }}
        style={[styles.iconRing, { borderColor: `${accentColor}70` }]}
      />
      <Ionicons
        name={name}
        size={22}
        color={focused ? accentColor : "#94A3B8"}
        style={styles.icon}
      />
      <MotiView
        animate={{
          width: focused ? 18 : 6,
          opacity: focused ? 1 : 0.45,
        }}
        transition={{
          type: "timing",
          duration: 300,
          easing: Easing.out(Easing.cubic),
        }}
        style={[styles.activeLine, { backgroundColor: accentColor }]}
      />
    </MotiView>
  );
}

function AnimatedTabLabel({
  label,
  focused,
  accentColor,
}: {
  label: string;
  focused: boolean;
  accentColor: AccentColor;
}) {
  return (
    <MotiText
      animate={{
        opacity: focused ? 1 : 0.75,
        scale: focused ? 1 : 0.96,
        translateY: focused ? 0 : 1,
      }}
      transition={{
        type: "timing",
        duration: 280,
        easing: Easing.out(Easing.cubic),
      }}
      style={[styles.label, { color: focused ? accentColor : "#94A3B8" }]}
    >
      {label}
    </MotiText>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 56,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  iconGlow: {
    position: "absolute",
    width: 34,
    height: 34,
    borderRadius: 999,
  },
  iconRing: {
    position: "absolute",
    width: 34,
    height: 34,
    borderRadius: 999,
    borderWidth: 1.4,
  },
  icon: {
    zIndex: 1,
  },
  activeLine: {
    position: "absolute",
    bottom: -1,
    height: 3,
    borderRadius: 3,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
