//import React from 'react';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';



import auth from '@react-native-firebase/auth'; //importing auth from firebase

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



const Login = () => (
//no return needed cus no functions here
  <View>
    <Button
      title="Sign in with Google"
      btnType="google"
      color="black"
      backgroundColor="white"
      onPress={() => googleLogin()}
    />
  </View>

)

//signout
export const signOut = () => {

  auth()
    .signOut()
    .then(() => console.log('User signed out!'));

}

//signin
export const googleLogin = async () => {


  try {

    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);

  } catch (error) {
    console.log({ error })
  }
}






const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});



export default Login;
