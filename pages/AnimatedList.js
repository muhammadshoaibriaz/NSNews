import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Text,
  Image,
  FlatList,
  ImageBackground,
  StatusBar,
} from 'react-native';
const DATA = [
  {
    img: require('../images/img1.jpg'),
    id: 1,
    name: 'Gabriel Inferno',
    rating: 9,
    description:
      '24 hours in the lives of three young men in the French suburbs the day.',
  },
  {
    name: 'The Dark Knight',
    img: require('../images/img3.jpg'),
    id: 2,
    rating: 7.5,
    description:
      'The aging patriarch of an organized crime dynasty in postwar New York City.',
  },
  {
    name: 'Fight Club',
    rating: 8.5,
    description:
      'A bounty hunting scam joins two men in an uneasy alliance against a third. ',
    img: require('../images/img24.jpg'),
    id: 3,
  },
  {
    img: require('../images/img23.jpg'),
    id: 4,
    name: 'Batman Begins',
    rating: 5.8,
    description:
      'A former Roman General sets out to exact vengeance against the corrupt.',
  },
  {
    img: require('../images/img15.jpg'),
    id: 5,
    name: 'The God Father Part 02',
    rating: 4,
    description:
      'Los Angeles citizens with vastly separate lives collide in interweaving stories.',
  },
  {
    img: require('../images/img14.jpg'),
    id: 7,
    name: 'Man Bites Dog',
    rating: 7.8,
    description:
      "A frustrated son tries to determine the fact from fiction in his dying father's life.",
  },
  {
    img: require('../images/img22.jpg'),
    id: 8,
    name: 'The Departed',
    rating: 8.0,
    description:
      'n the deep south during the 1930s, three escaped convicts search for hidden treasure.',
  },
  {
    img: require('../images/img15.jpg'),
    id: 9,
    name: 'Unberto D',
    rating: 8.7,
    description:
      'An elderly man and his dog struggle to survive on his government pension in Rome.',
  },
  {
    img: require('../images/img1.jpg'),
    id: 10,
    name: 'Gabriel Inferno',
    rating: 9,
    description:
      '24 hours in the lives of three young men in the French suburbs the day.',
  },
  {
    name: 'The Dark Knight',
    img: require('../images/img3.jpg'),
    id: 11,
    rating: 7.5,
    description:
      'The aging patriarch of an organized crime dynasty in postwar New York City.',
  },
  {
    name: 'Fight Club',
    rating: 8.5,
    description:
      'A bounty hunting scam joins two men in an uneasy alliance against a third. ',
    img: require('../images/img24.jpg'),
    id: 12,
  },
  {
    img: require('../images/img23.jpg'),
    id: 13,
    name: 'Batman Begins',
    rating: 5.8,
    description:
      'A former Roman General sets out to exact vengeance against the corrupt.',
  },
  {
    img: require('../images/img15.jpg'),
    id: 14,
    name: 'The God Father Part 02',
    rating: 4,
    description:
      'Los Angeles citizens with vastly separate lives collide in interweaving stories.',
  },
  {
    img: require('../images/img.jpg'),
    id: 15,
    name: 'Man Bites Dog',
    rating: 7.8,
    description:
      "A frustrated son tries to determine the fact from fiction in his dying father's life.",
  },
  {
    img: require('../images/img22.jpg'),
    id: 16,
    name: 'The Departed',
    rating: 8.0,
    description:
      'n the deep south during the 1930s, three escaped convicts search for hidden treasure.',
  },
  {
    img: require('../images/img25.jpg'),
    id: 17,
    name: 'Unberto D',
    rating: 8.7,
    description:
      'An elderly man and his dog struggle to survive on his government pension in Rome.',
  },
];
const ITEM_HEIGHT = 100;
const offset = ITEM_HEIGHT + 14;
export default function AnimatedList({navigation}) {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <ImageBackground
      source={require('../images/img25.jpg')}
      style={styles.container}
      blurRadius={160}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <FlatList
        data={DATA}
        style={{marginTop: 20}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item, index}) => {
          const inputRange = [offset * index, offset * index + offset];
          const outputRange1 = [1, 0];
          const outputRange2 = [0, offset - 4];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: outputRange1,
            extrapolate: 'clamp',
          });
          const translateY = scrollY.interpolate({
            inputRange,
            outputRange: outputRange2,
            extrapolate: 'clamp',
          });
          const opacity = scale;
          return (
            <Animated.View
              source={require('../images/img3.jpg')}
              blurRadius={20}
              style={[
                styles.list,
                {
                  transform: [{scale}, {translateY}],
                },
                {opacity},
              ]}>
              <Image
                source={item.img}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={{marginLeft: 10}}>
                <Text style={styles.name}>{item.name}</Text>
                <Text numberOfLines={2} style={styles.description}>
                  {item.description}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    height: ITEM_HEIGHT,
    backgroundColor: '#fff',
    marginTop: 14,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    borderRadius: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 13,
    width: 240,
  },
});
