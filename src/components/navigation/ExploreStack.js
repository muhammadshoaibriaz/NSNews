import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Details from '../screens/Details';
import Explore from '../screens/Explore';
import TopWriter from '../screens/TopWriter';
import Popular from '../screens/Popular';
import Discover from '../screens/Discover';

const Stack = createNativeStackNavigator();
const DiscoverStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Explore"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Writer" component={TopWriter} />
      <Stack.Screen name="Popular" component={Popular} />
      <Stack.Screen name="Discover" component={Discover} />
    </Stack.Navigator>
  );
};
export {DiscoverStack};
