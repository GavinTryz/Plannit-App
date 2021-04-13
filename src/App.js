import React, { useState  } from 'react';
import { Loading } from './components/common/';
import Start from './screens/Start';
import LoggedIn from './screens/LoggedIn';
import jwt_decode from 'jwt-decode';
import Register from './screens/Register';
import Login from './screens/Login';

import { createStore } from 'redux';
import allReducer from './reducers';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const store = createStore(allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                </Stack.Navigator>
            </NavigationContainer>  
        </Provider>
    );

}