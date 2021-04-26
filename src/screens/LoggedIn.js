import React, { useEffect }     from 'react';
import {useState} from "react";
import { View, Text, Button, ScrollView, TouchableOpacity }   from 'react-native';

import { NavigationContainer }  from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import 'react-native-gesture-handler';

import jwt_decode from 'jwt-decode';

import styles from "../styles/styles"
import { LongPressGestureHandler } from 'react-native-gesture-handler';

export default function LoggedIn ({navigation}) {
    const [userID,      setUserID]      = React.useState(-1);
    const [firstName,   setFirstname]   = React.useState('');
    const [lastName,    setLastname]    = React.useState('');
    const [showLogin,   setShowlogin]   = React.useState(false);

    const { section_LoggedIn, redTextStyle, buttonView, button, welcomeMessage } = styles; 

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
        await AsyncStorage.setItem('@userID',    userID);
    }

    useEffect(() => {
        //retrieveInfo();
        //if (firstName == '' || firstName == undefined) {
            decodeJWT();
        //}        
        //writeItemToStorage("john", "doe", "jwt");
        //readItemFromStorage;
    }, []);

    // Example list of events, for testing
    const [people,setName]=useState([
		{name:'Event', key:'123'}, // The id is the ID of each meeting
		{name:'Another Event', key:'231'},
		{name:'SomeNameOfAnEvent', key:'342'},
		{name:'Anime Club', key:'4345'},
		{name:'POOP Meeting', key:'5123'},
		{name:'Meeting with Kim Jong Un', key:'6345'},
		{name:'Some other event', key:'67'},
	
	  ])

    return (
        <View style={section_LoggedIn}>   
            <ScrollView>
                <Text style={welcomeMessage}>
                    {"Hello " + firstName + ", this is your homepage. Below you may edit and view your events."}
                    {"\n"}
                </Text>
                <Text style={redTextStyle}>
                    {"Debug: \nID: " + userID + "\nFName: " + firstName + " LName: " + lastName + "\n"}
                </Text>

                
                
                
                <View style={styles.myEventListContainer}>
                    { people.map((item) => {
                        return(
                            <View key={item.key}>
                                <TouchableOpacity onPress={() => navigation.navigate('TestScreen')}>
                                    <Text style = {styles.myEventListTitle}>{item.name}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
		        </View>
                
                



                <View style={buttonView}>
                    <Button 
                        title="New Event" 
                        style={button} 
                        color="#485063" 
                        onPress={() => navigation.navigate('New Event')}
                    />
                    <Text> {"\n"} </Text>
                    {/* <Button 
                        title="List Events" 
                        style={button} 
                        color="#485063" 
                        onPress={() => navigation.navigate('List Events')}
                    />
                    <Text> {"\n"} </Text> */}
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
            </ScrollView>
        </View>
    );
}
