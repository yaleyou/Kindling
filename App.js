/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';


import Routes from './src/router/Routes'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '397369049113-stdbmvtpv6at04vkormfehtoav3u4fsq.apps.googleusercontent.com',
});

const App = () => <Routes/>
 








export default App;
