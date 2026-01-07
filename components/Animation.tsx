import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Tabs } from "expo-router";

const { width } = Dimensions.get("window");
const TAB_COUNT = 4;
const TAB_WIDTH = width / TAB_COUNT;

export default function AnimatedTabBar() {
  const activeIndex = useSharedValue(0);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(activeIndex.value * TAB_WIDTH, { duration: 300 }) }],
  }));

  const tabs = [
    { name: "index", label: "Home", icon: "home-outline", activeColor: "#7C3AED" },
    { name: "categories", label: "Categories", icon: "grid-outline", activeColor: "#3B82F6" },
    { name: "bookings", label: "Bookings", icon: "calendar-outline", activeColor: "#22C55E" },
    { name: "profile", label: "Profile", icon: "person-outline", activeColor: "#EC4899" },
  ];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" }, // hide default bar
      }}
    >
      {tabs.map((tab, index) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarButton: () => null, // hide buttons
          }}
        />
      ))}

      {/* Custom Tab Bar */}
      <View style={styles.tabContainer}>
        <Animated.View style={[styles.indicator, indicatorStyle]} />
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.name}
            activeOpacity={0.8}
            style={styles.tabButton}
            onPress={() => (activeIndex.value = index)}
          >
<Ionicons
  name={tab.icon as keyof typeof Ionicons.glyphMap}
  size={24}
  color={activeIndex.value === index ? tab.activeColor : "#9CA3AF"}
/>

            <Text
              style={[
                styles.tabLabel,
                { color: activeIndex.value === index ? tab.activeColor : "#9CA3AF" },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "#e5e7eb",
    height: 70,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  indicator: {
    position: "absolute",
    bottom: 10,
    left: 10,
    width: TAB_WIDTH - 20,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#7C3AED",
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
});
