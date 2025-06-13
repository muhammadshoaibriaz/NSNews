import React from 'react';
import {LoginButton, AccessToken} from 'react-native-fbsdk-next';

const FacebookLogin = () => {
  const handleFacebookLogin = (error, result) => {
    if (error) {
      console.error('Login failed with error: ', error);
    } else if (result.isCancelled) {
      console.log('Login cancelled');
    } else {
      AccessToken.getCurrentAccessToken().then(data => {
        console.log('Facebook Access Token: ', data.accessToken.toString());
      });
    }
  };

  return (
    <LoginButton
      onLoginFinished={handleFacebookLogin}
      onLogoutFinished={() => console.log('User logged out')}
    />
  );
};

export default FacebookLogin;
