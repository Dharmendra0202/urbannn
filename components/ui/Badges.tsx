import React from "react";
import { Text, View, StyleSheet, ViewStyle, TextStyle } from "react-native";

// ✅ Define Badge variants
type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "default",
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.base, variantStyles[variant], style]}>
      <Text style={[styles.text, variantTextStyles[variant], textStyle]}>
        {label}
      </Text>
    </View>
  );
};

// ✅ Base styles
const styles = StyleSheet.create({
  base: {
    alignSelf: "flex-start",
    borderRadius: 9999,
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginVertical: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});

// ✅ Variant-specific styles
const variantStyles: Record<BadgeVariant, ViewStyle> = {
  default: {
    backgroundColor: "#2563eb", // blue-600
    borderColor: "transparent",
  },
  secondary: {
    backgroundColor: "#6b7280", // gray-500
    borderColor: "transparent",
  },
  destructive: {
    backgroundColor: "#dc2626", // red-600
    borderColor: "transparent",
  },
  outline: {
    backgroundColor: "transparent",
    borderColor: "#374151", // gray-700
  },
};

// ✅ Variant text colors
const variantTextStyles: Record<BadgeVariant, TextStyle> = {
  default: { color: "#fff" },
  secondary: { color: "#fff" },
  destructive: { color: "#fff" },
  outline: { color: "#111827" },
};
