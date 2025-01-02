import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {font} from '../constants/font';
import axios from 'axios';
import {baseUrl} from '../../db/IP';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setLogin} from '../redux/slices/loginSlice';
import {ActivityIndicator} from 'react-native-paper';
export default function Login({navigation}) {
  // State Variables
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle TextInput for Email
  const handleEmailInput = value => setEmail(value);

  // Handle TextInput for Password
  const handlePasswordInput = value => setPassword(value);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const results = await axios.post(`${baseUrl}/api/login`, {
        email,
        password,
      });

      const data = results.data;
      if (results.status === 200) {
        await AsyncStorage.setItem('token', data?.token);
        // console.log('token is', data.token);
        dispatch(setLogin(data));
        navigation.navigate('TabNavigation', {data});
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200
        const {status, data} = error.response;

        if (status === 401) {
          // Assuming 401 indicates invalid credentials
          Alert.alert('Error', 'Invalid Email or Password');
        } else if (status === 400) {
          // Additional case for specific bad request messages
          Alert.alert('Error', data.message || 'Bad Request');
        } else {
          // Other errors
          Alert.alert('Error', 'Something went wrong. Please try again.');
        }
      } else {
        // Network or other errors
        Alert.alert(
          'Error',
          'Unable to connect. Please check your internet connection.',
        );
      }

      console.log('Error logging in:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={22} />
      </TouchableOpacity>

      {/* Welcome Text */}
      <Text
        style={styles.heading}
        onPress={() => alert('Why don’t you know my name? 😡')}>
        Hello there 👋
      </Text>
      <Text style={styles.subHeading}>
        Please enter your username/email and password to sign in.
      </Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username / Email</Text>
        <TextInput
          value={email}
          placeholder="johndoe@gmail.com"
          placeholderTextColor="#888"
          style={styles.input}
          onChangeText={handleEmailInput}
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          placeholderTextColor="#888"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={handlePasswordInput}
          placeholder="••••••••"
        />
      </View>

      {/* Remember Me Checkbox */}
      <CheckBox
        title="Remember me"
        checked={checked}
        onPress={() => setChecked(!checked)}
        containerStyle={styles.checkboxContainer}
        checkedColor="#a1614b"
      />

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <Text style={[styles.text, styles.forgotPasswordText]}>
          Forgot Password
        </Text>
      </TouchableOpacity>

      {/* Continue with Social Media */}
      <Text style={[styles.text, styles.continueText]}>or continue with</Text>
      <View style={styles.socialMediaContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook-official" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="apple" size={24} />
        </TouchableOpacity>
      </View>

      {/* Sign In Button */}
      <TouchableOpacity
        disabled={loading ? true : false}
        style={styles.signInButton}
        onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator size={20} color={'#fff'} />
        ) : (
          <Text style={[styles.text, styles.signInButtonText]}>Sign In</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
  },
  backButton: {
    width: 30,
    height: 30,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    marginBottom: 20,
    marginTop: 30,
    fontFamily: font.sm_bold,
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 30,
    opacity: 0.7,
    fontFamily: font.medium,
  },
  inputContainer: {
    marginTop: 10,
  },
  label: {
    fontFamily: font.sm_bold,
  },
  input: {
    height: 50,
    fontSize: 16,
    borderBottomColor: '#a1614b',
    borderBottomWidth: 1,
    fontFamily: font.medium,
  },
  checkboxContainer: {
    padding: 0,
    backgroundColor: 'white',
    borderColor: '#fff',
    width: '100%',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#a1614b',
    alignSelf: 'center',
    marginTop: 20,
  },
  continueText: {
    alignSelf: 'center',
    marginTop: 20,
    fontFamily: font.regular,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 30,
    width: 80,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  signInButton: {
    backgroundColor: '#a1614b',
    borderRadius: 6,
    width: '100%',
    alignSelf: 'center',
    marginTop: 60,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#fff',
    fontFamily: font.sm_bold,
  },
  text: {
    fontWeight: '600',
    fontFamily: font.medium,
  },
});
