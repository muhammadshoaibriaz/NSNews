// import { AntDesign, FontAwesome } from "@expo/vector-icons";
// import { StatusBar } from "expo-status-bar";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Animated,
//   FlatList,
//   Text,
//   Dimensions,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
// } from "react-native";
// import { Button } from "react-native-paper";
// const { width, height } = Dimensions.get("screen");
// const DATA = [
//   {
//     img: require("../images/img1.jpg"),
//     id: 1,
//     name: "Gabriel Inferno",
//     rating: 9,
//     description:
//       "24 hours in the lives of three young men in the French suburbs the day.",
//   },
//   {
//     name: "The Dark Knight",
//     img: require("../images/img2.jpg"),
//     id: 2,
//     rating: 7.5,
//     description:
//       "The aging patriarch of an organized crime dynasty in postwar New York City.",
//   },
//   {
//     name: "Fight Club",
//     rating: 8.5,
//     description:
//       "A bounty hunting scam joins two men in an uneasy alliance against a third. ",
//     img: require("../images/img24.jpg"),
//     id: 3,
//   },
//   {
//     img: require("../images/img23.jpg"),
//     id: 4,
//     name: "Batman Begins",
//     rating: 5.8,
//     description:
//       "A former Roman General sets out to exact vengeance against the corrupt.",
//   },
//   {
//     img: require("../images/img16.jpg"),
//     id: 5,
//     name: "The God Father Part 02",
//     rating: 4,
//     description:
//       "Los Angeles citizens with vastly separate lives collide in interweaving stories.",
//   },
// ];

// const NAMES = ["Foods", "Drinks", "Snacks", "Sandwich", "Fast foods", "Burger"];
// const DATAS = [
//   {
//     name: "Vegelle tomato mix",
//     img: require("../images/jars.jpg"),
//     itemNo: "N1, 900",
//   },
//   {
//     name: "Vegelle tomato mix",
//     img: require("../images/plate-1.png"),
//     itemNo: "N1, 900",
//   },
//   {
//     name: "Vegelle tomato mix",
//     img: require("../images/plate-3.png"),
//     itemNo: "N1, 900",
//   },
//   {
//     name: "Vegelle tomato mix",
//     img: require("../images/yogurt.png"),
//     itemNo: "N1, 900",
//   },
// ];
// const ITEM_WIDTH = width * 0.55;
// const ITEM_HEIGHT = ITEM_WIDTH * 1.2;
// const SPACING = 20;

// export default function BarIndicator({ navigation }) {
//   const [active, setActive] = useState(0);
//   const onPress = (val) => {
//     setActive(val);
//   };
//   return (
//     <ScrollView
//       contentContainerStyle={{
//         paddingHorizontal: 20,
//       }}
//       showsVerticalScrollIndicator={false}
//     >
//       <Animated.View style={styles.header}>
//         <TouchableOpacity style={styles.touchable}>
//           <FontAwesome name="list" size={20} color="#666" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.touchable}>
//           <FontAwesome name="cart-arrow-down" size={20} color="#666" />
//         </TouchableOpacity>
//       </Animated.View>
//       <Text style={styles.h1}>Delicious food for you</Text>
//       <View style={styles.searchBar}>
//         <AntDesign name="search1" size={18} />
//         <TextInput placeholder="Search" style={styles.input} />
//       </View>
//       <FlatList
//         data={NAMES}
//         horizontal
//         style={{ marginTop: 20 }}
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item, index }) => {
//           return (
//             <TouchableOpacity onPress={() => onPress(index)}>
//               <Text
//                 style={{
//                   fontSize: 16,
//                   fontWeight: "bold",
//                   marginRight: 25,
//                   color: index === active ? "orangered" : "black",
//                 }}
//               >
//                 {item}
//               </Text>
//             </TouchableOpacity>
//           );
//         }}
//       />
//       <FlatList
//         data={DATAS}
//         horizontal
//         style={{ marginTop: 40 }}
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item, index }) => {
//           return (
//             <Animated.View style={styles.card}>
//               <Image
//                 source={item.img}
//                 style={{
//                   width: 100,
//                   height: 100,
//                   borderRadius: 60,
//                   position: "relative",
//                   bottom: 15,
//                 }}
//               />
//               <Text
//                 style={{
//                   fontSize: 18,
//                   fontWeight: "bold",
//                   textAlign: "center",
//                   marginBottom: 10,
//                 }}
//               >
//                 {item.name}
//               </Text>
//               <Text
//                 style={{ fontSize: 16, fontWeight: "bold", color: "orangered" }}
//               >
//                 {item.itemNo}
//               </Text>
//             </Animated.View>
//           );
//         }}
//       />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: "relative",
//   },
//   header: {
//     paddingVertical: 15,
//     marginTop: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   h1: {
//     fontSize: 20,
//     fontWeight: "900",
//     marginTop: 10,
//   },
//   searchBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#e3e3e3",
//     borderRadius: 30,
//     marginTop: 10,
//     paddingHorizontal: 10,
//   },
//   name: {
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   input: {
//     marginLeft: 6,
//     height: 40,
//     width: "90%",
//   },
//   card: {
//     width: ITEM_WIDTH,
//     height: ITEM_HEIGHT,
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     elevation: 30,
//     padding: 30,
//     shadowColor: "#ddd",
//     marginRight: SPACING,
//     position: "relative",
//     overflow: "visible",
//   },

//   btn: {
//     backgroundColor: "green",
//     width: 80,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 4,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 6,
//   },
// });

import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");
const API_KEY = "JSutsij81xiwAr_3Y_S_KdcvdeaLzzMWjcdTvlwpSWw";
export default function BarIndicator({ navigation }) {
  const [data, setData] = useState([]);
  const fetchDatafromApi = async () => {
    const response = await fetch(
      `https://api.unsplash.com/photos/?client_id=${API_KEY}`,
      {
        Authorization: API_KEY,
      }
    );
    const results = response.json();
    return results;
  };
  useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchDatafromApi();
      setData(images);
    };
    fetchImages();
  });
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <Image
              source={{ uri: item.urls.raw }}
              style={{ width, height }}
              resizeMode="cover"
            />
          );
        }}
      />
    </View>
  );
}
