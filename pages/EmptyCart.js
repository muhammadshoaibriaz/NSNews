import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
export default function EmptyCart({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign name="arrowleft" size={20} />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          color: "#d1d1d1",
        }}
      >
        Your cart is empty!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    width: "100%",
  },
});
