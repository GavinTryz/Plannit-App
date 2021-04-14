import React, { Component, Fragment, useState } from 'react';

import { View, Text } from 'react-native';

import axios from 'axios';

import { Input, TextLink, Loading, Button } from '../components/common';

export default function Login ({navigation}) {
    const [userID,      setUserID]      = React.useState(-1);
    const [email,       setEmail]       = React.useState('');
    const [password,    setPassword]    = React.useState('');
    const [error,       setError]       = React.useState('');
    const [loading,     setLoading]     = React.useState(false);
    //const [firstRun,    setFirstrun]    = React.useState(false);
    const [jwtToken,    setJwtToken]    = React.useState(null);

    const RequestLogin = async () => {
        await axios
        .post('https://plannit-cop4331.herokuapp.com/api/login', {
            email:      email,
            password:   password
        },
        {
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then((response) =>             
            setError    (response.data.error),
            setUserID   (response.data.userID),
            setJwtToken (response.data.jwtToken),
        )
        .catch(function (error) {
            Promise.reject(new Error(error));
            console.log(error);
        });

        //Navigate to App -> SetJWT (Store data here and call function?)
        App.SetJWT(jwtToken)
        navigation.navigate('LoggedIn')
        //Navigate to LoggedIn
    }

    const { form, section, errorTextStyle } = styles;

    return (
        <View>
            <View style={form}>
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
            <TextLink onPress={navigation.navigate('Register')}>
                Don't have an account? Register!
            </TextLink>
        </View>
    );
}

const styles = {
    form: {
        width: '100%',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    section: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#ddd',
    },
    errorTextStyle: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'red'
    }
};