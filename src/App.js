import React, { useState  } from 'react';

import jwt_decode from 'jwt-decode';

import { NavigationContainer }  from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Loading } from './components/common/';

import Start    from './screens/Start';
import Register from './screens/Register';
import Login    from './screens/Login';
import LoggedIn from './screens/LoggedIn';

const Stack = createStackNavigator();

function App() {
    const [userID,      setUserID]      = useState(-1);
    const [firstname,   setFirstname]   = useState('');
    const [lastname,    setLastname]    = useState('');
    const [jwtToken,    setJwtToken]    = useState(null);
    const [loggedIn,    setLoggedin]    = useState(false)

    const SetJWT = (jwtToken, userID) => {
        var ud = jwt_decode(jwtToken);
        setJwtToken(    jwtToken);
        setFirstname(   ud.firstName);
        setLastname(    ud.lastName);
        setUserID(      ud.userId);
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!loggedIn ? 
                    <Stack.Screen name="Login"      component={Login} />
                    <Stack.Screen name="Register"   component={Register} />
                    :
                    <Stack.Screen name="LoggedIn"   component={LoggedIn} />
                }
            </Stack.Navigator>
        </NavigationContainer>  
    );
}

export default App;