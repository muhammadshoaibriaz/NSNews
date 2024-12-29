import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {BottomSheet} from 'react-native-elements';

const Rating = ({style, marginTop}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 100,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginLeft: 20,
          marginTop: marginTop,
        }}>
        <AntDesign name="star" size={16} color="#ff9100" />
        <AntDesign name="star" size={16} color="#ff9100" />
        <AntDesign name="star" size={16} color="#ff9100" />
        <AntDesign name="star" size={16} color="#ff9100" />
        <AntDesign name="staro" size={16} color="#ff9100" />
      </View>
      <Text
        style={{position: 'relative', top: 5, fontSize: 15, marginLeft: 10}}>
        <Text style={{fontWeight: 'bold', color: '#ff9100'}}>4.0</Text> (40)
      </Text>
    </View>
  );
};

import {SharedElement} from 'react-navigation-shared-element';
const {width, height} = Dimensions.get('screen');
export default function DetailScreen({navigation, route}) {
  const {item} = route.params;
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: 30,
          left: 20,
          zIndex: 1,
        }}>
        <AntDesign name="arrowleft" size={20} />
      </TouchableOpacity>
      <SharedElement
        id={'image' + item.id}
        style={{
          width,
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          height: 250,
        }}>
        <Animated.Image
          source={item.image}
          style={{
            width: 300,
            height: 300,
            borderRadius: 200,
            right: -70,
            bottom: 30,
            shadowColor: 'red',
            shadowOpacity: 1,
            shadowOffset: {
              width: 3,
              height: 3,
            },
            shadowRadius: 10,
          }}
          resizeMode="cover"
        />
      </SharedElement>
      <Animatable.Text
        animation={'fadeInRight'}
        duration={1000}
        delay={1000}
        style={{
          bottom: 100,
          left: 20,
          fontSize: 24,
          fontWeight: 'bold',
        }}>
        {item.price}
      </Animatable.Text>
      <Animatable.View animation={'fadeInUp'} delay={900} style={{flex: 1}}>
        <Text style={{marginHorizontal: 20, fontSize: 30, fontWeight: '900'}}>
          Chicken Legend Ranch & Jalapeno Pizza
        </Text>
        <Rating marginTop={10} />
        <View style={{marginHorizontal: 20, marginTop: 30}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 200,
            }}>
            <Text style={{fontWeight: 'bold', color: '#999'}}>
              Grilled Chicken
            </Text>
            <Text style={{fontWeight: 'bold', color: '#999'}}>Jalapenos</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 200,
              marginTop: 10,
            }}>
            <Text style={{fontWeight: 'bold', color: '#999'}}>Onions</Text>
            <Text style={{fontWeight: 'bold', color: '#999'}}>Origano</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 200,
              marginTop: 10,
            }}>
            <Text style={{fontWeight: 'bold', color: '#999'}}>Mozrella</Text>
            <Text style={{fontWeight: 'bold', color: '#999'}}>
              Ranch Cheese
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 200,
              marginTop: 10,
            }}>
            <Text style={{fontWeight: 'bold', color: '#999'}}>
              American Cheese
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#999',
            marginHorizontal: 20,
            marginTop: 30,
          }}>
          Combination of Mozrella, fata cheese, American cheese and rich creamy
          cheese
        </Text>
      </Animatable.View>
      <Animatable.View
        animation={'fadeInUp'}
        delay={1100}
        style={styles.bottomCard}>
        <View style={{padding: 20}}>
          <Text style={{fontWeight: 'bold'}}>
            <FontAwesome name="american-sign-language-interpreting" /> 20% off
            on orders above $20
          </Text>
          <Text style={{fontWeight: 'bold', color: '#999', marginTop: 5}}>
            Use coupon code : HUNGRYCURLS
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          activeOpacity={0.5}
          style={styles.addBtn}>
          <AntDesign name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </Animatable.View>
      <BottomSheet
        containerStyle={{
          backgroundColor: 'transparent',
        }}
        modalProps={{
          onDismiss: () => {
            setVisible(visible);
          },
          animationType: 'slide',
        }}
        isVisible={visible}>
        <View
          style={{
            width,
            height: 220,
            backgroundColor: '#212328',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomColor: '#333',
              borderBottomWidth: 1,
              paddingVertical: 20,
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '900',
                color: '#efefef',
              }}>
              1 item added
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '900',
                color: '#efefef',
              }}>
              $19.45
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome name="map-marker" color={'#666'} />
              <Text style={{fontSize: 14, color: '#666', marginLeft: 5}}>
                27 Main Road, HSR Layout
              </Text>
            </View>
            {/* <Image
              source={require('../images/gpay.png')}
              resizeMode="contain"
              style={{width: 40, height: 30}}
            /> */}
          </View>
          <TouchableOpacity
            style={styles.orderBtn}
            onPress={() => {
              navigation.navigate('OrderPlacement', {item}),
                setVisible(!visible);
            }}>
            <Text style={{fontWeight: '900'}}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomCard: {
    width,
    paddingHorizontal: 20,
    paddingVertical: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#f4f4f4',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff9100',
    borderRadius: 8,
  },
  orderBtn: {
    borderRadius: 40,
    backgroundColor: '#eee',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
