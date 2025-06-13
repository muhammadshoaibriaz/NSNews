import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {Input, CheckBox} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {font} from '../constants/font';

export default function Signup() {
  const navigation = useNavigation();

  // State variables
  const [checked, setChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure1, setSecure1] = useState(true); // Toggle for password visibility
  const [secure2, setSecure2] = useState(true); // Toggle for confirm password visibility

  // Input references
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  // Input handlers
  const handleUserName = username => setUsername(username);
  const handleEmail = email => setEmail(email);
  const handlePassword = password => setPassword(password);
  const handleConfirmPassword = confirmPassword =>
    setConfirmPassword(confirmPassword);

  // Form submission
  const submitForm = async () => {
    if (username.trim().length < 10) {
      ToastAndroid.show(
        'Username must be at least 10 characters long!',
        ToastAndroid.LONG,
      );
      return;
    }
    if (!password || !confirmPassword) {
      ToastAndroid.show('Please fill in all fields!', ToastAndroid.LONG);
      return;
    }
    if (password !== confirmPassword) {
      ToastAndroid.show('Passwords do not match!', ToastAndroid.LONG);
      return;
    }
    if (!email.trim().includes('@')) {
      ToastAndroid.show('Invalid email address!', ToastAndroid.LONG);
      return;
    } else {
      navigation.navigate('Profile', {username, email, password});
    }
  };

  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.headerTitle}>Create an account 🔏</Text>
      <Text style={styles.headerSubtitle}>
        Enter your username, email, and password. If you forget it, you'll need
        to reset it.
      </Text>

      {/* Username Input */}
      <View style={styles.inputWrapper}>
        <Text style={styles.title}>Username</Text>
        <Input
          ref={usernameRef}
          value={username}
          onChangeText={handleUserName}
          placeholder="Username"
          style={styles.input}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputWrapper}>
        <Text style={styles.title}>Email</Text>
        <Input
          ref={emailRef}
          value={email}
          onChangeText={handleEmail}
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputWrapper}>
        <Text style={styles.title}>Password</Text>
        <Input
          ref={passwordRef}
          value={password}
          onChangeText={handlePassword}
          placeholder="Password"
          secureTextEntry={secure1}
          rightIcon={
            <FontAwesome
              name={secure1 ? 'eye-slash' : 'eye'}
              onPress={() => setSecure1(!secure1)}
              size={20}
              color="#a1614b"
            />
          }
          style={styles.input}
        />
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputWrapper}>
        <Text style={styles.title}>Confirm Password</Text>
        <Input
          ref={confirmPasswordRef}
          value={confirmPassword}
          onChangeText={handleConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry={secure2}
          rightIcon={
            <FontAwesome
              name={secure2 ? 'eye-slash' : 'eye'}
              onPress={() => setSecure2(!secure2)}
              size={20}
              color="#a1614b"
            />
          }
          style={styles.input}
        />
      </View>

      {/* Checkbox */}
      <CheckBox
        title="Remember me"
        checked={checked}
        onPress={() => setChecked(!checked)}
        containerStyle={styles.checkboxContainer}
        checkedColor="#a1614b"
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
        <Text style={styles.submitButtonText}>Continue</Text>
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
  contentContainer: {
    flexGrow: 1,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 10,
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: font.sm_bold,
    fontSize: 24,
    marginBottom: 10,
  },
  headerSubtitle: {
    fontFamily: font.regular,
    fontSize: 16,
    marginBottom: 20,
  },
  inputWrapper: {
    marginTop: 10,
  },
  title: {
    fontFamily: font.sm_bold,
    marginBottom: 5,
  },
  input: {
    fontFamily: font.regular,
    fontSize: 15,
  },
  checkboxContainer: {
    marginTop: 10,
    padding: 0,
    marginLeft: 0,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#a1614b',
    borderRadius: 6,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    width: '100%',
  },
  submitButtonText: {
    fontFamily: font.sm_bold,
    color: '#fff',
  },
});
