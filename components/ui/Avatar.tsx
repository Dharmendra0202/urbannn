// components/ui/Avatar.tsx

import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from "react-native";

type AvatarProps = {
  uri?: string, // profile image URL
  fallback?: string, // fallback text (e.g., initials)
  size?: number, // avatar size (default 40)
  style?: StyleProp<ViewStyle>,
  imageStyle?: StyleProp<ImageStyle>,
};

/**
 * 👤 Avatar Component (React Native version of Radix UI Avatar)
 */
export const Avatar: React.FC<AvatarProps> = ({
  uri,
  fallback,
  size = 40,
  style,
  imageStyle,
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {uri ? (
        <Image
          source={{ uri }}
          style={[styles.image, imageStyle]}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>{fallback || "?"}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 9999,
    overflow: "hidden",
    backgroundColor: "#e5e7eb", // gray muted fallback
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  fallbackContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d1d5db", // light gray fallback background
  },
  fallbackText: {
    fontWeight: "600",
    color: "#374151",
  },
});
