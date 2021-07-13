import React from 'react'
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
import { Router, Scene, Stack, Actions } from 'react-native-router-flux'
import Routes from '../router/Routes'
import TopBar from '../components/TopBar'



const Matches = () => {

    return (
        <View>
            <TopBar />
            <Text>Here are your matches</Text>
        </View>
    )

}


export default Matches