import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Animated, FlatList, Dimensions } from "react-native";
const DATA = [
  {
    img: require("../images/img1.jpg"),
    id: 1,
    name: "Gabriel Inferno",
    rating: 9,
    description:
      "24 hours in the lives of three young men in the French suburbs the day.",
  },
  {
    name: "The Dark Knight",
    img: require("../images/img2.jpg"),
    id: 2,
    rating: 7.5,
    description:
      "The aging patriarch of an organized crime dynasty in postwar New York City.",
  },
  {
    name: "Fight Club",
    rating: 8.5,
    description:
      "A bounty hunting scam joins two men in an uneasy alliance against a third. ",
    img: require("../images/img24.jpg"),
    id: 3,
  },
  {
    img: require("../images/img23.jpg"),
    id: 4,
    name: "Batman Begins",
    rating: 5.8,
    description:
      "A former Roman General sets out to exact vengeance against the corrupt.",
  },
  {
    img: require("../images/img16.jpg"),
    id: 5,
    name: "The God Father Part 02",
    rating: 4,
    description:
      "Los Angeles citizens with vastly separate lives collide in interweaving stories.",
  },
];

const DOT_SIZE = 8;

const Indicator = ({ scrollX }) => {
  return (
    <View style={styles.dotIndicator}>
      {DATA.map((item, index) => {
        const scale = scrollX.interpolate({
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: [1, 1.7, 1],
          extrapolate: "clamp",
        });
        const opacity = scale;
        return (
          <Animated.View
            key={index}
            style={[styles.dot, { transform: [{ scale }] }, { opacity }]}
          ></Animated.View>
        );
      })}
    </View>
  );
};

const { width, height } = Dimensions.get("screen");
export default function DotIndicator({ navigation }) {
  const [active, setActive] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} />
      <FlatList
        data={DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          return (
            <Animated.Image
              source={item.img}
              style={styles.image}
              resizeMode="cover"
            />
          );
        }}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width,
    height,
    zIndex: 111,
  },
  dotIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    marginLeft: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: "#fff",
  },
});
