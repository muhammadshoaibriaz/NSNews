import React, {useEffect, useState} from 'react';
import {FormStack} from './src/components/navigation/FormStack';
import {NavigationContainer} from '@react-navigation/native';
import {
  OnboardingNav,
  RegisterUser,
} from './src/components/navigation/appNavigator';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import {persistor, store} from './src/components/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as PaperProviders} from 'react-native-paper';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import StableDiffusion from './StableDiffusion';
export default function App() {
  const [isAuth, setIsAuth] = React.useState(null);
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const firstTime = await AsyncStorage.getItem('firstTime');
      const token = await AsyncStorage.getItem('token');
      // console.log(firstTime + token);
      setUserToken(token);
      setIsAuth(!firstTime);
    };
    checkAuth();
  }, []);
  useEffect(() => {
    // Set the navigation bar color
    changeNavigationBarColor('#ffffff', true); // Color, and light icons
  }, []);

  return (
    <PaperProviders>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
            {isAuth ? (
              <OnboardingNav />
            ) : userToken ? (
              <RegisterUser />
            ) : (
              <FormStack />
            )}
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </PaperProviders>
  );
}
