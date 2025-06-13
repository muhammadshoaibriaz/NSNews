import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Profile1 from '../screens/Profile1';
import Details from '../screens/Details';
import EditProfile from '../screens/EditProfile';
import BookMark from '../customs/BookMark';
import Webview from '../screens/Webview';
import Follower from '../screens/Follower';
import Following from '../screens/Following';
import UserProfile from '../screens/UserProfile';
import StableDiffusion from '../../../StableDiffusion';

const Stack = createNativeStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile1"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        statusBarTranslucent: true,
        statusBarStyle: 'dark',
      }}>
      <Stack.Screen name="Profile1" component={Profile1} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Bookmarks" component={BookMark} />
      <Stack.Screen name="WebView" component={Webview} />
      <Stack.Screen name="Follower" component={Follower} />
      <Stack.Screen name="Following" component={Following} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Stable" component={StableDiffusion} />
    </Stack.Navigator>
  );
};
export {ProfileStack};
