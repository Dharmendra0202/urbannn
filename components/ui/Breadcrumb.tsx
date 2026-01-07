import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ✅ Breadcrumb Container
export const Breadcrumb = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.breadcrumb}>{children}</View>;
};

// ✅ Breadcrumb Item
export const BreadcrumbItem = ({
  label,
  onPress,
  isLast = false,
}: {
  label: string;
  onPress?: () => void;
  isLast?: boolean;
}) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        disabled={isLast}
        onPress={onPress}
        style={styles.itemButton}
      >
        <Text
          style={[
            styles.itemText,
            isLast && { color: "#111827", fontWeight: "600" },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>

      {/* Separator */}
      {!isLast && (
        <Ionicons name="chevron-forward" size={16} color="#9CA3AF" style={styles.icon} />
      )}
    </View>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  breadcrumb: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemButton: {
    paddingHorizontal: 2,
  },
  itemText: {
    fontSize: 14,
    color: "#6B7280", // muted text
  },
  icon: {
    marginHorizontal: 4,
  },
});
