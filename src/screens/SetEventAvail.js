import React, { useState } from 'react';
import { View, Text, Switch, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import jwt_decode from 'jwt-decode';

import { Button, section_LoggedIn } from '../components/common';

export default function SetEventAvail({ navigation, route }) {
    const { jwt, eventID, eventName } = route.params;

    const [enableCustom,    setEnablecustom]    = useState(false);
    const [error,           setError]           = useState('');
    const [availability,    setAvailability]    = useState([[]]);
	const [availabilityTable, setAvailabilityTable] = useState([[]]);
    const [loading, setLoading] = useState(true);
    const [times, setTimes] = useState(["11:30 PM", "11:00 PM", "10:30 PM", "10:00 PM", "9:30 PM", "9:00 PM", "8:30 PM", "8:00 PM", "7:30 PM", 
    "7:00 PM", "6:30 PM", "6:00 PM", "5:00 PM", "4:30 PM","4:00 PM", "3:30 PM", "3:00 PM", "2:30 PM", "2:00 PM", "1:30 PM", "1:00 PM", "12:30 PM", "12:00 PM",
    "11:00 AM", "11:30 AM", "11:00 AM", "10:30 AM", "10:00 AM", "9:30 AM", "9:00 AM", "8:30 AM", "8:00 AM", "7:30 AM", "7:00 AM", "6:30 AM",
    "6:00 AM", "5:30 AM", "5:00 AM", "4:30 AM", "4:00 AM", "3:30 AM", "3:00 AM", "2:30 AM", "2:00 AM", "1:30 AM", "1:00 AM", "12:30 AM", "12 AM" ]);

    const { form_full, scrollview } = styles;

    useEffect(() => {
        GrabWeek();
        createTable();
        setLoading(false);
	}, []);

    const GrabWeek = async () => {
        var jwtToken = await AsyncStorage.getItem('@jwt');
        var userID = jwt_decode(jwtToken).userId;

        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/getWeek', {
            creatorID: userID,
            jwtToken: jwtToken,
        });

        if (response.data.jwtToken) {
            await AsyncStorage.setItem('@jwt', response.data.jwtToken);
        }

        if (response.data.error) {
            setError(response.data.error);
        } 
        else
        {
            var rows = 48;
            var cols = 7;

            var availabilityTable = Array.from({ length: rows }, () => 
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

			await setAvailability(availabilityTable);
        }

    }

    const SendWeek = async () => {
        var jwtToken = await AsyncStorage.getItem('@jwt');

        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/joinEvent', {
            jwtToken: jwtToken,
            eventID: eventID,
            eventName: eventName,
            availability: availability,
        });

        if (response.data.jwtToken) {
            await AsyncStorage.setItem('@jwt', response.data.jwtToken);
        }
    }

    const Submit = async () => {
        if (enableCustom) {

        } else {
            GrabWeek();
        }
        SendWeek();

        navigation.navigate('My Events');
    }

    function createTable()
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

                table[i][j+1] = <WeekCell week={availability} row={i} col={j} setWeek={setAvailability}/>
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

                    <ScrollView contentContainerStyle={scrollview} horizontal={true}>
                        <View>
                            <Table borderStyle={{borderWidth: 1, borderColor: '#485063'}}>
                                <Row data={["Time","Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]} style={HeadStyle} textStyle={centeredText}/>
                            </Table>
                            <ScrollView style={dataWrapper}>
                                <Table borderStyle={{borderWidth: 1, borderColor: '#485063'}}>
                                    <Rows data={availabilityTable} 
                                    style={row}
                                    widthArr={[48,48,48,48,48,48,48,48]}
                                    textStyle={centeredText}/>
                                </Table>
                            </ScrollView>
                        </View>
                        <Button
                            onPress={Submit}
                            title="Submit"
                            color="#841584"
                            accessibilityLabel="Submit button"
                        />

                    </ScrollView>
                </View>
                
            }
        </View>            
	);

    return (
        <View style={form_full}>
            <ScrollView contentContainerStyle={scrollview}>
                <Text />
                <View style={section_LoggedIn}>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        labelHorizontal={true}
                        onPress={val => setEnablecustom(val)}
                    />
                    {
                        enableCustom ? (
                            <Text>Availability Input goes here</Text>
                        ) : (
                            <Text></Text>
                        )
                    }
                </View>
                <Button onPress={Submit}>
                    Submit
                </Button>
            </ScrollView>
        </View>
    );
}