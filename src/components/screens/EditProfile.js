import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

import {IP_ADDRESS} from '../../db/IP';
import {uploadImageToCloudinary} from '../../db/cloudinary';
import {useSelector} from 'react-redux';
import {font} from '../constants/font';

export default function EditProfile() {
  const user = useSelector(state => state.login.user);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const updateUser = async () => {
    if (!name || !email || !phone) {
      ToastAndroid.show('Please fill out all fields to update profile!', 3000);
    } else {
      try {
        let avatarUrl;
        if (avatar) {
          avatarUrl = await uploadImageToCloudinary(avatar);
          // console.log('Avatar URL:', avatarUrl);
        }
        const response = await fetch(`${IP_ADDRESS}/api/user/${'userId'}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: name,
            email,
            phone,
            avatar: avatarUrl,
          }),
        });
        if (response.ok) {
          const updatedUserData = await response.json();
          // Clear input fields
          setName('');
          setPhone('');
          setEmail('');
          ToastAndroid.show('Profile updated successfully!', 3000);
          console.log('Updated User Data:', updatedUserData);
        } else {
          console.log('Failed to update profile', await response.text());
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 300,
      maxWidth: 300,
      quality: 1,
      selectionLimit: 1,
    });

    // console.log(result);
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Image source={{uri: user?.user?.image}} style={styles.image} />
          <TouchableOpacity
            onPress={pickImage}
            activeOpacity={0.8}
            style={styles.edit}>
            <AntDesign name="picture" size={16} />
          </TouchableOpacity>
        </View>
        <View style={{marginLeft: 14}}>
          <Text style={styles.name}>{user?.user?.username}</Text>
          <Text style={styles.mail}>{user?.user?.email}</Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 14, paddingVertical: 20}}>
        <Text style={styles.title}>Edit name</Text>
        <TextInput
          value={name}
          onChangeText={text => setName(text)}
          placeholder={`${user?.user?.username}`}
          style={styles.input}
        />
        <Text style={styles.title}>Edit email</Text>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder={`${user?.user?.email}`}
          style={styles.input}
        />
        <Text style={styles.title}>Edit phone</Text>
        <TextInput
          value={phone}
          onChangeText={text => setPhone(text)}
          placeholder="+92 345 3454675"
          style={styles.input}
        />
        <TouchableHighlight
          underlayColor={'#ddd'}
          style={styles.button}
          onPress={updateUser}>
          <Text
            style={{
              fontFamily: font.bold,
              color: '#fff',
            }}>
            Save
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#eee',
    marginTop: 40,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  edit: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 40,
    position: 'absolute',
    bottom: -5,
    right: 0,
  },
  name: {
    fontFamily: font.medium,
    fontSize: 18,
  },
  mail: {
    fontFamily: font.regular,
    opacity: 0.6,
  },
  title: {
    fontFamily: font.medium,
    marginBottom: 4,
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    fontFamily: font.medium,
  },
  button: {
    width: '100%',
    backgroundColor: '#a1614b',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 8,
    marginTop: 20,
  },
});
