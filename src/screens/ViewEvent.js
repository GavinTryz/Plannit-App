import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Button } from 'react-native';

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';

import jwt_decode	from 'jwt-decode';
import axios		from 'axios';

import styles		from "../styles/styles"

export default function ViewEvent ({navigation, route}) {
	const { eventName, _id } = route.params; // Key is the event ID

	const [weekly,				setWeekly]				= useState(false);
    const [startTime,			setStartTime]			= useState('');
    const [endTime,				setEndTime]				= useState('');
	const [creatorID,			setCreatorID]				= useState('');
	const [error,				setError]				= useState('');
	const [participants,		setParticipants]		= useState([]);
    const [daysOfWeek,			setDaysOfWeek]			= useState([]);
	const [eventTime,			setEventTime]			= useState([]);
	const [availabilityTable,	setAvailabilityTable]	= useState([[]]);
	const [times, setTimes] = useState(["11:30 PM", "11:00 PM", "10:30 PM", "10:00 PM", "9:30 PM", "9:00 PM", "8:30 PM", "8:00 PM", "7:30 PM", 
    "7:00 PM", "6:30 PM", "6:00 PM", "5:30 PM", "5:00 PM", "4:30 PM","4:00 PM", "3:30 PM", "3:00 PM", "2:30 PM", "2:00 PM", "1:30 PM", "1:00 PM", "12:30 PM", 
	"12:00 PM", "11:30 AM", "11:00 AM", "10:30 AM", "10:00 AM", "9:30 AM", "9:00 AM", "8:30 AM", "8:00 AM", "7:30 AM", "7:00 AM", "6:30 AM",
    "6:00 AM", "5:30 AM", "5:00 AM", "4:30 AM", "4:00 AM", "3:30 AM", "3:00 AM", "2:30 AM", "2:00 AM", "1:30 AM", "1:00 AM", "12:30 AM", "12 AM" ]);
	const [widthArray, setWidthArray] = useState([53,48,50,48,50,48,48,48]);
	const [loading, setLoading] = useState(true);

	const { button, form_full } = styles;

	useEffect(() => {
		if (loading)
		{
			ViewEvent();
		}
		setLoading(false);
	}, []);

	const ViewEvent = async () => {
		var jwtToken = await AsyncStorage.getItem('@jwt');

		console.log(_id);

        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/viewEvent', {
            eventID: _id,
			jwtToken: jwtToken
        });
        
		if (response.data.jwtToken) {
            await AsyncStorage.setItem('@jwt', response.data.jwtToken);
        }

        if (response.data.error) {
			console.log	(response.data.error);
            setError	(response.data.error);
        } else {
			setParticipants	(response.data.participants);
			setWeekly		(response.data.weekly);
			setStartTime	(response.data.startTime);
			setEndTime		(response.data.endTime);
			setCreatorID	(response.data.creatorID);
			setDaysOfWeek	(response.data.daysOfWeek);
			setEventTime	(response.data.eventTime);

			createTable(response.data.participants);
        }
    }

	const DeleteEvent = async () => {
		var jwtToken = await AsyncStorage.getItem('@jwt');

        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/deleteEvent', {
            eventID: _id,
			jwtToken: jwtToken
        });
        
		if (response.data.jwtToken) {
            await AsyncStorage.setItem('@jwt', response.data.jwtToken);
        }

        if (response.data.error) {
            setError(response.data.error);
        }
		else
		{
			navigation.navigate('My Events');
		}
    }

	const LeaveEvent = async () => {
		var jwtToken = await AsyncStorage.getItem('@jwt');
		var userID = jwt_decode(jwtToken).userId;

        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/leaveEvent', {
            eventID: _id,
			userID: userID,
			jwtToken: jwtToken
        });
        
		if (response.data.jwtToken) {
            await AsyncStorage.setItem('@jwt', response.data.jwtToken);
        }

        if (response.data.error) {
			console.log	(response.data.error);
            setError	(response.data.error);
        } else {
			navigation.navigate('My Events');
		}
    }

	function createTable(users) {
		const rows = 48;
        const cols = 7;

        var availability = Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => 0)
        );

		for (let i = 0; i < users.length; i++) {
			for (let row = 0; row < rows; row++) {
				for (let col = 0; col < cols; col++) {
                    if(users[i].availability[col][row]) {
                        availability[row][col]++;
                    }
                }
            }
        }

		var finalTable = Array.from({ length: rows }, () => 
			Array.from({ length: (cols + 1) }, () => '')
        );

		for(let i = 0; i < rows; i++) {
			finalTable[i][0] = times[times.length - 1 - i];
			for(let j = 0; j < cols; j++) {
				if (availability[i][j] > 0) {	
					var num = availability[i][j];
					finalTable[i][j+1] = num.toString();
				}
			}
		}

		setAvailabilityTable(finalTable);
	}

	const ChooseTime = async () => {
		var jwtToken = await AsyncStorage.getItem('@jwt');

        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/leaveEvent', {
            eventID: _id,
			eventTime: eventTime,
			jwtToken: jwtToken
        });
        
		if (response.data.jwtToken) {
            await AsyncStorage.setItem('@jwt', response.data.jwtToken);
        }

        if (response.data.error) {
            setError(response.data.error);
        }
    }

    // Connect to the viewEvent API, and store all the data about the event with the id "key"

	return (
		<View style={form_full}>
            <View style={{flexDirection: "row"}}>
                <View style = {{width: "50%"}}>
                    <Button
                        title="Invite Users" 
                        style={button} 
						color="#e29476" 
                        onPress={() => navigation.navigate('Invite Users', {eventName, _id})}
                    />
                </View>
				{_id.localeCompare(creatorID) ? 
				(
					<View style={{width: "50%"}}>
						<Button 
							title="Delete Event" 
							style={button} 
							color="#ed523e" 
							onPress={() => DeleteEvent()}
						/>
					</View>
				) : (
					<View style={{width: "50%"}}>
						<Button 
							title="Leave Event" 
							style={button} 
							color="#ed523e" 
							onPress={() => LeaveEvent()}
						/>
					</View>
				)
				}
                
            </View>

			<ScrollView horizontal={true}>
				<View style={{
					alignContent: "center",
				}}>
					<Table borderStyle={{ borderWidth: 1, borderColor: '#d4d4d4'}}>
						<Row data={["Time", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]} widthArr={widthArray} style={styles.HeadStyle} textStyle={styles.tableHeaderText}/>
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                            <Rows data={availabilityTable} 
							style={styles.row}
							widthArr={widthArray}
							textStyle={styles.tableHeaderText}/>
                        </Table>
                    </ScrollView>
                </View>
			</ScrollView>
		</View>	

	);
}