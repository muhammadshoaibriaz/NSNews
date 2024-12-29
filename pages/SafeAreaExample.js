import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
export default function SafeAreaExample({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.bottomBtn}>
        <TouchableWithoutFeedback>
          <Animated.View style={styles.btn}>
            <AntDesign name="hearto" size={20} color="#fe3373" />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View style={styles.btn}>
            <FontAwesome name="thumbs-up" size={20} color="#fe3373" />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View style={styles.btn}>
            <FontAwesome name="map-marker" size={20} color="#fe3373" />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View style={styles.btns}>
            <AntDesign name="plus" size={20} color="#fff" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBtn: {
    position: "absolute",
    bottom: 20,
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#fff",
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btns: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#fe3373",
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#fe3373",
  },
});
