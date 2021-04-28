import React, { useState} from 'react';
import { View, Text } from 'react-native';

import axios from 'axios';

import { Input, Loading, Button } from '../components/common';
import styles from "../styles/styles"

export default function Login ({navigation}) {
    const [code,            setCode]            = useState('');
    const [password,        setPassword]        = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading,         setLoading]         = useState(false);
    const [error,           setError]           = useState(false);

    const { form, section, errorTextStyle } = styles;

    const ResetPassword = async () => {

        if (password !== confirmPassword) {
            setError("Passwords do not match");
        } else {    
            var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/resetPassword', {
                token: code,
                password: password
            });
            
            setError(response.data.error);

            if (response.data.error === "") {
                navigation.navigate('Login');
            }
        }
    }

    return (
        <View style={form}>
            <View>
                <View style={section}>
                    <Input
                        label="Verification Code"
                        value={code}
                        onChangeText={setCode}
                    />
                </View>

                <View style={section}>
                    <Input
                        label="New Password"
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <View style={section}>
                    <Input
                        label="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>

                <Text style={errorTextStyle}>
                    {error}
                </Text>

                {!loading ?
                    <Button onPress={ResetPassword}> Reset Password </Button>
                    :
                    <Loading size={'large'} />
                }
            </View>
        </View>
    );
}