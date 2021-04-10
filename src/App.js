import React, { useState  } from 'react';
import { Loading } from './components/common/';
import Start from './screens/Start';
import LoggedIn from './screens/LoggedIn';
import jwt_decode from 'jwt-decode';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Register from './screens/Register'
import Login from './screens/Login'

const Stack = createStackNavigator()

export default function App() {
    const [userID, setUserID] = useState(-1);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [jwtToken, setJwtToken] = useState(null);

    const setJWT = (jwtToken, userID) => {
        var ud = jwt_decode(jwtToken);
        setJwtToken(jwtToken);
        setFirstname(ud.firstName);
        setLastname(ud.lastName);
        setUserID(ud.userId);
    }

    //<Start setJWT={setJWT}/>

    if (!jwtToken) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Start">
                    <Stack.Screen
                        component={Start}
                        name="Start"
                    />
                    <Stack.Screen
                        component={Register}
                        name="Register"
                    />
                    <Stack.Screen
                        component={Login}
                        name="Login"
                    />
                </Stack.Navigator>
                
            </NavigationContainer>  
        );
    } else {
        return (
            <NavigationContainer>
                <LoggedIn userID={userID} jwtToken={jwtToken} firstname = {firstname} lastname = {lastname}/>
            </NavigationContainer>
        );
    }
}