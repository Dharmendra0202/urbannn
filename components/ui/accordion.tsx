import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

// Enable LayoutAnimation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Root Accordion container
export const Accordion = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.accordion}>{children}</View>;
};

// Individual Accordion Item
export const AccordionItem = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.item}>{children}</View>;
};

// Accordion Trigger (header)
export const AccordionTrigger = ({
  title,
  open,
  onPress,
}: {
  title: string;
  open: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <AntDesign
        name={open ? "up" : "down"}
        size={18}
        color="#374151"
      />
    </TouchableOpacity>
  );
};

// Accordion Content (expandable body)
export const AccordionContent = ({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) => {
  const [height, setHeight] = useState(0);
  const animation = useRef(new Animated.Value(open ? 1 : 0)).current;

  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.timing(animation, {
      toValue: open ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [open]);

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height],
  });

  return (
    <Animated.View style={[styles.contentContainer, { height: animatedHeight }]}>
      <View
        onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
        style={styles.contentInner}
      >
        {children}
      </View>
    </Animated.View>
  );
};

// Styles
const styles = StyleSheet.create({
  accordion: {
    borderRadius: 8,
    overflow: "hidden",
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#f2f4f6ff",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
contentContainer: {
  overflow: "hidden",
  backgroundColor: "#ffffff", // 🟢 white background for visible contrast
},
contentInner: {
  paddingHorizontal: 16,
  paddingVertical: 10,
},

});
