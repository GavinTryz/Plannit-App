import React, { useEffect, useState }     from 'react';
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

    useEffect(() => {
        SearchEvents();
	}, []);

    const { section_LoggedIn, redTextStyle, buttonView, button, welcomeMessage, section } = styles; 

    const retrieveInfo = async () => {
        setFirstne(AsyncStorage.getItem('@firstNe'));
        setLastne (AsyncStorage.getItem('@lastNe'));
        setUserID   (AsyncStorage.getItem('@userID'));
    }

    const SearchEvents = async () => {
		var jwtToken = await AsyncStorage.getItem('@jwt');
		var userID = jwt_decode(jwtToken).userId;

        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/searchEvents', {
            userID:      userID,
            name:   search,
			jwtToken: jwtToken
        });

        if (response.data.jwtToken)
        {
            await AsyncStorage.setItem('@jwt', response.data.jwtToken);
        }
        
        if (response.data.error) {
            setError(response.data.error);
        }
        else
        {
            setName(response.data.creatorEvents.concat(response.data.participantEvents));
        }
    }

    // Example list of events, for testing.
    // Have the API create something like this, filling eventName with the event name, and "key" with the event ID.
    const [myEvents,setName]=useState([]);

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

                <View style={{flexDirection: "row"}}>
                    <View style = {{width: "50%"}}>
                        <Button
                            title="New Event" 
                            style={button} 
                            color="#485063" 
                            onPress={() => navigation.navigate('New Event')}
                        />
                    </View>
                    <View style={{width: "50%"}}>
                        <Button 
                            title="My Typical Week" 
                            style={button} 
                            color="#485063" 
                            onPress={() => navigation.navigate('My Typical Week')}
                        />
                    </View>
                    
                </View>

                <View style={styles.myEventListContainer}>
                    { myEvents.map((item) => {
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
