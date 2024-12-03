import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Profile1 from '../screens/Profile1';
import Details from '../screens/Details';
import BookMark from '../customs/BookMark';
import Webview from '../screens/Webview';

const Stack = createNativeStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile1"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Profile1" component={Profile1} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Bookmarks" component={BookMark} />
      <Stack.Screen name="WebView" component={Webview} />
    </Stack.Navigator>
  );
};
export {ProfileStack};
