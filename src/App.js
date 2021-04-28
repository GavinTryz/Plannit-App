import React, { useState, useEffect } from 'react';

import { NavigationContainer }  from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Register      from './screens/Register';
import Login         from './screens/Login';
import SendReset     from './screens/SendReset';
import ResetPassword from './screens/ResetPassword';
import LoggedIn      from './screens/LoggedIn';
import NewEvent      from './screens/NewEvent';
import MyWeek        from './screens/MyWeek';
import ViewEvent     from './screens/ViewEvent';
import InviteUsers   from './screens/InviteUsers';
import SetEventAvail from './screens/SetEventAvail';
import TestPage      from './screens/TestPage';


import styles from "./styles/styles"

const Stack = createStackNavigator();

export default function App({navigation}) {
    const [jwtToken, setJwtToken] = React.useState(null);

    const { headerStyle, headerTitleStyle } = styles; 

    return (
        <NavigationContainer>
            { jwtToken !== null ? (
                <Stack.Navigator initialRouteName = 'My Events'>
                    <Stack.Screen 
                        name='My Events' // Previously called Home
                        component={LoggedIn}
                        options={{
                            headerStyle: headerStyle,
                            headerTitleStyle: headerTitleStyle,
                            headerTintColor: 'white',
                        }}
                    />
                    <Stack.Screen 
                        name='New Event' 
                        component={NewEvent}
                        options={{
                            headerStyle: headerStyle,
                            headerTitleStyle: headerTitleStyle,
                            headerTintColor: 'white',
                        }}
                    />
                    <Stack.Screen 
                        name='View Event' 
                        component={ViewEvent}
                        options={{
                            headerStyle: headerStyle,
                            headerTitleStyle: headerTitleStyle,
                            headerTintColor: 'white',
                        }}
                    />
                    <Stack.Screen 
                        name='My Typical Week' 
                        component={MyWeek}
                        options={{
                            headerStyle: headerStyle,
                            headerTitleStyle: headerTitleStyle,
                            headerTintColor: 'white',
                        }}
                    />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator initialRouteName = 'Login'>
                    <Stack.Screen 
                        name='Login'
                        component={Login}
                        options={{
                            headerStyle: headerStyle,
                            headerTitleStyle: headerTitleStyle,
                            headerTintColor: 'white',
                        }}
                    />
                    <Stack.Screen 
                        name='Register'
                        component={Register} 
                        options={{
                            headerStyle: headerStyle,
                            headerTitleStyle: headerTitleStyle,
                            headerTintColor: 'white',
                        }}
                    />
                    <Stack.Screen 
                        name='Send Reset' 
                        component={SendReset} 
                        options={{
                            headerStyle: headerStyle,
                            headerTitleStyle: headerTitleStyle,
                            headerTintColor: 'white',
                        }}
                    />
                    <Stack.Screen 
                        name='Reset Password' 
                        component={ResetPassword} 
                        options={{
                            headerStyle: headerStyle,
                            headerTitleStyle: headerTitleStyle,
                            headerTintColor: 'white',
                        }}
                    />
                    <Stack.Screen 
                        name='My Events' // Previously called Home
                        component={LoggedIn} 
                        options={{
                            headerStyle: headerStyle,
                            headerTitleStyle: headerTitleStyle,
                            headerTintColor: 'white',
                        }}
                    />
                    <Stack.Screen 
                        name='New Event' 
                        component={NewEvent}
                        options={{
                            headerStyle: headerStyle,
                            headerTitleStyle: headerTitleStyle,
                            headerTintColor: 'white',
                        }}
                    />
                    <Stack.Screen 
                        name='View Event' 
                        component={ViewEvent} 
                        options={{
                            headerStyle: headerStyle,
                            headerTitleStyle: headerTitleStyle,
                            headerTintColor: 'white',
                        }}
                    />
                    <Stack.Screen 
                        name='My Typical Week' 
                        component={MyWeek} 
                        options={{
                            headerStyle: headerStyle,
                            headerTitleStyle: headerTitleStyle,
                            headerTintColor: 'white',
                        }}
                    />
                    <Stack.Screen 
                        name='Invite Users' 
                        component={InviteUsers} 
                        options={{
                            headerStyle: headerStyle,
                            headerTitleStyle: headerTitleStyle,
                            headerTintColor: 'white',
                        }}
                    />
                    <Stack.Screen 
                        name='Set Event Availability' 
                        component={SetEventAvail} 
                        options={{
                            headerStyle: headerStyle,
                            headerTitleStyle: headerTitleStyle,
                            headerTintColor: 'white',
                        }}
                    />
                    <Stack.Screen 
                        name='Test Page' 
                        component={TestPage} 
                    />
                </Stack.Navigator>
            )}  
        </NavigationContainer>  
    );
}
