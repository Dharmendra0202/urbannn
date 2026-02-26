import React from "react";
import { View, Text, StyleSheet, ViewProps, TextProps } from "react-native";

// 🟩 Root Card
export const Card: React.FC<ViewProps> = ({ style, children, ...props }) => {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
};

// 🟩 Header
export const CardHeader: React.FC<ViewProps> = ({ style, children, ...props }) => {
  return (
    <View style={[styles.header, style]} {...props}>
      {children}
    </View>
  );
};

// 🟩 Title
export const CardTitle: React.FC<TextProps> = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.title, style]} {...props}>
      {children}
    </Text>
  );
};

// 🟩 Description
export const CardDescription: React.FC<TextProps> = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.description, style]} {...props}>
      {children}
    </Text>
  );
};

// 🟩 Content
export const CardContent: React.FC<ViewProps> = ({ style, children, ...props }) => {
  return (
    <View style={[styles.content, style]} {...props}>
      {children}
    </View>
  );
};

// 🟩 Footer
export const CardFooter: React.FC<ViewProps> = ({ style, children, ...props }) => {
  return (
    <View style={[styles.footer, style]} {...props}>
      {children}
    </View>
  );
};

// 🎨 Styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
