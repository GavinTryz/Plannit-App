import React, { Component, Fragment, useState, useEffect } from 'react';

import { View, Text } from 'react-native';

import axios from 'axios';

import { Input, TextLink, Loading, Button } from '../components/common';
import styles from "../styles/styles"

export default function Register ({navigation}) {
    const [userID,      setUserID]      = useState(-1);
    const [firstname,   setFirstname]   = useState('');
    const [lastname,    setLastname]    = useState('');
    const [email,       setEmail]       = useState('');
    const [password,    setPassword]    = useState('');
    const [error,       setError]       = useState('');
    const [loading,     setLoading]     = useState(false);

    const register = async () => {
        await axios
        .post('https://plannit-cop4331.herokuapp.com/api/register', 
            {
            firstname:  firstname,
            lastname:   lastname,
            email:      email,
            password:   password
            },
            {
                headers: {
                    'Content-Type' : 'application/json'
                }
        })
        .then ((response) => {setError(response.data.error)})
        .catch(function (error) {
            Promise.reject(new Error(error));
            console.log(error);
        });
    }

    const setResponseData = (e) => {
        setError(e);
    }


   const { form, section, errorTextStyle, centeredText } = styles;

   return (
        <View>
            <View style={form}>
                <View style={section}>
                    <Input
                        placeholder="john"
                        label="First Name"
                        value={firstname}
                        onChangeText={setFirstname}
                    />
                </View>

                <View style={section}>
                    <Input
                        placeholder="doe"
                        label="Last Name"
                        value={lastname}
                        onChangeText={setLastname}
                    />
                </View>
              
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
                    <Button onPress={register}> Register </Button>
                    :
                    <Loading size={'large'} />
                }

            </View>

<<<<<<< HEAD
            <TextLink onPress={() => navigation.navigate('Login')}>
                Already have an account? Log in!
            </TextLink>
=======
            <View style={centeredText}>
                <TextLink onPress={() => navigation.navigate('Login')}>
                    Already have an account? Log in!
                </TextLink>
            </View>
>>>>>>> 387060d7230166478b1d1e1d034366b05712b22b
        </View>
   );
}