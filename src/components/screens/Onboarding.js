import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Animated,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import {font} from '../constants/font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('screen');

const Indicator = ({scrollX, data}) => {
  return (
    <View style={styles.pagination}>
      {data.map((_, index) => {
        const scale = scrollX.interpolate({
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: [1, 3, 1],
          extrapolate: 'clamp',
        });

        const backgroundColor = scrollX.interpolate({
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: ['#ddd', '#a1614b', '#ddd'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {transform: [{scaleX: scale}], backgroundColor},
            ]}
          />
        );
      })}
    </View>
  );
};

export default function Onboarding() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const DATA = [
    {
      img: require('../../../assets/images/onboarding1.png'),
      title: 'Read interesting articles every single day!',
      description:
        'Explore a wide variety of engaging content and stay updated with new articles daily.',
    },
    {
      img: require('../../../assets/images/onboarding4.png'),
      title: 'Create and publish your own article to the world!',
      description:
        'Share your thoughts and ideas with a global audience by writing and publishing your articles.',
    },
    {
      img: require('../../../assets/images/onboarding5.png'),
      title: "Let's connect with others right now!",
      description:
        'Join a vibrant community and build meaningful connections with people worldwide.',
    },
  ];

  const onFinish = async () => {
    await AsyncStorage.setItem('firstTime', 'I come first time');
    navigation.replace('Form');
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={DATA}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item}) => (
          <View style={styles.itemCard}>
            <Image source={item.img} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.skipButton]}
          onPress={onFinish}>
          <Text style={[styles.buttonText, styles.skipButtonText]}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onFinish}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      </View>
      <Indicator data={DATA} scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 70,
  },
  itemCard: {
    width,
    height,
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: font.sm_bold,
    marginTop: 20,
  },
  description: {
    textAlign: 'center',
    fontSize: 17,
    fontFamily: font.regular,
    marginTop: 30,
  },
  pagination: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    position: 'absolute',
    bottom: 120,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#ddd',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    bottom: 40,
  },
  button: {
    width: '47%',
    height: 50,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a1614b',
  },
  skipButton: {
    backgroundColor: '#eee',
  },
  buttonText: {
    color: '#fff',
    fontFamily: font.sm_bold,
  },
  skipButtonText: {
    color: '#a1614b',
    fontFamily: font.sm_bold,
  },
});
