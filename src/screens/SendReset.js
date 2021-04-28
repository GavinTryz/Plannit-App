import React, { useState } from 'react';
import { View, Text } from 'react-native';

import axios from 'axios';

import { Input, Loading, Button } from '../components/common';
import styles from "../styles/styles"

export default function Login ({navigation}) {
    const [email,       setEmail]       = useState('');
    const [error,       setError]       = useState('');
    const [loading,     setLoading]     = useState(false);

    const { form, section, errorTextStyle } = styles;

    const SendReset = async () => {
        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/sendReset', {
            email:      email
        });
        
        setError(response.data.error);

        if (response.data.error === "") {
            navigation.navigate('Reset Password');
        }
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
                    <Button onPress={[SendReset, console.log("Clicked Send Verification Code")]}> Send Verification Code </Button>
                    :
                    <Loading size={'large'} />
                }
            </View>
        </View>
    );
}