import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  Animated,
} from "react-native";
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
  {
    img: require("../images/img6.jpg"),
    id: 7,
    name: "Man Bites Dog",
    rating: 7.8,
    description:
      "A frustrated son tries to determine the fact from fiction in his dying father's life.",
  },
  {
    img: require("../images/img12.jpg"),
    id: 8,
    name: "The Departed",
    rating: 8.0,
    description:
      "n the deep south during the 1930s, three escaped convicts search for hidden treasure.",
  },
  {
    img: require("../images/img15.jpg"),
    id: 9,
    name: "Unberto D",
    rating: 8.7,
    description:
      "An elderly man and his dog struggle to survive on his government pension in Rome.",
  },
];
const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = ITEM_WIDTH * 1.4;
const SPACING = (width - ITEM_WIDTH) / 4;

const Rating = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "30%",
        justifyContent: "space-between",
      }}
    >
      <AntDesign name="star" size={14} color="gold"></AntDesign>
      <AntDesign name="star" size={14} color="gold"></AntDesign>
      <AntDesign name="star" size={14} color="gold"></AntDesign>
      <AntDesign name="star" size={14} color="gold"></AntDesign>
      <AntDesign name="staro" size={14} color="gold"></AntDesign>
    </View>
  );
};

export default function FlatlistCarousel({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <Animated.View style={styles.container}>
      <FlatList
        data={DATA}
        horizontal
        contentContainerStyle={{
          backgroundColor: "#fff",
          paddingLeft: SPACING * 2,
          paddingRight: SPACING,
        }}
        decelerationRate={"fast"}
        snapToInterval={ITEM_WIDTH + SPACING}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          const translateY = scrollX.interpolate({
            inputRange: [
              (index - 1) * ITEM_WIDTH,
              index * ITEM_WIDTH,
              (index + 1) * ITEM_WIDTH,
            ],
            outputRange: [0, -50, 0],
          });
          return (
            <Animated.View
              style={{
                width: ITEM_WIDTH,
                alignItems: "center",
                justifyContent: "center",
                marginRight: SPACING,
                transform: [{ translateY }],
              }}
            >
              <Image
                source={item.img}
                style={{
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                  borderRadius: 20,
                }}
                resizeMode="cover"
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginTop: 10,
                  marginBottom: 4,
                }}
              >
                {item.name}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ marginRight: 4 }}>{item.rating}</Text>
                <Rating />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: 120,
                  marginTop: 5,
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    borderRadius: 30,
                    fontSize: 12,
                  }}
                >
                  Action
                </Text>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    borderRadius: 30,
                    fontSize: 12,
                  }}
                >
                  Trailer
                </Text>
              </View>
              <Text
                numberOfLines={2}
                style={{ textAlign: "center", width: ITEM_WIDTH }}
              >
                {item.description}
              </Text>
            </Animated.View>
          );
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dotPagination: {
    width: 140,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    bottom: 300,
    alignSelf: "center",
    position: "relative",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 6,
    backgroundColor: "#ddd",
  },
});
