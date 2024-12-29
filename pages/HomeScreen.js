import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, Animated, TouchableOpacity } from "react-native";
import { StyleSheet, View, FlatList, Text } from "react-native";

const { width, height } = Dimensions.get("screen");
export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("AnimatedFlatlist")}>
        <Text style={styles.touchableBtn}>👉 Go to AnimatedFlatlist</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("AnimatedHeader")}>
        <Text style={styles.touchableBtn}>👉 Go to AnimatedHeader</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SafeAreaExample")}>
        <Text style={styles.touchableBtn}>👉 Go to SafeAreaExample</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ParallaxCarousel")}>
        <Text style={styles.touchableBtn}>👉 Go to ParallaxCarousel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("AnimatedList")}>
        <Text style={styles.touchableBtn}>👉 Go to AnimatedList</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ImageGallery")}>
        <Text style={styles.touchableBtn}>👉 Go to ImageGallery</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("DotIndicator")}>
        <Text style={styles.touchableBtn}>👉 Go to DotIndicator</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("BarIndicator")}>
        <Text style={styles.touchableBtn}>👉 Go to BarIndicator</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("CustomCarousel")}>
        <Text style={styles.touchableBtn}>👉 Go to CustomCarousel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("DetailScreen")}>
        <Text style={styles.touchableBtn}>👉 Go to DetailScreen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("PracticeFile")}>
        <Text style={styles.touchableBtn}>👉 Go to PracticeFile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("FurnitureApp")}>
        <Text style={styles.touchableBtn}>👉 Go to FurnitureApp</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("NewFile")}>
        <Text style={styles.touchableBtn}>👉 Go to NewFile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  touchableBtn: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
});
