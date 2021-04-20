import React, { useEffect }     from 'react';
import { View, Text, Button }   from 'react-native';

import { NavigationContainer }  from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import 'react-native-gesture-handler';

import jwt_decode from 'jwt-decode';

export default function LoggedIn ({navigation}) {
    const [userID,      setUserID]      = React.useState(-1);
    const [firstName,   setFirstname]   = React.useState('');
    const [lastName,    setLastname]    = React.useState('');
    const [showLogin,   setShowlogin]   = React.useState(false);

    const { section, textStyle, buttonView, button } = styles; 

    const retrieveInfo = async () => {
        setFirstname(AsyncStorage.getItem('@firstName'));
        setLastname(AsyncStorage.getItem('@lastName'));
    }

    const decodeJWT = async () => {
        var token = AsyncStorage.getItem('@jwt');
        jwt_decode(token);
        setFirstname(JSON.stringify(token.firstName));
        setLastname(JSON.stringify(token.lastName));
        console.log("First: " + JSON.stringify(firstName));
        console.log("Last: "  + JSON.stringify(lastName));

        AsyncStorage.setItem('@firstName', JSON.stringify(firstName));
        AsyncStorage.setItem('@lastName',  JSON.stringify(lastName));
    }

    useEffect(() => {
        retrieveInfo();
        if (firstName == '' || firstName == undefined) {
            decodeJWT();
        }        
        //writeItemToStorage("john", "doe", "jwt");
        //readItemFromStorage;
    }, []);

    return (
        <View style={section}>   
            <Text>
                {"Hello " + firstName + ", this is your homepage. Below you may edit and view your events."}
                {"\n"}
            </Text>
            <Text style={textStyle}>
                {userID + ", " + firstName + ", " + lastName + "\n"}
            </Text>
            <View style={buttonView}>
                <Button 
                    title="New Event" 
                    style={button} 
                    color="#485063" 
                    onPress={() => navigation.navigate('New Event')}
                />
                <Text> {"\n"} </Text>
                <Button 
                    title="List Events" 
                    style={button} 
                    color="#485063" 
                    onPress={() => navigation.navigate('List Events')}
                />
                <Text> {"\n"} </Text>
                <Button 
                    title="My Typical Week" 
                    style={button} 
                    color="#485063" 
                    onPress={() => navigation.navigate('My Typical Week')}
                />
                <Text> {"\n"} </Text>
                <Button 
                    title="Notifications" 
                    style={button} 
                    color="#485063" 
                    onPress={() => navigation.navigate('Notifications')}
                />
                <Text> {"\n"} </Text>
            </View>
        </View>
    );
}
    
const styles = {
    button: {
        
    },
    buttonView: {
        width: "50%", 
        alignSelf: "center",
    },
    form: {
        width: '100%',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    section: {
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#ddd',
    },
    textStyle: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'red'
    }
};
