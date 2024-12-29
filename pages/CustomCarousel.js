import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
const IMAGES = [
  {img: require('../images/img1.jpg')},
  // { img: require("../images/img2.jpg") },
  {img: require('../images/img3.jpg')},
  {img: require('../images/img8.jpg')},
  {img: require('../images/img15.jpg')},
  {img: require('../images/img25.jpg')},
  {img: require('../images/img24.jpg')},
  {img: require('../images/img14.jpg')},
];

const ITEM_HEIGHT = height * 0.7;
const DOT_SIZE = 8;
const Indicator = ({scrollY}) => {
  var translateY;
  return (
    <View style={styles.pagination}>
      {IMAGES.map(({item, index}) => {
        translateY = scrollY.interpolate({
          inputRange: [0, ITEM_HEIGHT],
          outputRange: [0, DOT_SIZE * 2],
        });
        return <Animated.View key={item} style={styles.dot}></Animated.View>;
      })}
      <Animated.View
        style={{
          width: DOT_SIZE * 2,
          height: DOT_SIZE * 2,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#fe3373',
          position: 'absolute',
          left: -DOT_SIZE / 2,
          top: DOT_SIZE / 2,
          transform: [{translateY}],
        }}></Animated.View>
    </View>
  );
};

export default function CustomCarousel({navigation}) {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <View
        style={{
          width,
          height: ITEM_HEIGHT,
          overflow: 'hidden',
          position: 'relative',
        }}>
        <FlatList
          data={IMAGES}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          renderItem={({item, index}) => {
            // const inputRange = [
            //   (index - 1) * width,
            //   index * width,
            //   (index + 1) * width,
            // ];
            // const translateY = scrollX.interpolate({
            //   inputRange,
            //   outputRange: [-width * 0.3, 0, width * 0.3],
            // });
            return (
              <Animated.Image
                source={item.img}
                style={{
                  width,
                  height: ITEM_HEIGHT,
                  // transform: [{ translateY }],
                }}
                resizeMode="cover"
              />
            );
          }}
        />
        <Indicator scrollY={scrollY} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagination: {
    position: 'absolute',
    left: 20,
    top: '50%',
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    backgroundColor: '#fff',
    marginTop: DOT_SIZE,
    borderRadius: DOT_SIZE,
  },
});
