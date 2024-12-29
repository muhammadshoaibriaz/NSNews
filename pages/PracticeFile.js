import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  TextInput,
  FlatList,
  Dimensions,
  ToastAndroid,
  StatusBar,
  ScrollView,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

const CATEGORIES = [
  {
    name: 'All',
    id: 1,
    image: require('../images/plate3.png'),
    price: '$14.5',
  },
  {
    name: 'Most Liked',
    id: 2,
    image: require('../images/plate12.png'),
    price: '$11.9',
  },
  {
    name: 'Favourite',
    id: 3,
    image: require('../images/plate14.png'),
    price: '$14.5',
  },
  {
    name: 'Premium',
    id: 4,
    image: require('../images/plate3.png'),
    price: '$13.9',
  },
  {
    name: 'Spicy',
    id: 5,
    image: require('../images/plate12.png'),
    price: '$19.5',
  },
];

const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = ITEM_WIDTH * 1.35;
const SPACING = 10;

export default function PracticeFile({navigation}) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [active, setActive] = useState(0);
  const onPress = index => {
    setActive(index);
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent={true} style={'light'} />
      <Animated.View style={[styles.container]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => navigation.openDrawer()}>
            <FontAwesome name="align-left" size={20} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => ToastAndroid.show('No messages yet!', 3000)}
            style={styles.headerBtn}>
            <FontAwesome name="bell-o" size={20} color="#999" />
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: 'bold',
              color: '#999',
              marginTop: 10,
            }}>
            Make Your
          </Text>
          <Text
            style={{
              fontSize: 26,
              fontWeight: 'bold',
              color: '#999',
            }}>
            Own Pizza Now
          </Text>
          <View style={styles.inputValue}>
            <TextInput
              placeholder="What are you looking for?"
              style={styles.input}
              placeholderTextColor="#444"
              cursorColor={'#444'}
            />
            <AntDesign name="search1" size={20} color="#444" />
          </View>
        </View>
        <FlatList
          data={CATEGORIES}
          horizontal
          style={{
            marginTop: 10,
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => onPress(index)}
                style={{
                  paddingHorizontal: 20,
                  backgroundColor: active == index ? '#222' : 'transparent',
                  height: 30,
                  borderRadius: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: active == index ? '#999' : '#444',
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <Animated.FlatList
          data={CATEGORIES}
          horizontal
          scrollEventThrottle={32}
          decelerationRate="fast"
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}
          contentContainerStyle={{
            paddingHorizontal: 24,
          }}
          snapToInterval={ITEM_WIDTH + SPACING * 2}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            const rotate = scrollX.interpolate({
              inputRange: [
                (index - 1) * ITEM_WIDTH,
                index * ITEM_WIDTH,
                (index + 1) * ITEM_WIDTH,
              ],
              outputRange: ['75deg', '0deg', '75deg'],
            });
            return (
              <Animated.View style={[styles.imageCard]}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    navigation.navigate('DetailScreen', {item});
                  }}
                  style={{
                    overflow: 'visible',
                    height: '100%',
                  }}>
                  <SharedElement id={'image' + item.id}>
                    <Animated.Image
                      source={item.image}
                      style={[styles.image, {transform: [{rotate}]}]}
                    />
                  </SharedElement>
                  <TouchableOpacity style={{margin: 5}}>
                    <AntDesign name="hearto" size={18} />
                  </TouchableOpacity>
                  <View style={{marginTop: 150, marginLeft: 10}}>
                    <Text style={{marginTop: 10, opacity: 0.3}}>.VEG</Text>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: '#666',
                      }}>
                      Dynamic Philly Cheese Steak Pizza
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#999',
            marginHorizontal: 20,
            marginVertical: 10,
          }}>
          Hot Deals Today
        </Text>
        <Text style={{marginHorizontal: 20, color: '#999', marginBottom: 30}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          aliquam ipsa qui, repellat dolor cupiditate praesentium. Earum quo
          vero facilis dolore quasi fugiat nisi voluptate saepe eveniet
          eligendi! Natus, provident.
        </Text>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#212228',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginHorizontal: 20,
  },
  inputValue: {
    borderRadius: 40,
    backgroundColor: '#111a',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 45,
    paddingHorizontal: 20,
  },
  input: {
    color: '#999',
    width: '95%',
  },
  imageCard: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 10,
    marginRight: SPACING * 2,
    backgroundColor: '#eeea',
    padding: SPACING,
    marginTop: 30,
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    position: 'absolute',
    top: -40,
    right: '-10%',
  },
});
