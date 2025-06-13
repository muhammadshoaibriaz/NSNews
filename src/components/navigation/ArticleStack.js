import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Article from '../screens/Article';
import Details from '../screens/Details';
import TopWriter from '../screens/TopWriter';
import Popular from '../screens/Popular';
import PostArticle from '../screens/PostArticle';
import Search from '../screens/Search';
<<<<<<< HEAD
import UserProfile from '../screens/UserProfile';
=======
>>>>>>> dd5a9b754587640e9588837826846a27ae6b2a28

const Stack = createNativeStackNavigator();
const ArticleStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Article "
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        statusBarTranslucent: true,
        statusBarStyle: 'dark',
        statusBarBackgroundColor: 'transparent',
      }}>
      <Stack.Screen name="Article " component={Article} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Writer" component={TopWriter} />
      <Stack.Screen name="Popular" component={Popular} />
<<<<<<< HEAD
      <Stack.Screen name="UserProfile" component={UserProfile} />
=======
>>>>>>> dd5a9b754587640e9588837826846a27ae6b2a28
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen
        name="PostArticle"
        component={PostArticle}
        options={{
          animation: 'fade_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};
export {ArticleStack};
