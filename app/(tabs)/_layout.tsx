import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { MotiText, MotiView } from "moti";
import React from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
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
          elevation: 12,
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
              name={focused ? "apps" : "apps-outline"}
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
              name={focused ? "receipt" : "receipt-outline"}
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
              name={focused ? "person-circle" : "person-circle-outline"}
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
        scale: focused ? 1.1 : 1,
        translateY: focused ? -2 : 0,
      }}
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 180,
      }}
      style={styles.iconContainer}
    >
      {/* Subtle icon animation */}
      <MotiView
        animate={{
          scale: focused ? [1, 1.08, 1] : 1,
        }}
        transition={{
          type: "timing",
          duration: 400,
          easing: Easing.out(Easing.ease),
        }}
      >
        <Ionicons
          name={name}
          size={26}
          color={focused ? accentColor : "#94A3B8"}
          style={styles.icon}
        />
      </MotiView>
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
        opacity: focused ? 1 : 0.65,
        scale: focused ? 1.05 : 1,
        translateY: focused ? -1 : 0,
      }}
      transition={{
        type: "spring",
        damping: 16,
        stiffness: 200,
      }}
      style={[styles.label, { color: focused ? accentColor : "#64748B" }]}
    >
      {label}
    </MotiText>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    zIndex: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.2,
    marginTop: 2,
  },
});
