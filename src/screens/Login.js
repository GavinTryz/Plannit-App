import React, { Component, Fragment, useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

import jwt_decode from 'jwt-decode';

import { Input, TextLink, Loading, Button } from '../components/common';
import { App } from '../App';
import styles from "../styles/styles"

export default function Login ({navigation}) {
    const [userID,      setUserID]      = useState(-1);
    const [email,       setEmail]       = useState('');
    const [password,    setPassword]    = useState('');
    const [error,       setError]       = useState('');
    const [loading,     setLoading]     = useState(false);
    const [jwt,         setJwt]         = useState(null);

    const RequestLogin = async () => {
        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/login', {
            email:      email,
            password:   password
        });
        
        if (response.data.jwtToken) {
            await AsyncStorage.setItem('@jwt', response.data.jwtToken); 
            navigation.navigate('My Events'); // Previously called Home
        }
        else
        {
            setError(response.data.error);
        }
    }
    
    const decodeJWT = async (token) => {
        //var token = jwt;
        jwt_decode(token);

        AsyncStorage.setItem('@firstName', JSON.stringify(token.firstName));
        AsyncStorage.setItem('@lastName',  JSON.stringify(token.lastName));
    }

    const { form, section, errorTextStyle, centeredText } = styles;

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

                <Text style={errorTextStyle}>
                    {error}
                </Text>

                {!loading ?
                    <Button onPress={RequestLogin}> Login </Button>
                    :
                    <Loading size={'large'} />
                }
            </View>
            <View style={centeredText}>
                <TextLink onPress={() => navigation.navigate('Send Reset')}>
                    Forgot Password
                </TextLink>
            </View>
            <View style={centeredText}>
                <TextLink onPress={() => navigation.navigate('Register')}>
                    Don't have an account? Register!
                </TextLink>
            </View>
        </View>
    );
}