import React, { useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

import axios from 'axios';

export default function ViewEvent ({navigation, route}) {
	const {eventName, _id} = route.params; // Key is the event ID

	const [participants, setParticipants] = useState([]);
    const [weekly, setWeekly] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [daysOfWeek, setDaysOfWeek] = useState([]);
	const [eventTime, setEventTime] = useState([]);
    const [error, setError] = useState('');

	useEffect(() => {
		ViewEvent();
	}, []);

	const ViewEvent = async () => {
		var jwtToken = await AsyncStorage.getItem('@jwt');

        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/viewEvent', {
            eventID: _id,
			jwtToken: jwtToken
        });
        
		if (response.data.jwtToken)
        {
            await AsyncStorage.setItem('@jwt', response.data.jwtToken);
        }

        if (response.data.error) {
            setError(response.data.error);
        }
        else
        {
			setParticipants(response.data.participants);
			setWeekly(response.data.weekly);
			setStartTime(response.data.startTime);
			setEndTime(response.data.endTime);
			setDaysOfWeek(response.data.daysOfWeek);
			setEventTime(response.data.eventTime);		
        }
    }

	const DeleteEvent = async () => {
		var jwtToken = await AsyncStorage.getItem('@jwt');

        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/deleteEvent', {
            eventID: _id,
			jwtToken: jwtToken
        });
        
		if (response.data.jwtToken)
        {
            await AsyncStorage.setItem('@jwt', response.data.jwtToken);
        }

        if (response.data.error) 
		{
            setError(response.data.error);
        }
    }

	const LeaveEvent = async () => {
		var jwtToken = await AsyncStorage.getItem('@jwt');
		var userID = jwt_token(jwtToken).userId;

        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/leaveEvent', {
            eventID: _id,
			userID: userID,
			jwtToken: jwtToken
        });
        
		if (response.data.jwtToken)
        {
            await AsyncStorage.setItem('@jwt', response.data.jwtToken);
        }

        if (response.data.error) 
		{
            setError(response.data.error);
        }
    }

	const ChooseTime = async () => {
		var jwtToken = await AsyncStorage.getItem('@jwt');

        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/leaveEvent', {
            eventID: _id,
			eventTime: eventTime,
			jwtToken: jwtToken
        });
        
		if (response.data.jwtToken)
        {
            await AsyncStorage.setItem('@jwt', response.data.jwtToken);
        }

        if (response.data.error) 
		{
            setError(response.data.error);
        }
    }

    // Connect to the viewEvent API, and store all the data about the event with the id "key"

	return (
		<View>
			<Text>{"Display event info " + _id + ", " + weekly + ", " + startTime + ", " + endTime + ", " + eventTime}</Text>
		</View>
	);
}