import React, { useState, useEffect} from 'react';
import { Table, Row, Rows } from 'react-native-table-component';
import { View, Button, ScrollView }   from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../styles/styles"
import WeekCell from "./WeekCell"

import jwt_decode from 'jwt-decode';

import axios from 'axios';

export default function MyWeek ({navigation, route}) {

    const {button} = styles; 

    const [week, setWeek] = useState([[]]);
	const [availabilityTable, setAvailabilityTable] = useState([[]]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [times, setTimes] = useState(["11:30 PM", "11:00 PM", "10:30 PM", "10:00 PM", "9:30 PM", "9:00 PM", "8:30 PM", "8:00 PM", "7:30 PM", 
    "7:00 PM", "6:30 PM", "6:00 PM", "5:00 PM", "4:30 PM","4:00 PM", "3:30 PM", "3:00 PM", "2:30 PM", "2:00 PM", "1:30 PM", "1:00 PM", "12:30 PM", "12:00 PM",
    "11:00 AM", "11:30 AM", "11:00 AM", "10:30 AM", "10:00 AM", "9:30 AM", "9:00 AM", "8:30 AM", "8:00 AM", "7:30 AM", "7:00 AM", "6:30 AM",
    "6:00 AM", "5:30 AM", "5:00 AM", "4:30 AM", "4:00 AM", "3:30 AM", "3:00 AM", "2:30 AM", "2:00 AM", "1:30 AM", "1:00 AM", "12:30 AM", "12 AM" ]);
    const [widthArray, setWidthArray] = useState([53,48,50,48,50,48,48,48]);

	useEffect(() => {
        if (loading)
        {
            GetWeek();
        }
        setLoading(false);
	}, []);

    function createTable(inputTable)
    {
        var rows = 48;
        var cols = 7;

        var table = Array.from({ length: rows }, () => 
        Array.from({ length: (cols + 1) }, () => null)
        );

        for (var i = 0; i < rows; i++)
        {
            table[i][0] = times[i];
            for (var j = 0; j < cols; j++)
            {

                table[i][j+1] = <WeekCell week={inputTable} row={i} col={j} setWeek={setWeek}/>
            }
        }

        setAvailabilityTable(table);
    }

	const GetWeek = async () => {
		var jwtToken = await AsyncStorage.getItem('@jwt');
        var userID = jwt_decode(jwtToken).userId;

        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/getWeek', {
            userID: userID,
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
            var rows = 48;
            var cols = 7;

            var weekTable = Array.from({ length: rows }, () => 
            Array.from({ length: cols }, () => false)
            );

            var table = response.data.week;
            for (var i = 0; i < rows; i++)
            {
                for (var j = 0; j < cols; j++)
                {
                    weekTable[i][j] = table[j][i]
                }
            }

			setWeek(weekTable);
            
            createTable(weekTable);
        }
    }

    const SetWeek = async () => {
		var jwtToken = await AsyncStorage.getItem('@jwt');
        var userID = jwt_decode(jwtToken).userId;

        var rows = 7;
        var cols = 48;

        var weekTable = Array.from({ length: rows }, () => 
            Array.from({ length: cols }, () => false)
            );

        for (var i = 0; i < rows; i++)
        {
            for (var j = 0; j < cols; j++)
            {
                weekTable[i][j] = week[j][i]
            }
        }

        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/createWeek', {
            userID: userID,
            week: weekTable,
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
    }

    // Connect to the viewEvent API, and store all the data about the event with the id "key"

	return (
        <View>
            {
                !loading &&
                <View>
                    <View style={{width: "100%"}}>
                        <Button 
                            title="Set My Typical Week" 
                            style={button} 
                            color="#485063" 
                            onPress={() => SetWeek()}
                        />
                    </View>

                    <ScrollView horizontal={true}>
                        <View>
                            <Table borderStyle={{borderWidth: 1, borderColor: '#485063'}}>
                                <Row data={["Time","Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]} widthArr={widthArray} style={styles.HeadStyle} textStyle={styles.centeredText}/>
                            </Table>
                            <ScrollView style={styles.dataWrapper}>
                                <Table borderStyle={{borderWidth: 1, borderColor: '#485063'}}>
                                    <Rows data={availabilityTable} 
                                    style={styles.row}
                                    widthArr={widthArray}
                                    textStyle={styles.centeredText}/>
                                </Table>
                            </ScrollView>
                        </View>

                    </ScrollView>
                </View>
                
            }
        </View>            
	);
}