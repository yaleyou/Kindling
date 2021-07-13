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
import { readData, setData, updateLikes } from '../components/Database'
import Routes from '../router/Routes'
import database from '@react-native-firebase/database';
import TopBar from '../components/TopBar'





const Explore = () => {


  // const popUserArray = () => {

  //   database()
  //   .ref(`/users/`)
  //    .once('value')
  //    .then(function(snapshot) {

  //      console.log("poping the array");
  //         //LOOPING EACH CHILD AND PUSHING TO ARRAY
  //         snapshot.forEach(item => {

  //             var key = snapshot.key;

  //            if(!userLikes[0] == ("key")){
  //                matchFound = true;
  //                setProfileId(key);
  //            }

  //             return false;
  //         });
  //     });
  // }





  //console.log(userList);
  //id of the current profile the page is displaying
  const [profileId, setProfileId] = useState(0);
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [desc, setDesc] = useState();
  const [gender, setGender] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [userLikes, setuserLikes] = useState();
  const [userDislikes, setuserDislikes] = useState();
  const [userMatches, setuserMatches] = useState();
  var matchFound = false;


  //setProfileId(4);
  //not sure why array is being populated the same amount of times as number of users



  //manually loading in the users atm
  const updatePage = () => {
    setProfileId(profileId + 1);
    Actions.refresh();
  }

  readData(userId)
    .then((snapshot) => {
      //setters causing memory leak
      //setuserLikes(snapshot.child("likes").val())
      //setuserDislikes(snapshot.child("dislikes").val())
      //setuserMatches(snapshot.child("matches").val())
      console.log(userId)
    })

  //popUserArray();  

  readData(profileId)
    .then((snapshot) => {
      console.log('reading user data')
      setName(snapshot.child("name").val())
      setAge(snapshot.child("age").val())
      setDesc(snapshot.child("desc").val())
      setImgUrl(snapshot.child("imgUrl").val())

      //console.log(userName)
    })


  return (

    <View>
      <TopBar />
      <Image
        style={{ width: 200, height: 200 }}
        resizeMode={'cover'} // cover or contain its upto you view look
        source={{ uri: imgUrl }} />
      <Text>Name {name}</Text>
      <Text>Age: {age}</Text>
      <Text>Description: {desc}</Text>
      <Text>Gender: {gender}</Text>


      <Button
        title="Like"
        btnType="google"
        color="black"
        backgroundColor="white"
        onPress={() => updatePage()}
      />

      <Button
        title="Dislike"
        btnType="google"
        color="black"
        backgroundColor="white"
        onPress={() => console.log('Disliked')}
      />

    </View>
  )
}


export default Explore