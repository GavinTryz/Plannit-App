import React, { useState } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

import { Input, Loading, Button } from '../components/common';
import styles from "../styles/styles"

export default function InviteUsers ({navigation, route}) {
    const {eventName, _id} = route.params; // _id is the event ID

    const [email,       setEmail]       = useState('');
    const [error,       setError]       = useState('');
    const [loading,     setLoading]     = useState(false);

    const { form, section, redTextStyle, button, myEventListContainer, myEventListTitle } = styles;

    //var myVar = [];
    const [myVar, setMyVar] = useState([]);

    const SendInvite = async () => {

        console.log("Clicked Invite User, inviting: " + email)

        var jwtToken = await AsyncStorage.getItem('@jwt');
        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/inviteUser', {
            eventID: _id,
			jwtToken: jwtToken,
            email: email,
            eventName: eventName
        });

        if (response.data.jwtToken) {
            await AsyncStorage.setItem('@jwt', response.data.jwtToken);
        }

        if (response.data.error) {
            setError(response.data.error);
        } else {
            setError("");
            //myVar.push(email);
            var tmp = myVar;
            tmp.push(email);
            setMyVar(tmp);
            console.log(myVar);
        }
    }

    return (
        <View style={form}>
            <ScrollView>
                <View style={section}>
                    <Input
                        placeholder="user@email.com"
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <Text style={redTextStyle}>
                    {error}
                </Text>

                {!loading ?
                    <Button style={button} onPress={SendInvite}> Invite User </Button>
                    :
                    <Loading size={'large'} />
                }
                <View>
                    <FlatList
                        extraData={myVar}
                        style={myEventListContainer}
                        keyExtractor={(item, i) => i.toString()}
                        data={myVar}
                        renderItem={({item}) => (
                            <Text style={myEventListTitle}>{item}</Text>
                        )}
                    />
                </View>
            </ScrollView>
        </View>
    );
}