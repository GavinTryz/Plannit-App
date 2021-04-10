import React, { Component, Fragment, useState } from 'react';
import { View, Text } from 'react-native';
import { Input, TextLink, Loading, Button } from '../components/common';
import axios from 'axios';
//import Start from '../screens/Start';

export default function Register ({navigation}) {
    const [userID, setUserID] = useState(-1);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const register = async () => {
        await axios
        .post('https://plannit-cop4331.herokuapp.com/api/register', 
            {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
            },
            {
                headers: {
                    'Content-Type' : 'application/json'
                }
        })
        .then ((response) => this.setState({error: response.data.error}))
        .catch(function (error) {
            Promise.reject(new Error(error));
            console.log(error);
        });

    }

    const setResponseData = (e) => {
        setError(e);
    }


   const { form, section, errorTextStyle } = styles;

   return (
        <View>
            <View style={form}>
                <View style={section}>
                    <Input
                    placeholder="john"
                    label="First Name"
                    value={firstname}
                    onChangeText={firstname => this.setState({ firstname })}
                    />
                </View>

                <View style={section}>
                    <Input
                    placeholder="doe"
                    label="Last Name"
                    value={lastname}
                    onChangeText={lastname => this.setState({ lastname })}
                    />
                </View>
              
                <View style={section}>
                    <Input
                    placeholder="user@email.com"
                    label="Email"
                    value={email}
                    onChangeText={email => this.setState({ email })}
                    />
                </View>

                <View style={section}>
                    <Input
                    secureTextEntry
                    placeholder="password"
                    label="Password"
                    value={password}
                    onChangeText={password => this.setState({ password })}
                    />
                </View>

                <Text style={errorTextStyle}>
                    {error}
                </Text>

                {!loading ?
                    <Button onPress={this.register}> Register </Button>
                    :
                    <Loading size={'large'} />
                }

            </View>

            <TextLink onPress={navigation.navigate('Start', {showLogin: true})}>
                Already have an account? Log in!
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
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }  
};