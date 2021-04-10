import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { Input, TextLink, Loading, Button } from '../components/common';
import axios from 'axios';


export default function Login ({navigation}) {
    const [userID, setUserID] = useState(-1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [jwtToken, setJwtToken] = useState(null);

    const login = async () => {
        await axios
        .post('https://plannit-cop4331.herokuapp.com/api/login', {
            email: this.state.email,
            password: this.state.password
        },
        {
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then((response) => this.setState({
            error: response.data.error,
            userID: response.data.userID,
            jwtToken: response.data.jwtToken
        }))
        .catch(function (error) {
            Promise.reject(new Error(error));
            console.log(error);
        });

        this.props.setJWT(jwtToken, userID);
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
                    <Button onPress={this.login}> Login </Button>
                    :
                    <Loading size={'large'} />
                }
            </View>
            <TextLink onPress={this.props.switch}>
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