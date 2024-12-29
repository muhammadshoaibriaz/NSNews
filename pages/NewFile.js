import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
  RefreshControl,
} from "react-native";
const { width, height } = Dimensions.get("screen");
const DATA = new Array(20).fill();
export default function NewFile({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  return (
    <View style={[styles.container]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            title="Refreshing"
            onRefresh={() => {
              setRefreshing(!refreshing),
                setTimeout(() => {
                  setRefreshing(false);
                }, 4000);
            }}
          ></RefreshControl>
        }
      >
        {DATA.map((item, index) => {
          return (
            <View key={index} style={styles.list}>
              <Text>{index}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    backgroundColor: "gold",
    height: 80,
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 5,
  },
  btn: {
    backgroundColor: "#ddd",
    margin: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 4,
  },
});
