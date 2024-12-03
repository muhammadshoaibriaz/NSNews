import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Article from '../screens/Article';
import Details from '../screens/Details';
import TopWriter from '../screens/TopWriter';
import Popular from '../screens/Popular';

const Stack = createNativeStackNavigator();
const ArticleStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Article "
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Article " component={Article} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Writer" component={TopWriter} />
      <Stack.Screen name="Popular" component={Popular} />
    </Stack.Navigator>
  );
};
export {ArticleStack};
