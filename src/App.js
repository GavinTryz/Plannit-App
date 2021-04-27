import React, { useState, useEffect } from 'react';

import { NavigationContainer }  from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Register      from './screens/Register';
import Login         from './screens/Login';
import SendReset     from './screens/SendReset';
import ResetPassword from './screens/ResetPassword';
import LoggedIn      from './screens/LoggedIn';
import NewEvent      from './screens/NewEvent';
import ListEvents    from './screens/ListEvents';
import MyWeek        from './screens/MyWeek';
import TestScreen    from './screens/TestScreen';
import ViewEvent     from './screens/ViewEvent';

const Stack = createStackNavigator();

function App({navigation}) {
    const [jwtToken,    setJwtToken]    = React.useState(null);
    //const [firstRun,    setFirstrun]    = React.useState(true)

    /*const SetJWT = (token, id) => {
        var ud = jwt_decode(token);
        setJwtToken(    token);
        setFirstname(   ud.firstName);
        setLastname(    ud.lastName);
        setUserID(      ud.userId);        
    }

    const readItemFromStorage = async () => {
        setFirstname(AsyncStorage.getItem('@firstName'));
        setLastname(AsyncStorage.getItem('@lastName'));
        setJwtToken(AsyncStorage.getItem('@jwtToken'));
    };

    const writeItemToStorage = async (first, last, jwt) => {
        AsyncStorage.setItem('@firstName',   first);
        AsyncStorage.setItem('@lastName',    last);
        AsyncStorage.setItem('@jwtToken',    jwt);
    };

    useEffect(() => {
        writeItemToStorage("john", "doe", "jwt");
        readItemFromStorage;
    });*/

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
                        name='TestScreen'
                        component={TestScreen} 
                    />
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
                </Stack.Navigator>
            )}  
        </NavigationContainer>  
    );
}

export default App;