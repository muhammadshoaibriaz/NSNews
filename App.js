import React, {useEffect, useState} from 'react';
import {FormStack} from './src/components/navigation/FormStack';
import {NavigationContainer} from '@react-navigation/native';
import {
  OnboardingNav,
  RegisterUser,
} from './src/components/navigation/appNavigator';
import {StatusBar, StyleSheet, View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import {persistor, store} from './src/components/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import * as Animatable from 'react-native-animatable';
import {Provider as PaperProviders} from 'react-native-paper';

export default function App({navigation}) {
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

const styles = StyleSheet.create({
  logoImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
});
