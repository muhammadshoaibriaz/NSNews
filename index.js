/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

messaging().onMessage(async remoteMessage => {
  console.log('Notification received in foreground:', remoteMessage);

  const {title, body, image} = remoteMessage.notification;
<<<<<<< HEAD
  // console.log('title', title);
  // console.log('body', body);
=======
  console.log('title', title);
  console.log('body', body);
>>>>>>> dd5a9b754587640e9588837826846a27ae6b2a28

  PushNotification.localNotification({
    title: title,
    message: body,
<<<<<<< HEAD
    bigPictureUrl: image, // Display the image in the notification
    largeIconUrl: image, // Optional: Set a large icon for the notification
    channelId: 'default-channel-id',
    vibrate: true,
    vibration: 300,
    priority: 'high',
=======
    // bigPictureUrl: image, // Display the image in the notification
    // largeIconUrl: image, // Optional: Set a large icon for the notification
    channelId: 'default-channel-id',
>>>>>>> dd5a9b754587640e9588837826846a27ae6b2a28
  });
});
// sb-news-428fa 919463634625 919463634625

AppRegistry.registerComponent(appName, () => App);
