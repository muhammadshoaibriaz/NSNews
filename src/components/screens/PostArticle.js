import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
  Alert,
<<<<<<< HEAD
  ActivityIndicator,
=======
>>>>>>> dd5a9b754587640e9588837826846a27ae6b2a28
} from 'react-native';
import {Snackbar} from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../customs/Header';
import {font} from '../constants/font';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {baseUrl} from '../../db/IP';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import {uploadImageToCloudinary} from '../../db/cloudinary';
<<<<<<< HEAD
import PushNotification from 'react-native-push-notification';
import {MMKV} from 'react-native-mmkv';
import Loading from '../customs/Loading';
import {fetchNews, setArticles} from '../redux/slices/articleSlice';
=======
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
>>>>>>> dd5a9b754587640e9588837826846a27ae6b2a28

export default function PostArticle({route, navigation}) {
  const [description, setDescription] = useState('');
  const [imageUrl, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector(user => user.login.user);
  const token = userInfo?.token;
  const authorName = userInfo?.user?.username;
  const authorImage = userInfo?.user?.image;
  // console.log('authorName', authorImage);
  const [selectedCategory, setSelectedCategory] = useState();

  const dispatch = useDispatch();
  // const loading = useSelector(state => state.article.loading);

  // Function to pick an image from the gallery
  const pickImage = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 200,
      cropping: true,
    }).then(image => {
      setImage(image?.path);
    });
  };

<<<<<<< HEAD
=======
  useEffect(() => {
    getToken();
    // console.log('This is my fcm', fcmToken);
  }, [fcmToken]);
  const [fcmToken, setFcmToken] = useState(null);
  const getToken = async () => {
    try {
      const tok = await messaging().getToken();
      setFcmToken(tok);
    } catch (error) {
      console.error('Error getting token', error);
    }
  };

  const sendPushNotification = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/send-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: fcmToken,
          title: title,
          body: description,
        }),
      });

      const data = await response.json();
      if (data.success) {
        Alert.alert('Success', 'Notification sent successfully!');
      } else {
        Alert.alert('Error', data.error || 'Failed to send notification');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      Alert.alert('Error', 'Failed to send notification');
    }
  };

  PushNotification.createChannel(
    {
      channelId: 'default-channel-id', // Must match the channelId used in localNotification
      channelName: 'SBNews', // A readable name for the channel
      importance: 4, // High importance
      vibrate: true, // Vibrate the device for notifications
      sound: 'default', // Set the sound to default (not silent)
      showWhen: true, // Show the time of notification
    },
    created => console.log(`Channel created: ${created}`), // Logs if the channel was created
  );

