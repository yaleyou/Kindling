import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image
} from 'react-native';
import { signOut } from '../views/Login'
import { Router, Scene, Stack, Actions } from 'react-native-router-flux'
import EditProfile from '../views/EditProfile'
import { readData, setData } from '../components/Database'
import Routes from '../router/Routes'
import database from '@react-native-firebase/database';
import TopBar from '../components/TopBar'

const editProfile = () => {

Actions.editProfile();
  
}


const Profile = () => {

const [name, setName] = useState();
const [age, setAge ] = useState();
const [desc, setDesc] = useState();
const [gender, setGender] = useState();
const [imgUrl, setImgUrl] = useState();
//populating the user's profile

readData(userId)
  .then((snapshot) => {
    setName(snapshot.child("name").val())
    setAge(snapshot.child("age").val())
    setDesc(snapshot.child("desc").val())
    setGender(snapshot.child("gender").val())
    setImgUrl(snapshot.child("imgUrl").val())
    console.log(name)
  })


return(
<View>
<TopBar/>
    <Image 
      style={{width: 200, height: 200}}
      resizeMode={'cover'} // cover or contain its up to the view look
      source={{ uri: imgUrl }} />
    <Text>Name {name}</Text>
    <Text>Age: {age}</Text>
    <Text>Description: {desc}</Text>
    <Text>Gender: {gender}</Text>
      

   <Button
  title="Edit"
  btnType="google"
  color="black"
  backgroundColor="white"
  onPress={() => editProfile()}
  />

  <Button
  title="signout"
  btnType="google"
  color="black"
  backgroundColor="white"
  onPress={() => signOut()}
  />
        

    </View>
)
}


export default Profile