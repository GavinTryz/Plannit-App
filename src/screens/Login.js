import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

import { Input, TextLink, Loading, Button } from '../components/common';
import styles   from "../styles/styles"

export default function Login ({navigation}) {
    //const [userID,      setUserID]      = useState(-1);
    const [email,       setEmail]       = useState('');
    const [password,    setPassword]    = useState('');
    const [error,       setError]       = useState('');
    const [loading,     setLoading]     = useState(false);
    //const [jwt,         setJwt]         = useState(null);

    const RequestLogin = async () => {
        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/login', {
            email:      email,
            password:   password
        });
        
        if (response.data.jwtToken) {
            await AsyncStorage.setItem('@jwt', response.data.jwtToken); 
            navigation.navigate('My Events'); // Previously called Home
        } else {
            setError(response.data.error);
        }
    }

    /*
    const decodeJWT = async (token) => {
        //var token = jwt;
        jwt_decode(token);

        AsyncStorage.setItem('@firstName', JSON.stringify(token.firstName));
        AsyncStorage.setItem('@lastName',  JSON.stringify(token.lastName));
    }
    */

    const { form, section, errorTextStyle, centeredText, redTextStyle, textLink } = styles;

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

                <View style={section}>
                    <Input
                        secureTextEntry
                        placeholder="password"
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <Text style={redTextStyle}>
                    {error}
                </Text>

                <Button onPress={RequestLogin}>
                    Login
                </Button>
            </View>

            <View style={centeredText}>
                <Text/>
                <Text
                    onPress={() => navigation.navigate('Send Reset')}
                    style={textLink}
                >
                    Forgot Password
                </Text>
                <Text/>
                <Text
                    onPress={() => navigation.navigate('Register')}
                    style={textLink}
                >
                    Don't have an account? Register!
                </Text>
            </View>
        </View>
    );
}