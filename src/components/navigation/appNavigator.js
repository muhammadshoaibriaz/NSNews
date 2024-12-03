import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import {FormStack} from './FormStack';
import Onboarding from '../screens/Onboarding';
import {TabNavigation} from './TabNavigation';

const Stack = createNativeStackNavigator();

const OnboardingNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Onboarding">
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Form" component={FormStack} />
      {/* <Stack.Screen name="TabNavigation" component={TabNavigation} /> */}
    </Stack.Navigator>
  );
};

const RegisterUser = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Form" component={FormStack} />
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
    </Stack.Navigator>
  );
};

export {OnboardingNav, RegisterUser};
