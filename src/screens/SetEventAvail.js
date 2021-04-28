import React, { useState, useEffect } from 'react';
import { Table, Row, Rows} from 'react-native-table-component';
import { View, ScrollView, Button } from 'react-native';

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import WeekCell from "./WeekCell"
import styles from "../styles/styles"

import jwt_decode from 'jwt-decode';

export default function SetEventAvail({ navigation, route }) {
    const { eventID, eventName } = route.params;

    const [error,           setError]           = useState('');
    const [availability,    setAvailability]    = useState([[]]);
	const [availabilityTable, setAvailabilityTable] = useState([[]]);
    const [loading, setLoading] = useState(true);
    const [times, setTimes] = useState(["11:30 PM", "11:00 PM", "10:30 PM", "10:00 PM", "9:30 PM", "9:00 PM", "8:30 PM", "8:00 PM", "7:30 PM", 
    "7:00 PM", "6:30 PM", "6:00 PM", "5:00 PM", "4:30 PM","4:00 PM", "3:30 PM", "3:00 PM", "2:30 PM", "2:00 PM", "1:30 PM", "1:00 PM", "12:30 PM", "12:00 PM",
    "11:00 AM", "11:30 AM", "11:00 AM", "10:30 AM", "10:00 AM", "9:30 AM", "9:00 AM", "8:30 AM", "8:00 AM", "7:30 AM", "7:00 AM", "6:30 AM",
    "6:00 AM", "5:30 AM", "5:00 AM", "4:30 AM", "4:00 AM", "3:30 AM", "3:00 AM", "2:30 AM", "2:00 AM", "1:30 AM", "1:00 AM", "12:30 AM", "12 AM" ]);
    const [widthArray, setWidthArray] = useState([53,48,50,48,50,48,48,48]);

    const { form_full, scrollview, dataWrapper, HeadStyle, centeredText, row, button } = styles;

    useEffect(() => {
        if (loading)
        {
            GrabWeek();
        }
        setLoading(false);
	}, []);

    const GrabWeek = async () => {
        var jwtToken = await AsyncStorage.getItem('@jwt');
        var userID = jwt_decode(jwtToken).userId;

        console.log("jwtToken");
        console.log(jwtToken);

        console.log("UserID");
        console.log(userID);

        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/getWeek', {
            userID: userID,
            jwtToken: jwtToken,
        });

        if (response.data.jwtToken) {
            await AsyncStorage.setItem('@jwt', response.data.jwtToken);
        }

        if (response.data.error) {
            console.log(response.data.error);
            setError(response.data.error);
        } 
        else
        {
            console.log("response");
            console.log(response.data.week);
            var rows = 48;
            var cols = 7;

            var newTable = Array.from({ length: rows }, () => 
            Array.from({ length: cols }, () => false)
            );

            var table = response.data.week;
            for (var i = 0; i < rows; i++)
            {
                for (var j = 0; j < cols; j++)
                {
                    newTable[i][j] = table[j][i];
                }
            }

			setAvailability(newTable);
            console.log("newTable");
            console.log(newTable);
            createTable(newTable);
        }

    }

    const SendWeek = async () => {
        var jwtToken = await AsyncStorage.getItem('@jwt');
        console.log(jwtToken);

        var rows = 7;
        var cols = 48;

        console.log("this worked");

        var table = Array.from({ length: rows }, () => 
            Array.from({ length: cols }, () => false)
            );

        for (var i = 0; i < rows; i++)
        {
            for (var j = 0; j < cols; j++)
            {
                table[i][j] = availability[j][i];
            }
        }

        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/joinEvent', {
            jwtToken: jwtToken,
            eventID: eventID,
            eventName: eventName,
            availability: table,
        });

        if (response.data.jwtToken) {
            await AsyncStorage.setItem('@jwt', response.data.jwtToken);
        }

        if (response.data.error) {
            console.log(response.data.error);
            setError(response.data.error);
        }
        else
        {
            navigation.navigate('My Events');
        }
    }

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
                table[i][j+1] = <WeekCell week={inputTable} row={i} col={j} setWeek={setAvailability}/>
            }

        }

        console.log("displayTable");
        console.log(table);

        setAvailabilityTable(table);
    }

    // Connect to the viewEvent API, and store all the data about the event with the id "key"

	return (
        <View>
            {
                !loading &&
                <View>
                            <View style = {{width: "100%"}}>
                                <Button
                                    onPress={() => SendWeek()}
                                    title="Submit"
                                    color="#841584"
                                    style={button}
                                /> 
                            </View>

                    <ScrollView vertical={true}>                       
                        
                        <View>
                            <Table borderStyle={{borderWidth: 1, borderColor: '#485063'}}>
                                <Row data={["Time","Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]} widthArr={widthArray} style={HeadStyle} textStyle={centeredText}/>
                            </Table>
                            <ScrollView style={dataWrapper}>
                                <Table borderStyle={{borderWidth: 1, borderColor: '#485063'}}>
                                    <Rows data={availabilityTable} 
                                    style={row}
                                    widthArr={widthArray}
                                    textStyle={centeredText}/>
                                </Table>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
                
            }
        </View>            
	);
}