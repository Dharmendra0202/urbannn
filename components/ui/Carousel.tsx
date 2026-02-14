import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

export type CarouselItem = {
  id: string;
  image: string;
};

export type AppCarouselProps = {
  data: CarouselItem[];
  autoPlay?: boolean;
  loop?: boolean;
};

export const AppCarousel: React.FC<AppCarouselProps> = ({
  data,
  autoPlay = true,
  loop = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Carousel
        width={width * 0.9}
        height={200}
        autoPlay={autoPlay}
        loop={loop}
        data={data}
        scrollAnimationDuration={800}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
      />

      {/* Optional navigation buttons */}
      <View style={styles.buttonRow}>
        <Button
          variant="outline"
          style={styles.button}
          onPress={() =>
            setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1))
          }
        >
          Prev
        </Button>

        <Button
          variant="default"
          style={styles.button}
          onPress={() =>
            setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1))
          }
        >
          Next
        </Button>
      </View>
    </View>
  );
};

//
// ✅ Styles
//
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  card: {
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});
