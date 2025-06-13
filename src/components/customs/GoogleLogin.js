import React, {useEffect} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Button, Alert} from 'react-native';

const GoogleLogin = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID',
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Google User Info: ', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Login cancelled');
      } else {
        console.error('Google Sign-In error: ', error);
      }
    }
  };

  return <Button title="Login with Google" onPress={handleGoogleLogin} />;
};

export default GoogleLogin;
