import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import jwt_decode   from 'jwt-decode';
import axios        from 'axios';

import { Input }    from '../components/common';
import styles       from "../styles/styles"



export default function LoggedIn ({navigation}) {
    //const [userID,      setUserID]      = React.useState(-1);
    //const [firstName,   setFirstname]   = React.useState('');
    //const [lastName,    setLastname]    = React.useState('');
    const [search,      setSearch]      = React.useState('');
    const [error,       setError]       = React.useState('');

    useEffect(() => {
        SearchEvents();
	}, []);

    const { section_LoggedIn, button, section } = styles; 

    /*
    const retrieveInfo = async () => {
        setFirstname(AsyncStorage.getItem('@firstName'));
        setLastname (AsyncStorage.getItem('@lastName'));
        setUserID   (AsyncStorage.getItem('@userID'));
    }
    */

    const SearchEvents = async () => {
		var jwtToken = await AsyncStorage.getItem('@jwt');
		var userID = jwt_decode(jwtToken).userId;

        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/searchEvents', {
            userID:     userID,
            name:       search,
			jwtToken:   jwtToken
        });

        if (response.data.jwtToken) {
            await AsyncStorage.setItem('@jwt', response.data.jwtToken);
        }
        
        if (response.data.error) {
            setError(response.data.error);
        } else {
            setName(response.data.participantEvents);
        }
    }

    // Example list of events, for testing.
    // Have the API create something like this, filling eventName with the event name, and "key" with the event ID.
    const [myEvents,setName]=useState([]);

    return (
        <View style={section_LoggedIn}>   
            <ScrollView style={{
                marginBottom:"3%",
            }}>
                <View style={section}>
                    <Input
                        placeholder="Event Name"
                        label="Find Events"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                <View style={{
                    width: "90%",
                    alignSelf: "center",
                    marginTop: "5%",
                }}>
                    <Button
                        onPress={SearchEvents}
                        title="Search"
                        color="#e29476"
                    > 
                    </Button>
                </View>

                <Text />

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                }}>
                    <View style={{
                        width: "40%",
                    }}>
                        <Button
                            title="New Event" 
                            style={button} 
                            color="#e29476" 
                            onPress={() => navigation.navigate('New Event')}
                        />
                    </View>
                    <View style={{
                        width: "40%",
                    }}>
                        <Button 
                            title="My Typical Week" 
                            style={button} 
                            color="#e29476" 
                            onPress={() => navigation.navigate('My Typical Week')}
                        />
                    </View>
                </View>
                {/* <View style={{width: "50%"}}>
                    <Button 
                        title="Gavin's Test" 
                        style={button} 
                        color="#a9b63b" 
                        onPress={() => navigation.navigate('Test Page')}
                    />
                </View> */}

                <View style={styles.myEventListContainer}>
                    { myEvents.map((item) => {
                        return(
                            <View key={item.eventID}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('View Event', {_id: item.eventID})}
                                    style={{
                                    }}
                                >
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
