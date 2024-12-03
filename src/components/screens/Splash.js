import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import logo from '../../../assets/images/logo1.png';
import {IMAGE, TITLE} from '../../../Theme';
import * as Animatable from 'react-native-animatable';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(async () => {
      const user = await AsyncStorage.getItem('token');
      if (user) {
        navigation.replace('Login');
      } else {
        navigation.replace('Form');
      }
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation={'fadeInUp'}
        duration={1000}
        source={logo}
        style={IMAGE}
      />
      <Animatable.Text animation={'fadeInUp'} style={TITLE}>
        Scribblr
      </Animatable.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
