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
import {launchImageLibrary} from 'react-native-image-picker';
import {font} from '../constants/font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {uploadImageToCloudinary} from '../../db/cloudinary';

export default function Profile({route, navigation}) {
  const {username} = route.params;
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [image, setImage] = useState('');
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [articles, setArticles] = useState([]);

  const handleFieldChange = setter => value => setter(value);

  const pickImage = async () => {
    const response = await launchImageLibrary({mediaType: 'photo', quality: 1});
    if (response && response.assets) {
      setImage(response.assets[0].uri);
    }
  };

  // const userData = {};

  const onSubmit = async () => {
    try {
      let avatarUrl = null;
      if (image) {
        avatarUrl = await uploadImageToCloudinary(image);
        console.log('Avatar URL:', avatarUrl);
      }
      if (!phone.trim() || !gender.trim() || !dateOfBirth.trim()) {
        ToastAndroid.show('Please fill all fields', ToastAndroid.LONG);
        return;
      } else {
        await AsyncStorage.setItem('user', `${username}`);
        navigation.navigate('Interest', {
          ...route?.params,
          image: avatarUrl,
          followers,
          following,
          articles,
        });
      }
    } catch (err) {
      console.log('Error while submitting request', err.message);
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
            resizeMode="cover"
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
          <FontAwesome name="image" size={14} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <InputField
        label="Full Name"
        placeholder={username}
        editable={false}
        value={username}
      />
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
  editable,
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
      editable={editable}
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
    fontFamily: font.medium,
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: font.regular,
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
    width: 35,
    height: 35,
    position: 'absolute',
    bottom: 3,
    right: 2,
    backgroundColor: '#a1614b',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#eee',
  },
  inputFieldContainer: {
    marginTop: 10,
  },
  inputLabel: {
    fontFamily: font.medium,
  },
  input: {
    fontFamily: font.medium,
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
    fontFamily: font.sm_bold,
    fontSize: 16,
  },
});
