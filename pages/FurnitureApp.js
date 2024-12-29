import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Animated,
  StatusBar,
  TouchableHighlight,
  Image,
  FlatList,
  Dimensions,
  ToastAndroid,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {SharedElement} from 'react-navigation-shared-element';
const {width, height} = Dimensions.get('screen');

const Rating = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: 100,
        justifyContent: 'space-between',
        marginBottom: 30,
      }}>
      <AntDesign name="star" size={14} color={'#fff'} />
      <AntDesign name="star" size={14} color={'#fff'} />
      <AntDesign name="star" size={14} color={'#fff'} />
      <AntDesign name="star" size={14} color={'#fff'} />
      <AntDesign name="staro" size={14} color={'#fff'} />
    </View>
  );
};

const DATA = [
  {
    id: 1,
    image: require('../images/beverage.png'),
    name: 'Cheetos Party Size',
    price: '$2.99 / 100g',
    color: '#ff9e6d',
  },
  {
    id: 2,
    image: require('../images/food.png'),
    name: 'Gyoza Snacks',
    price: '$4.99 / 400g',
    color: '#ff9e6d',
  },
  {
    id: 3,
    image: require('../images/strawberry.png'),
    name: 'Valkers tasty lado',
    price: '$3.99 / 100g',
    color: '#ff9e6d',
  },
];

export default function FurnitureApp({navigation}) {
  const scrollX = useRef(new Animated.Value(0)).current;
  var scale;
  const [focus, setFocus] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const animate = Animated.event();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#fff'} translucent={false} />
      <View style={styles.header}>
        <TouchableHighlight
          underlayColor={'#fed59c'}
          activeOpacity={0.4}
          onPress={() => navigation.openDrawer()}
          style={styles.btn}>
          <FontAwesome5 name="align-left" size={16} />
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={'#fed59c'}
          activeOpacity={0.4}
          onPress={() => navigation.navigate('EmptyCart')}
          style={styles.btn}>
          <FontAwesome name="shopping-basket" size={16} />
        </TouchableHighlight>
      </View>
      <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
        <Text style={{fontSize: 16}}>Hi, Helen</Text>
        <Text style={{fontWeight: '900', marginTop: 10}}>
          What's today's is taste? 😋
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <View
          style={{
            width: '40%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                backgroundColor: '#fed59c',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../images/vecteezy_3d-social-media-online-platform-concept-online-social_9315270_336.png')}
                resizeMode="contain"
                style={{width: 30, height: 30}}
              />
            </View>
            <Text style={{fontSize: 12, marginTop: 5, fontWeight: '700'}}>
              Dried fruit
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                backgroundColor: '#ddd',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../images/vecteezy_white-clipboard-task-management-todo-check-list-efficient_8879451_413.png')}
                resizeMode="contain"
                style={{width: 20, height: 20}}
              />
            </View>
            <Text style={{fontSize: 12, marginTop: 5, fontWeight: '700'}}>
              Nuts
            </Text>
          </View>
        </View>
        <Animated.View
          style={{
            width: focus ? 40 : '50%',
            height: 40,
            backgroundColor: '#eee',
            flexDirection: 'row',
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
          }}>
          <TextInput
            placeholder="Search..."
            secureTextEntry
            style={{
              flex: 1,
              height: '100%',
              fontSize: 14,
              paddingLeft: 5,
            }}></TextInput>
          <TouchableOpacity
            onPress={() => setFocus(!focus)}
            style={{padding: 10, borderRadius: 5}}>
            <AntDesign name="search1" size={20} />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <FlatList
        data={DATA}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('ProductDetails', {item})}
              style={{
                width,
                height: 400,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Animated.View
                key={index}
                style={[styles.content, {backgroundColor: item.color}]}>
                <View
                  style={{
                    width: 100,
                    height: 100,
                    left: -30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <SharedElement id={'item' + item.id}>
                    <Image
                      source={item.image}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </SharedElement>
                </View>
                <View style={{right: 30}}>
                  <Text
                    style={{
                      fontWeight: '900',
                      fontSize: 16,
                      color: '#fff',
                      marginBottom: 10,
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '900',
                      fontSize: 12,
                      color: '#fff',
                      marginBottom: 15,
                    }}>
                    {item.price}
                  </Text>
                  <Rating />
                  <TouchableOpacity
                    onPress={() =>
                      ToastAndroid.show('Product added to cart', 3000)
                    }
                    style={{
                      width: 120,
                      height: 30,
                      borderRadius: 40,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      elevation: 2,
                    }}>
                    <AntDesign name="shoppingcart" />
                    <Text>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#fff',
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    right: -20,
                  }}>
                  <AntDesign name="heart" size={20} color="red" />
                </TouchableOpacity>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
      <View style={styles.pagination}>
        {DATA.map(
          (item, index) => (
            (scale = scrollX.interpolate({
              inputRange: [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ],
              outputRange: [1, 1.7, 1],
              extrapolate: 'clamp',
            })),
            (
              <View style={styles.item} key={index}>
                <Animated.Image
                  source={item.image}
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    transform: [{scale}],
                  }}
                />
              </View>
            )
          ),
        )}
        <View style={styles.item}>
          <AntDesign name="plus" size={20} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  btn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    width: 280,
    height: 280,
    borderRadius: 150,
    backgroundColor: '#ff9e6d',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'space-between',
    overflow: 'visible',
  },
  pagination: {
    width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  item: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    borderRadius: 50,
  },
});
