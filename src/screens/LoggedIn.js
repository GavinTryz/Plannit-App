import React, { useEffect }     from 'react';
import {useState} from "react";
import { View, Text, Button, ScrollView, TouchableOpacity }   from 'react-native';
import { Input } from '../components/common';
import axios from 'axios';

import { NavigationContainer }  from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import 'react-native-gesture-handler';

import jwt_decode from 'jwt-decode';

import styles from "../styles/styles"

import { LongPressGestureHandler } from 'react-native-gesture-handler';

export default function LoggedIn ({navigation}) {
    const [userID,      setUserID]      = React.useState('-1');
    const [firstName,   setFirstname]   = React.useState('');
    const [lastName,    setLastname]    = React.useState('');
    const [showLogin,   setShowlogin]   = React.useState(false);
    const [search,         setSearch]   = React.useState('');
    const [error,         setError]   = React.useState('');

    const { section_LoggedIn, redTextStyle, buttonView, button, welcomeMessage, section } = styles; 

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

        await AsyncStorage.setItem('@firstName', token.firstName);
        await AsyncStorage.setItem('@lastName',  token.lastName);
        await AsyncStorage.setItem('@userID',    token.userId);
    }

    const SearchEvents = async () => {
		var jwtToken = await AsyncStorage.getItem('@jwt');
		var userID = jwt_decode(jwtToken).userId;

        console.log(search);
        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/searchEvents', {
            userID:      userID,
            name:   search,
			jwtToken: jwtToken
        });
        
        if (response.data.error) {
            setError(response.data.error);
        }
        else
        {
            console.log(response.data.creatorEvents);
            console.log(response.data.participantEvents);
            await AsyncStorage.setItem('@jwt', response.data.jwtToken);
            setName(response.data.creatorEvents.concat(response.data.participantEvents));
        }
    }

    useEffect(() => {
        //retrieveInfo();
        //if (firstName == '' || firstName == undefined) {
            decodeJWT();
        //}        
        //writeItemToStorage("john", "doe", "jwt");
        //readItemFromStorage;
    }, []);

    // Example list of events, for testing.
    // Have the API create something like this, filling eventName with the event name, and "key" with the event ID.
    const [people,setName]=useState([]);

    return (
        <View style={section_LoggedIn}>   
            <ScrollView>

                <View style={section}>
                    <Input
                        placeholder="Event Name"
                        label="Find Events"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                <Button onPress={SearchEvents} title="Search"> Search </Button>
                {/* <Text style={welcomeMessage}>
                    {"Hello " + firstName + ", this is your homepage. Below you may edit and view your events."}
                    {"\n"}
                </Text> */}
                {/* <Text style={redTextStyle}>
                    {"Debug: \nID: " + userID + "\nFName: " + firstName + " LName: " + lastName + "\n"}
                </Text> */}

                <View style={buttonView}>
                    <Text> {"\n"} </Text>
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
                </View>

                <View style={styles.myEventListContainer}>
                    { people.map((item) => {
                        return(
                            <View key={item._id}>
                                <TouchableOpacity onPress={() => navigation.navigate('View Event', item)}>
                                    <Text style = {styles.myEventListTitle}>{item.eventName}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
		        </View>

            </ScrollView>
            
        </View>
    );
}
