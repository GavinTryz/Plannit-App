import React, { useEffect, useState }     from 'react';
import { View, Text, Button }   from 'react-native';

import { NavigationContainer }  from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import 'react-native-gesture-handler';

import jwt_decode from 'jwt-decode';

import styles from "../styles/styles"

export default function LoggedIn ({navigation}) {
    const [userID,      setUserID]      = useState(-1);
    const [firstNe,   setFirstne]   = useState('');
    const [lastNe,    setLastne]    = useState('');
    const [showLogin,   setShowlogin]   = useState(false);

    const { section_LoggedIn, textStyle, buttonView, button, welcomeMessage } = styles; 

    const retrieveInfo = async () => {
        setFirstne(AsyncStorage.getItem('@firstNe'));
        setLastne (AsyncStorage.getItem('@lastNe'));
        setUserID   (AsyncStorage.getItem('@userID'));
    }

    const decodeJWT = async () => {
        var token = jwt_decode(await AsyncStorage.getItem('@jwt'));
        setFirstne(token.firstNe);
        setLastne (token.lastNe);
        setUserID   (token.userId);

        await AsyncStorage.setItem('@firstNe', firstNe);
        await AsyncStorage.setItem('@lastNe',  lastNe);
        await AsyncStorage.setItem('@userID',    userID);
    }

    useEffect(() => {
        retrieveInfo();
        //if (firstNe == '' || firstNe == undefined) {
            decodeJWT();
        //}        
        //writeItemToStorage("john", "doe", "jwt");
        //readItemFromStorage;
    }, []);

    return (
        <View style={section_LoggedIn}>   
            <Text style={welcomeMessage}>
                {"Hello " + firstNe + ", this is your homepage. Below you may edit and view your events."}
                {"\n"}
            </Text>
            <Text style={textStyle}>
                {userID + ", " + firstNe + ", " + lastNe + "\n"}
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
