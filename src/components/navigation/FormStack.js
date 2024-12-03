import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Profile from '../screens/Profile';
import Interest from '../screens/Interest';
import Discover from '../screens/Discover';
import {TabNavigation} from './TabNavigation';
import ContinueWith from '../screens/ContinueWith';
const Stack = createNativeStackNavigator();
const FormStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_bottom'}}
      initialRouteName="ContinueWith">
      <Stack.Screen name="ContinueWith" component={ContinueWith} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Interest" component={Interest} />
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen name="Tab" component={TabNavigation} />
    </Stack.Navigator>
  );
};

export {FormStack};
