import AntDesign from 'react-native-vector-icons/AntDesign';

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
export default function OrderPlacement({navigation, route}) {
  const [visible, setVisible] = useState(false);
  const {item} = route.params;
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} style={'dark'} />
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
          alignItems: 'center',
          justifyContent: 'center',
          height: 340,
        }}>
        <Image
          source={item.image}
          style={{width: 200, height: 200}}
          resizeMode="contain"
        />
      </SharedElement>
      <Animatable.View
        style={{
          width,
          height: 420,
          backgroundColor: '#212328',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 20,
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
        delay={1000}
        animation={'slideInUp'}>
        <AntDesign
          name="checkcircle"
          style={{alignSelf: 'center', marginTop: 40}}
          size={60}
          color="#fff"
        />
        <Text
          style={{
            fontSize: 26,
            color: '#fff',
            fontWeight: '800',
            alignSelf: 'center',
            marginTop: 10,
          }}>
          Your Pizze is Ready!
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#999',
            alignSelf: 'center',
            marginTop: 10,
            width: 260,
            lineHeight: 30,
            textAlign: 'center',
          }}>
          Yay.It looks beautiful. You can always check your order in the
          'Orders' section under profile
        </Text>
        <TouchableOpacity
          style={styles.orderBtn}
          onPress={() => {
            navigation.navigate('PracticeFile'), setVisible(!visible);
          }}>
          <Text style={{fontWeight: '900', color: '#fff'}}>
            Tracking Order...
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const customStyle = {
  from: {
    height: 0,
  },
  to: {
    height: 500,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  orderBtn: {
    borderRadius: 40,
    backgroundColor: 'orange',
    height: 45,
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
