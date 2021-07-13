import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { Icon } from 'react-native-elements'
import Login from '../views/Login'
import { signOut } from '../views/Login'
import { readData, setData } from '../components/Database'
import Profile from '../views/Profile'
import { Router, Scene, Stack, Actions } from 'react-native-router-flux'
import Routes from '../router/Routes'

export default function topBar() {


    const addUser = () => {

        setData(Math.floor(Math.random() * 10), 'test', 13, 'Hello', 'Male', [''], [''], [''], 'https://www.w3schools.com/images/w3lynx_200.png');

    }

    const goToProfile = () => {

        Actions.profile();
    }

    const goToExplore = () => {

        Actions.explore();
    }

    const goToMatches = () => {

        Actions.matches();
    }

    return (

        <View style={styles.container}>

            <Icon raised name='heartbeat' type='font-awesome' color='#f50' size={20} onPress={() => goToMatches()} />
            <Icon raised name='heartbeat' type='font-awesome' color='#f50' size={20} onPress={() => goToExplore()} />
            <Icon raised name='heartbeat' type='font-awesome' color='#f50' size={20} onPress={() => goToProfile()} />

        </View>
    )

}

const styles = StyleSheet.create({

    container: {

        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.12,
        shadowRadius: 5.46,
        elevation: 9,



    },

})
