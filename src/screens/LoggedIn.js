import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewEvent from './NewEvent';

const AppNavigator = createStackNavigator();

export default function LoggedIn ({navigation}) {
    const [userID, setUserID] = useState(-1);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [showLogin, setShowlogin] = useState(false);

    const { section, textStyle, buttonView, button } = styles; 
    //const navigation = useNavigation();

    return (
        <View style={section}>   
            <Text>
                {"Hello " + firstname + ", this is your homepage. Below you may edit and view your events."}
                {"\n"}
            </Text>
            <Text style={textStyle}>
                {userID},
                {firstname},
                {lastname},
                {"\n"}
            </Text>
            <View style={buttonView}>
                <Button title="New Event" style={button} color="#485063" onPress={() => navigation.navigate('NewEvent')}/>
                <Text> {"\n"} </Text>
                <Button title="List Events" style={button} color="#485063" onPress={() => navigation.navigate('ListEvents')}/>
                <Text> {"\n"} </Text>
                <Button title="My Typical Week" style={button} color="#485063" onPress={() => navigation.navigate('MyWeek')}/>
                <Text> {"\n"} </Text>
                <Button title="Notifications" style={button} color="#485063" onPress={() => navigation.navigate('Notifications')}/>
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
