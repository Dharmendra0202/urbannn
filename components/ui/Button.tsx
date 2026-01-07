import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle } from "react-native";

export interface ButtonProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: "default" | "secondary" | "destructive" | "outline";
  style?: ViewStyle;
  
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = "default",
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.base, styles[variant], style]}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, variant === "outline" && { color: "#111827" }]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  default: {
    backgroundColor: "#111827", // dark gray
  },
  secondary: {
    backgroundColor: "#4B5563", // muted gray
  },
  destructive: {
    backgroundColor: "#DC2626", // red
  },
  outline: {
    borderWidth: 1,
    borderColor: "#111827",
    backgroundColor: "transparent",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
