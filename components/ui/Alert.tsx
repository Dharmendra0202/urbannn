import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

type AlertVariant = "default" | "destructive";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

/**
 * 🔔 Base Alert Component
 */
export const Alert: React.FC<AlertProps> = ({
  variant = "default",
  title,
  description,
  children,
  style,
}) => {
  const variantStyle =
    variant === "destructive"
      ? styles.destructive
      : styles.default;

  return (
    <View style={[styles.container, variantStyle, style]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {children}
    </View>
  );
};

/**
 * 🏷️ Alert Title Component
 */
export const AlertTitle: React.FC<{ children: React.ReactNode; style?: TextStyle }> = ({
  children,
  style,
}) => <Text style={[styles.title, style]}>{children}</Text>;

/**
 * 💬 Alert Description Component
 */
export const AlertDescription: React.FC<{ children: React.ReactNode; style?: TextStyle }> = ({
  children,
  style,
}) => <Text style={[styles.description, style]}>{children}</Text>;

/**
 * 🎨 Styles
 */
const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    padding: 14,
    marginVertical: 8,
    borderWidth: 1,
  },
  default: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
  },
  destructive: {
    backgroundColor: "#FEE2E2",
    borderColor: "#DC2626",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#374151",
  },
});
