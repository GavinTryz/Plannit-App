import React, { useState, useEffect} from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet }   from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../styles/styles"

import axios from 'axios';

export default function ViewEvent ({navigation, route}) {
	const {eventName, _id} = route.params; // Key is the event ID

    const {button} = styles; 

	const [participants, setParticipants] = useState([]);
    const [weekly, setWeekly] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [daysOfWeek, setDaysOfWeek] = useState([]);
	const [eventTime, setEventTime] = useState([]);
	const [availabilityTable, setAvailabilityTable] = useState([[]]);
    const [error, setError] = useState('');

	useEffect(() => {
		ViewEvent();
		while (!participants)
		{

		}
		createTable();
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

        if (response.data.error) 
		{
			console.log(response.data.error);
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

	function convertDays(daysObject)
	{
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

	function createTable()
	{
		const rows = 48;
        const cols = 7;

        var availability = Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => 0)
        );

        for(let i = 0; i < participants.length; i++)
        {
            for(let row = 0; row < rows; row++)
            {
                for(let col = 0; col < cols; col++)
                {
                    if(participants[i].availability[col][row])
                    {
                        availability[row][col]++;
                    }
                }
            }
        }

		var finalTable = Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => '')
        );

		for(let i = 0; i < rows; i++)
		{
			for(let j = 0; j < cols; j++)
			{
				if (availability[i][j] > 0)
				{	
					var num = availability[i][j];
					finalTable[i][j] = num.toString();
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
            <View style={{flexDirection: "row"}}>
                    <View style = {{width: "50%"}}>
                        <Button
                            title="Invite Users" 
                            style={button} 
                            color="#485063" 
                            onPress={() => navigation.navigate('Invite Users', {eventName, _id})}
                        />
                    </View>
                    <View style={{width: "50%"}}>
                        <Button 
                            title="Leave Event" 
                            style={button} 
                            color="#ed523e" 
                            onPress={() => console.log("Leave pressed")}
                        />
                    </View>
                    
                </View>

			<ScrollView horizontal={true}>
                    <View>
                        <Table borderStyle={{borderWidth: 1, borderColor: '#ffa1d2'}}>
                            <Row data={["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]} style={styles.HeadStyle} textStyle={styles.TableText}/>
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                <Rows data={availabilityTable} 
								style={styles.row}
								widthArr={[50,50,50,50,50,50,50]}
                                textStyle={styles.centeredText}/>
                            </Table>
                        </ScrollView>
                    </View>
			</ScrollView>

			{/*<View style={styles.tableContainer}>
				<Table borderStyle={{borderWidth: 1, borderColor: '#ffa1d2'}}>
					<Row data={["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]} style={styles.HeadStyle} textStyle={styles.TableText}/>
					<Rows data={availabilityTable} style={styles.row} textStyle={styles.TableText}/>
				</Table>
		</View>*/}
			
			{/*<View style={styles.container}>
				<ScrollView horizontal={true}>
					<View>
						<Table borderStyle={{borderColor: '#C1C0B9'}}>
						<Row data={daysOfWeek} widthArr={[100,100,100,100,100,100,100]} style={styles.head} textStyle={styles.text}/>
						</Table>
						<ScrollView style={styles.dataWrapper}>
						<Table borderStyle={{borderColor: '#C1C0B9'}}>
							{
							availabilityTable.map((dataRow, index) => (
								<Row
								key={index}
								data={dataRow}
								widthArr={[100,100,100,100,100,100,100]}
								style={[styles.row, index%2 && {backgroundColor: '#ffffff'}]}
								textStyle={styles.text}
								/>
							))
							}
						</Table>
						</ScrollView>
					</View>
					</ScrollView>
			</View>*/}
			
		</View>
	);
}