>>>>>>> dd5a9b754587640e9588837826846a27ae6b2a28
  const submitPost = async () => {
    setLoading(true);
    if (!title || !description) {
      ToastAndroid.show('Please fill out all fields!', 3000);
      return;
    }
    try {
      let cloudinaryUrl;
      if (imageUrl) {
        cloudinaryUrl = await uploadImageToCloudinary(imageUrl);
      }
      const response = await axios.post(
        `${baseUrl}/api/post`,
        {
          title,
          description,
          imageUrl: cloudinaryUrl,
          category: selectedCategory,
          authorImage,
          authorName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log(response.data);
      dispatch(setArticles(response.data));
      setVisible(true);
      sendPushNotification();
    } catch (err) {
      console.log('Error while submitting post', err.message);
    } finally {
      setImage('');
      setTitle('');
      setDescription('');
      setLoading(false);
      dispatch(fetchNews());
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* Custom Header */}

      <Header
        title="Post article"
        navigation={navigation}
        icon2="close"
        onPress2={() => navigation.goBack()}
      />
      <View style={styles.container}>
        {/* Image Picker */}
        <TouchableOpacity style={styles.pickImage} onPress={pickImage}>
          {!imageUrl ? (
            <Ionicons name="image-outline" size={90} style={styles.icon} />
          ) : (
            <Image source={{uri: imageUrl}} style={styles.image} />
          )}
        </TouchableOpacity>

        {/* Text Input for Post Content */}
        <TextInput
          style={styles.input}
          placeholder="Title here"
          placeholderTextColor="#777"
          multiline
          value={title}
          onChangeText={t => setTitle(t)}
        />
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          placeholderTextColor="#777"
          multiline
          numberOfLines={14}
          value={description}
          onChangeText={t => setDescription(t)}
        />

        <View
          style={{
            paddingHorizontal: 24,
            width: '100%',
          }}>
          <Picker
            selectedValue={selectedCategory}
            dropdownIconColor={'chocolate'}
            dropdownIconRippleColor={'chocolate'}
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCategory(itemValue)
            }>
            <Picker.Item
              style={{fontFamily: font.medium}}
              label="World News"
              value="world_news"
            />
            <Picker.Item
              style={{fontFamily: font.medium}}
              label="Politics"
              value="politics"
            />
            <Picker.Item
              style={{fontFamily: font.medium}}
              label="Technology"
              value="technology"
            />
            <Picker.Item
              style={{fontFamily: font.medium}}
              label="Sports"
              value="sports"
            />
            <Picker.Item
              style={{fontFamily: font.medium}}
              label="Entertainment"
              value="entertainment"
            />
            <Picker.Item
              style={{fontFamily: font.medium}}
              label="Business"
              value="business"
            />
            <Picker.Item
              style={{fontFamily: font.medium}}
              label="Health"
              value="health"
            />
            <Picker.Item
              style={{fontFamily: font.medium}}
              label="Science"
              value="science"
            />
            <Picker.Item
              style={{fontFamily: font.medium}}
              label="Lifestyle"
              value="lifestyle"
            />
            <Picker.Item
              style={{fontFamily: font.medium}}
              label="Travel"
              value="travel"
            />
            <Picker.Item
              style={{fontFamily: font.medium}}
              label="Education"
              value="education"
            />
            <Picker.Item
              style={{fontFamily: font.medium}}
              label="Food"
              value="food"
            />
            <Picker.Item
              style={{fontFamily: font.medium}}
              label="Weather"
              value="weather"
            />
            <Picker.Item
              style={{fontFamily: font.medium}}
              label="Environment"
              value="environment"
            />
            <Picker.Item
              style={{fontFamily: font.medium}}
              label="Crime"
              value="crime"
            />
            <Picker.Item
              style={{fontFamily: font.medium}}
              label="Finance"
              value="finance"
            />
            <Picker.Item
              style={{fontFamily: font.medium}}
              label="Culture"
              value="culture"
            />
            <Picker.Item
              style={{fontFamily: font.medium}}
              label="Opinion"
              value="opinion"
            />
            <Picker.Item
              style={{fontFamily: font.medium}}
              label="Real Estate"
              value="real_estate"
            />
            <Picker.Item
              style={{fontFamily: font.medium}}
              label="Automobiles"
              value="automobiles"
            />
          </Picker>
        </View>
        {/* Post Button */}
        <TouchableOpacity style={styles.postBtn} onPress={submitPost}>
          {loading ? (
            <ActivityIndicator size={20} color={'white'} />
          ) : (
            <Text style={styles.postBtnText}>Post</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Snackbar for success message */}
      <Snackbar
        visible={visible}
        style={{bottom: 60}}
        duration={2000}
        onDismiss={() => setVisible(false)}
        onIconPress={() => setVisible(false)}>
        Post uploaded successfully!
      </Snackbar>
    </View>
  );
}

// Stylesheet for consistent styling
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  pickImage: {
    width: '80%',
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  icon: {
    opacity: 0.1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  input: {
    width: '85%',
    minHeight: 45,
    marginTop: 20,
    maxHeight: 400,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingLeft: 6,
    fontFamily: font.medium,
    color: '#333',
  },
  postBtn: {
    width: '85%',
    height: 45,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a1614b',
    marginTop: 20,
  },
  postBtnText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: font.medium,
  },
});
