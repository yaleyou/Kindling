// anything that's part of the node_modules do not need a path ./ 

import React, { useState, useEffect } from 'react';
import Login from '../views/Login'
import TopBar from '../components/TopBar'
import Profile from '../views/Profile'
import EditProfile from '../views/EditProfile'
import Explore from '../views/Explore'
import Matches from '../views/Matches'
import { signOut, googleLogin } from '../views/Login'
//importing auth from firebase
import auth from '@react-native-firebase/auth'; 
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux'
import { setData } from '../components/Database'
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';


//global varible for userID
global.userId;



// arrow function with {} runs the function, arrow functions with () only returns a single value
// make component by declaring a varible and assigning an arrow function to it


const Routes = () => {


  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  //handle user state Changes
  //my callback function that is used by onAuthStateChanged
  //userData is the state that is returned by of auth().onAuthStateChanged(handleOnAuthStateChanged)
  function handleOnAuthStateChanged(userData) {

    if (userData != null) {
      userId = userData.uid;

      //setData(userId, undefined, undefined, undefined, undefined, ['1','2'], ['3'], [''], undefined)
      console.log(userId)
    }

    setUser(userData);

    if (initializing) setInitializing(false);

    if (!userData) {

      // GoogleSignin.configure({
      //   webClientId: '397369049113-stdbmvtpv6at04vkormfehtoav3u4fsq.apps.googleusercontent.com',
      // });
      Actions.login()

    } else {

      Actions.topBar();

    }
  }

  //useEffect takes in a  callback function and an array as the parameter 
  useEffect(() => {
    //onAuthStateChanged will execute my call back function when the AuthState changes
    //handleOnAuthStateChanged is the parameter for onAuthStateChanged
    //auth().onAuthStateChanged() is a listen function, always running and listening for changes in the background
    //subscriber is the function for killing the listen 
    const subscriber = auth().onAuthStateChanged(handleOnAuthStateChanged);
    const unmount = () => {
      subscriber();
    };
    //useEffect calls the unmount function when the component is unmounted for cleanup
    return unmount;

    //passing in empty array to the 2nd parameter of useEffect means that the useEffect is called once at beginnning 
  }, []);


  if (initializing) return null;

  //console.log(`userid:`,user.uid);

  return (

    <Router>
      <Stack key="root" hideNavBar={true}>
        <Scene key="login" component={Login} title="Login" initial={true} />
        <Scene key="profile" component={Profile} title="Profile" />
        <Scene key="explore" component={Explore} title="Explore" />
        <Scene key="topBar" component={TopBar} title="TopBar" />
        <Scene key="matches" component={Matches} title="Matches" />
        <Scene key="editProfile" component={EditProfile} title="EditProfile" />
      </Stack>
    </Router>

  )
}

export default Routes