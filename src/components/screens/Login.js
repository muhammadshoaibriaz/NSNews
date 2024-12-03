import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
// import {Checkbox} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {font} from '../constants/font';

export default function Login({navigation}) {
  // State Variables
  const [checked, setChecked] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [visible, setVisible] = useState(false);

  // Handle TextInput for Email
  const handleEmailInput = value => setUserEmail(value);

  // Handle TextInput for Password
  const handlePasswordInput = value => setUserPassword(value);

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
          value={userEmail}
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
          value={userPassword}
          placeholder="Password"
          placeholderTextColor="#888"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={handlePasswordInput}
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
        style={styles.signInButton}
        onPress={() => {
          navigation.replace('TabNavigation');
        }}>
        <Text style={[styles.text, styles.signInButtonText]}>Sign In</Text>
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
    borderRadius: 30,
    width: '100%',
    alignSelf: 'center',
    marginTop: 90,
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
