import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ToastAndroid,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {IP_ADDRESS} from '../../db/IP';
import {font} from '../constants/font';

export default function Profile({route}) {
  const {username, email, password} = route.params;

  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const navigation = useNavigation();

  const handleFieldChange = setter => value => setter(value);

  const pickImage = async () => {
    const response = await launchImageLibrary({mediaType: 'photo', quality: 1});
    if (response && response.assets) {
      setImage(response.assets[0].uri);
    }
  };

  const onSubmit = async () => {
    if (
      !username.trim() ||
      !phone.trim() ||
      !gender.trim() ||
      !dateOfBirth.trim()
    ) {
      ToastAndroid.show('Please fill all fields', ToastAndroid.LONG);
      return;
    } else {
      navigation.navigate('Interest');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} />
      </TouchableOpacity>

      <Text style={styles.title}>Complete your profile 🗓</Text>
      <Text style={styles.subtitle}>
        Don't worry, only you can see your personal details.
      </Text>

      {/* Profile Image */}
      <View style={styles.imageContainer}>
        {image ? (
          <Image
            style={styles.profileImage}
            resizeMode="contain"
            source={{uri: image}}
          />
        ) : (
          <FontAwesome
            name="user-circle"
            size={110}
            style={styles.defaultImage}
          />
        )}
        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
          <FontAwesome name="image" size={13} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <InputField label="Full Name" placeholder="Full Name" />
      <InputField
        label="Phone Number"
        placeholder="Phone Number"
        value={phone}
        onChangeText={handleFieldChange(setPhone)}
        keyboardType="phone-pad"
      />
      <InputField
        label="Gender"
        placeholder="Gender"
        value={gender}
        onChangeText={handleFieldChange(setGender)}
      />
      <InputField
        label="Date of Birth"
        placeholder="MM/DD/YYYY"
        value={dateOfBirth}
        onChangeText={handleFieldChange(setDateOfBirth)}
        keyboardType="decimal-pad"
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
}) => (
  <View style={styles.inputFieldContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#888"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 40,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  title: {
    // fontFamily: font.medium,
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    // fontFamily: font.medium,
  },
  imageContainer: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    marginTop: 20,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  defaultImage: {
    opacity: 0.1,
  },
  imagePickerButton: {
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#a1614b',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#eee',
  },
  inputFieldContainer: {
    marginTop: 10,
  },
  inputLabel: {
    // fontFamily: font.medium,
  },
  input: {
    // fontFamily: 'MontserratMedium',
    height: 45,
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#a1614b',
  },
  submitButton: {
    marginTop: 30,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a1614b',
    borderRadius: 30,
  },
  submitButtonText: {
    color: '#fff',
    // fontFamily: font.sm_bold,
    fontSize: 16,
  },
});
