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
          height: 65,
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
        translateY: focused ? -5 : 0,
        scale: focused ? 1.03 : 1,
      }}
      transition={{
        type: "spring",
        damping: 20,
        mass: 0.9,
        stiffness: 160,
      }}
      style={styles.iconContainer}
    >
      <MotiView
        animate={{
          opacity: focused ? 1 : 0.12,
          scale: focused ? 1 : 0.94,
        }}
        transition={{
          type: "spring",
          damping: 22,
          mass: 1,
          stiffness: 180,
        }}
        style={[
          styles.iconPill,
          {
            backgroundColor: `${accentColor}20`,
            borderColor: `${accentColor}45`,
          },
        ]}
      />
      <Ionicons
        name={name}
        size={22}
        color={focused ? accentColor : "#94A3B8"}
        style={styles.icon}
      />
      <MotiView
        animate={{
          opacity: focused ? 1 : 0,
          scale: focused ? 1 : 0.8,
          translateY: focused ? 0 : 1,
        }}
        transition={{
          type: "timing",
          duration: 260,
          easing: Easing.out(Easing.cubic),
        }}
        style={[styles.activeDot, { backgroundColor: accentColor }]}
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
        opacity: focused ? 1 : 0.8,
        translateY: focused ? -1 : 0,
      }}
      transition={{
        type: "timing",
        duration: 240,
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
  iconPill: {
    position: "absolute",
    width: 44,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
  },
  icon: {
    zIndex: 1,
  },
  activeDot: {
    position: "absolute",
    bottom: 1,
    width: 4,
    height: 4,
    borderRadius: 999,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
