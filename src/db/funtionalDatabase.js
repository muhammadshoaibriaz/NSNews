import axios from 'axios';
import {baseUrl} from './IP';
import {MMKV} from 'react-native-mmkv';
import {Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';

let storage = new MMKV();

export const fetchArticles = async userId => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/register/${userId}/articles`,
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles', error);
  }
};

export const getRecommendedNews = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/get-recommended-news`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('Error while getting recommended news', error.message);
  }
};

// console.log('token', token);
export const sendPushNotification = async () => {
  let fcmToken = await storage.getString('fcmToken');
  // console.log('fcmToken', fcmToken);
  try {
    const response = await fetch(`${baseUrl}/api/send-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: fcmToken,
        title: 'title',
        body: 'description',
        image: '',
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
