import React, { useState } from 'react';
import { View, Text } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

import { Input, Loading, Button } from '../components/common';
import styles from "../styles/styles"

export default function InviteUsers ({navigation, route}) {
    const {eventName, _id} = route.params; // _id is the event ID

    const [email,       setEmail]       = useState('');
    const [error,       setError]       = useState('');
    const [loading,     setLoading]     = useState(false);

    const { form, section, errorTextStyle, button } = styles;

    const SendInvite = async () => {

        console.log("Clicked Invite User, inviting: " + email)

        // var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/sendReset', {
        //     email:      email
        // });
        
        // setError(response.data.error);

        // if (response.data.error === "")
        // {
        //     navigation.navigate('Reset Password');
        // }

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

        }

        setError(response.data.error);
        console.log("Got an error back >" + error + "<");
    }

    return (
        <View style={form}>
            <View>
                <View style={section}>
                    <Input
                        placeholder="user@email.com"
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <Text style={errorTextStyle}>
                    {error}
                </Text>

                {!loading ?
                    <Button style={button} onPress={SendInvite}> Invite User </Button>
                    :
                    <Loading size={'large'} />
                }
            </View>
        </View>
    );
}