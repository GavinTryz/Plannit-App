import React, { useState } from 'react';
import { View, Text, Switch, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import jwt_decode from 'jwt-decode';

import { Button, section_LoggedIn } from '../components/common';

export default function SetEventAvail({ navigation, route }) {
    const { jwt, eventID, eventName } = route.params;

    const [enableCustom,    setEnablecustom]    = useState(false);
    const [error,           setError]           = useState('');
    const [availability,    setAvailability]    = useState([]);

    const { form_full, scrollview } = styles;

    var radio_props = [
        { label: 'Typical Week',    value: 0 },
        { label: 'Custom Week',     value: 1 },
    ];

    const GrabWeek = async () => {
        var jwtToken = await AsyncStorage.getItem('@jwt');
        var userID = jwt_decode(jwtToken).userId;

        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/getWeek', {
            creatorID: userID,
            jwtToken: jwtToken,
        });

        if (response.data.jwtToken) {
            await AsyncStorage.setItem('@jwt', response.data.jwtToken);
        }

        if (response.data.error) {
            setError(response.data.error);
        } else {
            setAvailability(response.data.week);
        }

    }

    const SendWeek = async () => {
        var jwtToken = await AsyncStorage.getItem('@jwt');

        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/joinEvent', {
            jwtToken: jwtToken,
            eventID: eventID,
            eventName: eventName,
            availability: availability,
        });

        if (response.data.jwtToken) {
            await AsyncStorage.setItem('@jwt', response.data.jwtToken);
        }
    }

    const Submit = async () => {
        if (enableCustom) {

        } else {
            GrabWeek();
        }
        SendWeek();

        navigation.navigate('My Events');
    }

    return (
        <View style={form_full}>
            <ScrollView contentContainerStyle={scrollview}>
                <Text />
                <View style={section_LoggedIn}>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        labelHorizontal={true}
                        onPress={val => setEnablecustom(val)}
                    />
                    {
                        enableCustom ? (
                            <Text>Availability Input goes here</Text>
                        ) : (
                            <Text></Text>
                        )
                    }
                </View>
                <Button onPress={Submit}>
                    Submit
                </Button>
            </ScrollView>
        </View>
    );
}