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
import SetEventAvail from './screens/SetEventAvail'

const Stack = createStackNavigator();

export default function App({navigation}) {
    const [jwtToken, setJwtToken] = React.useState(null);

    return (
        <NavigationContainer>
            { jwtToken !== null ? (
                <Stack.Navigator initialRouteName = 'My Events'>
                    <Stack.Screen 
                        name='My Events' // Previously called Home
                        component={LoggedIn} 
                    />
                    <Stack.Screen 
                        name='New Event' 
                        component={NewEvent} 
                    />
                    <Stack.Screen 
                        name='View Event' 
                        component={ViewEvent} 
                    />
                    <Stack.Screen 
                        name='My Typical Week' 
                        component={MyWeek} 
                    />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator initialRouteName = 'Login'>
                    <Stack.Screen 
                        name='Login'
                        component={Login} 
                    />
                    <Stack.Screen 
                        name='Register'
                        component={Register} 
                    />
                    <Stack.Screen 
                        name='Send Reset' 
                        component={SendReset} 
                    />
                    <Stack.Screen 
                        name='Reset Password' 
                        component={ResetPassword} 
                    />
                    <Stack.Screen 
                        name='My Events' // Previously called Home
                        component={LoggedIn} 
                    />
                    <Stack.Screen 
                        name='New Event' 
                        component={NewEvent} 
                    />
                    <Stack.Screen 
                        name='View Event' 
                        component={ViewEvent} 
                    />
                    <Stack.Screen 
                        name='My Typical Week' 
                        component={MyWeek} 
                    />
                    <Stack.Screen 
                        name='Invite Users' 
                        component={InviteUsers} 
                    />
                    <Stack.Screen 
                        name='Set Event Availability' 
                        component={SetEventAvail} 
                    />
                </Stack.Navigator>
            )}  
        </NavigationContainer>  
    );
}
