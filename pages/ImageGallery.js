import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Text,
  Image,
  FlatList,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
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
  {
    img: require("../images/img1.jpg"),
    id: 10,
    name: "Gabriel Inferno",
    rating: 9,
    description:
      "24 hours in the lives of three young men in the French suburbs the day.",
  },
  {
    name: "The Dark Knight",
    img: require("../images/img2.jpg"),
    id: 11,
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
    id: 12,
  },
  {
    img: require("../images/img23.jpg"),
    id: 13,
    name: "Batman Begins",
    rating: 5.8,
    description:
      "A former Roman General sets out to exact vengeance against the corrupt.",
  },
  {
    img: require("../images/img16.jpg"),
    id: 14,
    name: "The God Father Part 02",
    rating: 4,
    description:
      "Los Angeles citizens with vastly separate lives collide in interweaving stories.",
  },
  {
    img: require("../images/img6.jpg"),
    id: 15,
    name: "Man Bites Dog",
    rating: 7.8,
    description:
      "A frustrated son tries to determine the fact from fiction in his dying father's life.",
  },
  {
    img: require("../images/img12.jpg"),
    id: 16,
    name: "The Departed",
    rating: 8.0,
    description:
      "n the deep south during the 1930s, three escaped convicts search for hidden treasure.",
  },
  {
    img: require("../images/img15.jpg"),
    id: 17,
    name: "Unberto D",
    rating: 8.7,
    description:
      "An elderly man and his dog struggle to survive on his government pension in Rome.",
  },
];

const { width, height } = Dimensions.get("screen");

export default function ImageGallery({ navigation }) {
  const [active, setActive] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const topRef = useRef();
  const bottomRef = useRef();
  useEffect(() => {
    bottomRef.current.scrollToIndex({ index: active, viewPosition: 0.5 });
  }, [active]);
  const onMomentumScrollEnd = (e) => {
    const newItem = Math.round(e.nativeEvent.contentOffset.x / width);
    if (active != newItem) {
      setActive(newItem);
    }
  };

  const onPress = (index) => {
    topRef.current.scrollToIndex({ index });
    setActive(index);
  };
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} />
      <FlatList
        data={DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={topRef}
        pagingEnabled
        onMomentumScrollEnd={onMomentumScrollEnd}
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
      <FlatList
        data={DATA}
        horizontal
        style={{
          position: "absolute",
          bottom: 20,
        }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        ref={bottomRef}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => onPress(index)}>
              <Animated.Image
                source={item.img}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  marginLeft: 5,
                  borderWidth: 2,
                  borderColor: index === active ? "#fff" : "transparent",
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          );
        }}
      />
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
  },
});
