import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
const { width, height } = Dimensions.get("screen");
const IMAGES = [
  { img: require("../images/img1.jpg") },
  { img: require("../images/img2.jpg") },
  { img: require("../images/img3.jpg") },
  { img: require("../images/img4.jpg") },
  { img: require("../images/img5.jpg") },
  { img: require("../images/img6.jpg") },
  { img: require("../images/img8.jpg") },
  { img: require("../images/img12.jpg") },
];

const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = ITEM_WIDTH * 1.4;

export default function ParallaxCarousel({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <FlatList
        data={IMAGES}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.3, 0, width * 0.3],
          });
          return (
            <View
              style={{
                width,
                height,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Animated.View
                style={{
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                  overflow: "hidden",
                  borderRadius: 14,
                  backgroundColor: "#fff",
                  elevation: 10,
                  borderWidth: 12,
                  borderColor: "#fff",
                  position: "relative",
                }}
              >
                <Animated.Image
                  source={item.img}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                    transform: [{ translateX }],
                  }}
                  resizeMode="cover"
                />
              </Animated.View>
              <Animated.Image
                source={require("../images/img3.jpg")}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  position: "absolute",
                  bottom: ITEM_HEIGHT / 2 + 15,
                  right: 90,
                  borderWidth: 4,
                  borderColor: "#f8f8f8",
                }}
                resizeMode="contain"
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
