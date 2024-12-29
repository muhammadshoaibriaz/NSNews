import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Image, Animated, TouchableOpacity} from 'react-native';
import {StyleSheet, View, FlatList, Text} from 'react-native';

const {width, height} = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = ITEM_WIDTH * 1.4;
// const API_KEY = "JSutsij81xiwAr_3Y_S_KdcvdeaLzzMWjcdTvlwpSWw";

const IMAGES = [
  {
    id: 1,
    img: require('../images/img24.jpg'),
    name: 'Kendra lust',
  },
  {
    id: 2,
    img: require('../images/img1.jpg'),
    name: 'Kendra Sunderland',
  },
  {
    id: 3,
    img: require('../images/img3.jpg'),
    name: 'Lili Jordan',
  },
  {
    id: 4,
    img: require('../images/img14.jpg'),
    name: 'Mia Martina',
  },
  {
    id: 5,
    img: require('../images/img15.jpg'),
    name: 'Katti Kush',
  },
];

export default function AnimatedFlatList({navigation}) {
  // const [images, setImages] = useState([]);
  // const fetchImagesFromApi = async () => {
  //   const data = await fetch(
  //     `https://api.unsplash.com/photos/?client_id=${API_KEY}`,
  //     {
  //       headers: {
  //         Authorization: API_KEY,
  //       },
  //     }
  //   );
  //   const results = await data.json();
  //   return results;
  // };
  // useEffect(() => {
  //   const fetchImage = async () => {
  //     const img = await fetchImagesFromApi();
  //     setImages(img);
  //     console.log(img);
  //   };
  //   fetchImage();
  // }, []);
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFillObject}>
        {IMAGES.map((item, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              key={`image-${index}`}
              source={item.img}
              blurRadius={20}
              style={[StyleSheet.absoluteFillObject, {opacity, width, height}]}
              resizeMode="cover"
            />
          );
        })}
      </View>
      <FlatList
        data={IMAGES}
        horizontal
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width,
                height,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate('DetailScreen')}>
                <Animated.Image
                  source={item.img}
                  style={{
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    resizeMode: 'cover',
                    borderRadius: 10,
                    shadowColor: 'red',
                    shadowOpacity: 1,
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowRadius: 20,
                  }}
                />
              </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
