import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {SharedElement} from 'react-navigation-shared-element';
const {width, height} = Dimensions.get('screen');

const Rating = () => {
  return (
    <Animatable.View
      animation={'fadeIn'}
      delay={700}
      style={{
        flexDirection: 'row',
        width: 100,
        justifyContent: 'space-between',
      }}>
      <AntDesign name="star" size={12} color={'#fff'} />
      <AntDesign name="star" size={12} color={'#fff'} />
      <AntDesign name="star" size={12} color={'#fff'} />
      <AntDesign name="star" size={12} color={'#fff'} />
      <AntDesign name="staro" size={12} color={'#fff'} />
    </Animatable.View>
  );
};

export default function ProductDetails({navigation, route}) {
  const {item} = route.params;
  const [count, setCount] = useState(1);
  return (
    <View style={[styles.container, {backgroundColor: item.color}]}>
      <StatusBar backgroundColor={'#ff9e6d'} />
      <View
        style={{
          width,
          height: 280,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: 10,
            top: 0,
          }}>
          <AntDesign name="arrowleft" size={20} color="#fff" />
        </TouchableOpacity>
        <SharedElement id={'item' + item.id}>
          <Image
            source={item.image}
            style={styles.animatedImage}
            resizeMode="contain"
          />
        </SharedElement>
      </View>
      <Animatable.Text
        animation={'fadeInLeft'}
        delay={400}
        style={{
          marginLeft: 20,
          fontWeight: 'bold',
          color: '#fff',
          fontSize: 20,
        }}>
        {item.name}
      </Animatable.Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
          paddingHorizontal: 20,
        }}>
        <Animatable.Text
          delay={400}
          animation={'fadeInUp'}
          style={{
            color: '#fff',
            fontSize: 12,
          }}>
          Artificial selection
        </Animatable.Text>
        <Rating />
      </View>
      <Animatable.View animation={'fadeInUp'} delay={700} style={styles.card}>
        <View style={styles.innerCard}>
          <Text style={{fontSize: 16, color: '#111', fontWeight: '700'}}>
            Quantity (300g)
          </Text>
          <View style={styles.quantity}>
            <View style={styles.btn}>
              <TouchableOpacity onPress={() => setCount(count - 1)}>
                <AntDesign name="minus" size={18} />
              </TouchableOpacity>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>{count}</Text>
              <TouchableOpacity onPress={() => setCount(count + 1)}>
                <AntDesign name="plus" size={18} />
              </TouchableOpacity>
            </View>
            <Text style={{fontSize: 18, fontWeight: '700'}}>
              {item.price.slice(0, 5)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={{
                width: 190,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fed59c',
                borderRadius: 40,
              }}>
              <Text style={{fontWeight: 'bold'}}>Add to cart</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="heart" size={22} color="red" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width,
            height: 70,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EmptyCart')}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Fontisto name="shopping-bag-1" size={30} color={'#fff'} />
            <Text style={{fontSize: 16, color: '#fff', marginLeft: 10}}>
              Cart
            </Text>
          </TouchableOpacity>
          <Image
            source={item.image}
            style={{width: 30, height: 30, resizeMode: 'contain'}}
          />
        </View>
      </Animatable.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff9e6d',
  },
  animatedImage: {
    width: 150,
  },
  card: {
    width,
    height: 300,
    backgroundColor: '#222',
    bottom: 0,
    position: 'absolute',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  innerCard: {
    width,
    height: 230,
    backgroundColor: '#fff',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 25,
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 40,
    height: 35,
    width: 130,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
