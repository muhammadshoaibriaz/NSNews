import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {font} from '../constants/font';

export default function ContinueWith({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/login.png')}
        style={styles.image}
      />
      <Text
        style={styles.headerText}
        onPress={() => navigation.navigate('Interest')}>
        Let's you in
      </Text>
      <TouchableOpacity style={styles.touchableBtn}>
        <View style={styles.btn}>
          <FontAwesome name="google" size={24} />
          <Text style={styles.text}>Continue with Google</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.touchableBtn}>
        <View style={styles.btn}>
          <FontAwesome name="facebook-official" size={24} />
          <Text style={styles.text}>Continue with Facebook</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.touchableBtn}>
        <View style={styles.btn}>
          <FontAwesome name="apple" size={24} />
          <Text style={styles.text}>Continue with Apple</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={[styles.touchableBtn, styles.signInButton]}>
        <Text style={[styles.text, styles.signInText]}>
          Sign in with password
        </Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text
          style={styles.signUpText}
          onPress={() => navigation.navigate('Signup')}>
          Sign up
        </Text>
      </Text>
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
  image: {
    width: 300,
    height: 300,
  },
  headerText: {
    fontFamily: font.medium,
    fontSize: 28,
    marginBottom: 30,
  },
  touchableBtn: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 30,
    width: 280,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: font.medium,
    marginLeft: 10,
  },
  orText: {
    marginBottom: 20,
    marginTop: 10,
    fontFamily: font.medium,
  },
  signInButton: {
    backgroundColor: '#a1614b',
  },
  signInText: {
    color: '#fff',
  },
  footerText: {
    fontFamily: font.medium,
  },
  signUpText: {
    color: 'chocolate',
  },
});
