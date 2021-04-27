import React, { useEffect, useState }     from 'react';
import { View, Text, Button }   from 'react-native';

import { NavigationContainer }  from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage             from '@react-native-async-storage/async-storage';

import 'react-native-gesture-handler';

import jwt_decode from 'jwt-decode';

import styles from "../styles/styles"

export default function LoggedIn ({navigation}) {
    const [userID,      setUserID]      = useState(-1);
    const [firstName,   setFirstname]   = useState('');
    const [lastName,    setLastname]    = useState('');
    const [showLogin,   setShowlogin]   = useState(false);

    const { section_LoggedIn, textStyle, buttonView, button, welcomeMessage } = styles; 

    const retrieveInfo = async () => {
        setFirstname(AsyncStorage.getItem('@firstName'));
        setLastname (AsyncStorage.getItem('@lastName'));
        setUserID   (AsyncStorage.getItem('@userID'));
    }

    const decodeJWT = async () => {
        var token = jwt_decode(await AsyncStorage.getItem('@jwt'));
        setFirstname(token.firstName);
        setLastname (token.lastName);
        setUserID   (token.userId);

        await AsyncStorage.setItem('@firstName', firstName);
        await AsyncStorage.setItem('@lastName',  lastName);
        await AsyncStorage.setItem('@userID',   userID);
    }

    useEffect(() => {
        retrieveInfo();
        //if (firstName == '' || firstName == undefined) {
        decodeJWT();
        //}        
        //writeItemToStorage("john", "doe", "jwt");
        //readItemFromStorage;
    }, []);

    return (
        <View style={section_LoggedIn}>   
            <Text style={welcomeMessage}>
                {"Hello " + firstName + ", this is your homepage. Below you may edit and view your events."}
                {"\n"}
            </Text>
            <Text style={textStyle}>
                {userID + ", " + firstName + ", " + lastName + "\n"}
            </Text>
            <View style={buttonView}>
                <Button 
                    title="New Event" 
                    style={button} 
                    color="#485063" 
                    onPress={() => navigation.navigate('New Event')}
                />
                <Text> {"\n"} </Text>
                <Button 
                    title="List Events" 
                    style={button} 
                    color="#485063" 
                    onPress={() => navigation.navigate('List Events')}
                />
                <Text> {"\n"} </Text>
                <Button 
                    title="My Typical Week" 
                    style={button} 
                    color="#485063" 
                    onPress={() => navigation.navigate('My Typical Week')}
                />
                <Text> {"\n"} </Text>
                <Button 
                    title="Notifications" 
                    style={button} 
                    color="#485063" 
                    onPress={() => navigation.navigate('Notifications')}
                />
                <Text> {"\n"} </Text>
            </View>
        </View>
    );
}
