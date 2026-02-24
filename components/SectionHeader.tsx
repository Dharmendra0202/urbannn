import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  actionStyle?: StyleProp<TextStyle>;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel,
  onPress,
  containerStyle,
  titleStyle,
  actionStyle,
}) => (
  <View style={containerStyle}>
    <Text style={titleStyle}>{title}</Text>
    {actionLabel ? (
      <TouchableOpacity onPress={onPress}>
        <Text style={actionStyle}>{actionLabel}</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

export default SectionHeader;
