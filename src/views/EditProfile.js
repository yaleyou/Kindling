import { Text, View, TouchableOpacity, Picker, TextInput, StyleSheet, Button, Alert, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import { Actions } from 'react-native-router-flux'
import Routes from '../router/Routes'
import { setData } from "../components/Database";
//import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
//* is asking for an object with all of the named exports of 'react-native-progress'.
import * as Progress from 'react-native-progress'; 
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';



export const EditProfile = () => {

  const {control, handleSubmit, formState: { errors } } = useForm();
  const [selectedValue, setSelectedValue] = useState("Male");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const selectImage = () => {

    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    //launchImageLibrary takes options above as and "response" as parameters
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.assets[0].uri }; //response.uri doesn't work
        console.log(source);
        setImage(source);
      }
    });
  };

//async because it takes time to upload the image
  const uploadImage = async () => {
    //Destructuring assignment, uri is an array 
    const { uri } = image;
    const filename = userId + '.jpg';
    //equals to if uploadUri = Platform.OS === 'ios' is true -> uri.replace('file://', ''), if it's false -> uri
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    //used for progress
    setTransferred(0);
    const task = storage()
      .ref(filename)
      .putFile(uploadUri);
    //set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    try {
    //The await expression causes async function execution to pause until a Promise is settled
      await task;
    } catch (e) {
      console.error(e);
    }

    //reset Uploading to false
    setUploading(false);
    Alert.alert(
      'Profile updated!'
    );
    //reset image
    setImage(null);
  };

  //handles what happens when the user presses submit (calls the setData function)
  //data is returned from handleSubmit(onSubmit)
  const onSubmit = data => {

  //not sure if it's right to call uploadImage here
    uploadImage();
    //change selectedValue to genderSelected
    setData(userId, data.Name, data.Age, data.Desc, selectedValue, image.uri);
    console.log(userId, selectedValue);
    Actions.pop({ refresh: {} })
  }

  //needs useEffect cleanup function



  return (
    <View>
      <Text>Name</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            //style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="Name"
        defaultValue=""
      />
      {errors.Name && <Text>This is required.</Text>}

      <Text>City</Text>
      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            //style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="City"
        defaultValue=""
      />

      <Text>Age</Text>
      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            //style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="Age"
        defaultValue=""
      />

      <Text>About</Text>
      <Controller
        control={control}
        rules={{
          maxLength: 50,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            //style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="Desc"
        defaultValue=""
      />

      <Text>Gender</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>

      <TouchableOpacity onPress={selectImage}>
        <Text >Pick an image</Text>
      </TouchableOpacity>

      <View>
        {image !== null ? (
          //<Text>{image.uri}</Text>

          <Image
            style={{ width: 200, height: 200 }}
            resizeMode={'cover'} // cover or contain its upto you view look
            source={{ uri: image.uri }} />
        ) : null}
        {/*{uploading ? (
          <View >
            <Progress.Bar progress={transferred} width={300} />
          </View>
        ) : (
          <TouchableOpacity onPress={uploadImage}>
            <Text>Upload image</Text>
          </TouchableOpacity>
        )}*/}
      </View>


      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

export default EditProfile