import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";

type AspectRatioProps = {
  ratio?: number; // e.g., 16/9, 1 (square), 4/3
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

/**
 * 📐 AspectRatio component for React Native
 * Works like Radix UI's AspectRatio.Root (web)
 */
export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio = 1,
  style,
  children,
}) => {
  return (
    <View style={[{ aspectRatio: ratio, width: "100%" }, style]}>
      {children}
    </View>
  );
};
