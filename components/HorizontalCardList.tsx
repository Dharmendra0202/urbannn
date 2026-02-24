import React from "react";
import { FlatList, Text } from "react-native";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import HorizontalCard from "@/components/HorizontalCard";
import type { HorizontalItem } from "@/types/home";

type HorizontalCardListProps<T extends HorizontalItem> = {
  data: T[];
  onItemPress?: (item: T) => void;
  emptyText?: string;
  emptyTextStyle?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const HorizontalCardList = <T extends HorizontalItem>({
  data,
  onItemPress,
  emptyText,
  emptyTextStyle,
  contentContainerStyle,
}: HorizontalCardListProps<T>) => {
  if (data.length === 0 && emptyText) {
    return <Text style={emptyTextStyle}>{emptyText}</Text>;
  }

  return (
    <FlatList
      horizontal
      data={data}
      renderItem={({ item }) => (
        <HorizontalCard
          item={item}
          onPress={onItemPress ? () => onItemPress(item) : undefined}
        />
      )}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
    />
  );
};

export default HorizontalCardList;
