import React, {useEffect, useState} from 'react';
import {FormStack} from './src/components/navigation/FormStack';
import {NavigationContainer} from '@react-navigation/native';
import {
  OnboardingNav,
  RegisterUser,
} from './src/components/navigation/appNavigator';
<<<<<<< HEAD
import {StatusBar} from 'react-native';
=======
import {StatusBar, StyleSheet, View, Image} from 'react-native';
>>>>>>> dd5a9b754587640e9588837826846a27ae6b2a28
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import {persistor, store} from './src/components/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
<<<<<<< HEAD
import {Provider as PaperProviders} from 'react-native-paper';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import StableDiffusion from './StableDiffusion';
export default function App() {
  const [isAuth, setIsAuth] = React.useState(null);
  const [userToken, setUserToken] = useState('');

=======
import * as Animatable from 'react-native-animatable';
import {Provider as PaperProviders} from 'react-native-paper';

export default function App({navigation}) {
  const [isAuth, setIsAuth] = React.useState(null);
  const [userToken, setUserToken] = useState('');
>>>>>>> dd5a9b754587640e9588837826846a27ae6b2a28
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
<<<<<<< HEAD
  useEffect(() => {
    // Set the navigation bar color
    changeNavigationBarColor('#ffffff', true); // Color, and light icons
  }, []);
=======

  if (isAuth === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Animatable.Image
          source={require('./assets/images/app.png')}
          animation="zoomIn"
          style={styles.logoImage}
        />
      </View>
    );
  }
>>>>>>> dd5a9b754587640e9588837826846a27ae6b2a28

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
<<<<<<< HEAD
=======

const styles = StyleSheet.create({
  logoImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
});
>>>>>>> dd5a9b754587640e9588837826846a27ae6b2a28
