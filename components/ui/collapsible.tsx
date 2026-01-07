// components/ui/collapsible.tsx
import React, { useState, useRef } from "react";
import {
  View,
  Animated,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type CollapsibleProps = {
  open?: boolean;
  children: React.ReactNode;
  duration?: number;
};

export const Collapsible: React.FC<CollapsibleProps> = ({
  open = false,
  children,
  duration = 250,
}) => {
  const [contentHeight, setContentHeight] = useState(0);
  const animated = useRef(new Animated.Value(open ? 1 : 0)).current;

  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.timing(animated, {
      toValue: open ? 1 : 0,
      duration,
      useNativeDriver: false,
    }).start();
  }, [open]);

  const heightInterpolation = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  return (
    <Animated.View style={[styles.container, { height: heightInterpolation }]}>
      <View
        onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
        style={styles.inner}
      >
        {children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { overflow: "hidden" },
  inner: { paddingHorizontal: 16, paddingVertical: 8 },
});
