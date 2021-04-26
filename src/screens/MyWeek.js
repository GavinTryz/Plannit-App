import React from 'react';
import { View, Text } from 'react-native';

import axios from 'axios';

import { Input, TextLink, Loading, Button } from './common';
import jwt_decode from 'jwt-decode';

export default function MyWeek ({navigation}) {

	const {eventName, _id} = route.params; // Key is the event ID

	const [names, setNames] = useState([]);
    const [week, setWeek] = useState([]);
    const [error, setError] = useState('');

	useEffect(() => {
		ViewEvent();
	}, []);

	const GetWeek = async () => {
		var jwtToken = await AsyncStorage.getItem('@jwt');
		var userID = jwt_decode(jwtToken).userId;

        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/getWeek', {
            userID: userID,
			jwtToken: jwtToken
        });
        
        if (response.data.error) {
            setError(response.data.error);
        }
        else
        {
			await AsyncStorage.setItem('@jwt', response.data.jwtToken);
			setNames(response.data.names);
			setWeek(response.data.week);		
        }
    }

	const CreateWeek = async () => {
		var jwtToken = await AsyncStorage.getItem('@jwt');
		var userID = jwt_decode(jwtToken).userId;

        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/createWeek', {
            userID: userID,
			week: week,
			names: names,
			jwtToken: jwtToken
        });
        
        if (response.data.error) {
            setError(response.data.error);
        }
        else
        {
			await AsyncStorage.setItem('@jwt', response.data.jwtToken);		
        }
    }

	return (
		<View>
			<Text>This is the MyTypicalWeek page</Text>
		</View>
	);
}