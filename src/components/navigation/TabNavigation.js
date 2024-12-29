import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import {DiscoverStack} from './ExploreStack';
import {HomeStack} from './HomeStack';
import {StyleSheet} from 'react-native';
import {ArticleStack} from './ArticleStack';
import {ProfileStack} from './ProfileStack';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Discover') {
            iconName = focused ? 'globe-outline' : 'globe-outline';
          } else if (route.name === 'Article') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} color={color} size={22} />;
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0)',
              'rgba(255, 255, 255, 0.7)',
              '#fff',
            ]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={[styles.tabBarContainer]}
          />
        ),
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: 'transparent',
          display: getRouteName(route),
        },
        tabBarLabelStyle: {
          fontSize: 8,
        },
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen name="Home" component={HomeStack}></Tab.Screen>
      <Tab.Screen name="Discover" component={DiscoverStack}></Tab.Screen>
      <Tab.Screen name="Article" component={ArticleStack}></Tab.Screen>
      <Tab.Screen name="Profile" component={ProfileStack}></Tab.Screen>
    </Tab.Navigator>
  );
};

const getRouteName = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  // console.log(routeName);
  if (
    routeName?.includes('Notify') ||
    routeName?.includes('Bookmarks') ||
    routeName?.includes('Popular') ||
    routeName?.includes('Search') ||
    routeName?.includes('WebView') ||
    routeName?.includes('Follower') ||
    routeName?.includes('Following') ||
    routeName?.includes('Details') ||
    routeName?.includes('UserProfile')
  ) {
    return 'none';
  } else {
    return 'flex';
  }
};

export {TabNavigation};

const styles = StyleSheet.create({
  tabBarContainer: {
    height: 70,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
