import React, { useState } from 'react';
import { View, Text, Switch, ScrollView } from 'react-native';

import CheckBox			from '@react-native-community/checkbox';
import { Picker }		from '@react-native-picker/picker';
import SelectableGrid	from 'react-native-selectable-grid'

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

import { Input, TextLink, Loading, Button } from '../components/common';
import MainSetWeek from '../components/MainSetWeek'
import styles from "../styles/styles"

export default function NewEvent ({navigation}) {
	const [eventNe,	setEventne]	= useState('');
	const [startTime,	setStarttime]	= useState('0');
	const [endTime,		setEndtime]		= useState('0');
	const [weekly,		setWeekly]		= useState(false);
	const [monday,		setMonday]		= useState(false);
	const [tuesday,		setTuesday]		= useState(false);
	const [wednesday,	setWednesday]	= useState(false);
	const [thursday,	setThursday]	= useState(false);
	const [friday,		setFriday]		= useState(false);
	const [saturday,	setSaturday]	= useState(false);
	const [sunday,		setSunday]		= useState(false);

	const { form_full, section, errorTextStyle, section2, bordered, horizontalRow, checkbox, scrollview, picker } = styles;

	// const timeData = [
	// 	{ label: '00:00' }, { label: '00:00' }, { label: '00:00' }, { label: '00:00' }, { label: '00:00' }, { label: '00:00' }, { label: '00:00' },
	// 	{ label: '00:30' }, { label: '00:30' }, { label: '00:30' }, { label: '00:30' }, { label: '00:30' }, { label: '00:30' }, { label: '00:30' },
	// 	{ label: '01:00' }, { label: '01:00' }, { label: '01:00' }, { label: '01:00' }, { label: '01:00' }, { label: '01:00' }, { label: '01:00' }, 
	// 	{ label: '01:30' }, { label: '01:30' }, { label: '01:30' }, { label: '01:30' }, { label: '01:30' }, { label: '01:30' }, { label: '01:30' },
	// 	{ label: '02:00' }, { label: '02:00' }, { label: '02:00' }, { label: '02:00' }, { label: '02:00' }, { label: '02:00' }, { label: '02:00' }, 
	// 	{ label: '02:30' }, { label: '02:30' }, { label: '02:30' }, { label: '02:30' }, { label: '02:30' }, { label: '02:30' }, { label: '02:30' },
	// 	{ label: '03:00' }, { label: '03:00' }, { label: '03:00' }, { label: '03:00' }, { label: '03:00' }, { label: '03:00' }, { label: '03:00' }, 
	// 	{ label: '03:30' }, { label: '03:30' }, { label: '03:30' }, { label: '03:30' }, { label: '03:30' }, { label: '03:30' }, { label: '03:30' }, 
	// 	{ label: '04:00' }, { label: '04:00' }, { label: '04:00' }, { label: '04:00' }, { label: '04:00' }, { label: '04:00' }, { label: '04:00' }, 
	// 	{ label: '04:30' }, { label: '04:30' }, { label: '04:30' }, { label: '04:30' }, { label: '04:30' }, { label: '04:30' }, { label: '04:30' }, 
	// 	{ label: '05:00' }, { label: '05:00' }, { label: '05:00' }, { label: '05:00' }, { label: '05:00' }, { label: '05:00' }, { label: '05:00' }, 
	// 	{ label: '05:30' }, { label: '05:30' }, { label: '05:30' }, { label: '05:30' }, { label: '05:30' }, { label: '05:30' }, { label: '05:30' }, 
	// 	{ label: '06:00' }, { label: '06:00' }, { label: '06:00' }, { label: '06:00' }, { label: '06:00' }, { label: '06:00' }, { label: '06:00' }, 
	// 	{ label: '06:30' }, { label: '06:30' }, { label: '06:30' }, { label: '06:30' }, { label: '06:30' }, { label: '06:30' }, { label: '06:30' }, 
	// 	{ label: '07:00' }, { label: '07:00' }, { label: '07:00' }, { label: '07:00' }, { label: '07:00' }, { label: '07:00' }, { label: '07:00' }, 
	// 	{ label: '07:30' }, { label: '07:30' }, { label: '07:30' }, { label: '07:30' }, { label: '07:30' }, { label: '07:30' }, { label: '07:30' }, 
	// 	{ label: '08:00' }, { label: '08:00' }, { label: '08:00' }, { label: '08:00' }, { label: '08:00' }, { label: '08:00' }, { label: '08:00' }, 
	// 	{ label: '08:30' }, { label: '08:30' }, { label: '08:30' }, { label: '08:30' }, { label: '08:30' }, { label: '08:30' }, { label: '08:30' }, 
	// 	{ label: '09:00' }, { label: '09:00' }, { label: '09:00' }, { label: '09:00' }, { label: '09:00' }, { label: '09:00' }, { label: '09:00' }, 
	// 	{ label: '09:30' }, { label: '09:30' }, { label: '09:30' }, { label: '09:30' }, { label: '09:30' }, { label: '09:30' }, { label: '09:30' }, 
	// 	{ label: '10:00' }, { label: '10:00' }, { label: '10:00' }, { label: '10:00' }, { label: '10:00' }, { label: '10:00' }, { label: '10:00' }, 
	// 	{ label: '10:30' }, { label: '10:30' }, { label: '10:30' }, { label: '10:30' }, { label: '10:30' }, { label: '10:30' }, { label: '10:30' }, 
	// 	{ label: '11:00' }, { label: '11:00' }, { label: '11:00' }, { label: '11:00' }, { label: '11:00' }, { label: '11:00' }, { label: '11:00' }, 
	// 	{ label: '11:30' }, { label: '11:30' }, { label: '11:30' }, { label: '11:30' }, { label: '11:30' }, { label: '11:30' }, { label: '11:30' }, 
	// 	{ label: '12:00' }, { label: '12:00' }, { label: '12:00' }, { label: '12:00' }, { label: '12:00' }, { label: '12:00' }, { label: '12:00' }, 
	// 	{ label: '12:30' }, { label: '12:30' }, { label: '12:30' }, { label: '12:30' }, { label: '12:30' }, { label: '12:30' }, { label: '12:30' }, 
	// 	{ label: '13:00' }, { label: '13:00' }, { label: '13:00' }, { label: '13:00' }, { label: '13:00' }, { label: '13:00' }, { label: '13:00' }, 
	// 	{ label: '13:30' }, { label: '13:30' }, { label: '13:30' }, { label: '13:30' }, { label: '13:30' }, { label: '13:30' }, { label: '13:30' }, 
	// 	{ label: '14:00' }, { label: '14:00' }, { label: '14:00' }, { label: '14:00' }, { label: '14:00' }, { label: '14:00' }, { label: '14:00' }, 
	// 	{ label: '14:30' }, { label: '14:30' }, { label: '14:30' }, { label: '14:30' }, { label: '14:30' }, { label: '14:30' }, { label: '14:30' }, 
	// 	{ label: '15:00' }, { label: '15:00' }, { label: '15:00' }, { label: '15:00' }, { label: '15:00' }, { label: '15:00' }, { label: '15:00' }, 
	// 	{ label: '15:30' }, { label: '15:30' }, { label: '15:30' }, { label: '15:30' }, { label: '15:30' }, { label: '15:30' }, { label: '15:30' }, 
	// 	{ label: '16:00' }, { label: '16:00' }, { label: '16:00' }, { label: '16:00' }, { label: '16:00' }, { label: '16:00' }, { label: '16:00' }, 
	// 	{ label: '16:30' }, { label: '16:30' }, { label: '16:30' }, { label: '16:30' }, { label: '16:30' }, { label: '16:30' }, { label: '16:30' }, 
	// 	{ label: '17:00' }, { label: '17:00' }, { label: '17:00' }, { label: '17:00' }, { label: '17:00' }, { label: '17:00' }, { label: '17:00' }, 
	// 	{ label: '17:30' }, { label: '17:30' }, { label: '17:30' }, { label: '17:30' }, { label: '17:30' }, { label: '17:30' }, { label: '17:30' }, 
	// 	{ label: '18:00' }, { label: '18:00' }, { label: '18:00' }, { label: '18:00' }, { label: '18:00' }, { label: '18:00' }, { label: '18:00' }, 
	// 	{ label: '18:30' }, { label: '18:30' }, { label: '18:30' }, { label: '18:30' }, { label: '18:30' }, { label: '18:30' }, { label: '18:30' }, 
	// 	{ label: '19:00' }, { label: '19:00' }, { label: '19:00' }, { label: '19:00' }, { label: '19:00' }, { label: '19:00' }, { label: '19:00' }, 
	// 	{ label: '19:30' }, { label: '19:30' }, { label: '19:30' }, { label: '19:30' }, { label: '19:30' }, { label: '19:30' }, { label: '19:30' }, 
	// 	{ label: '20:00' }, { label: '20:00' }, { label: '20:00' }, { label: '20:00' }, { label: '20:00' }, { label: '20:00' }, { label: '20:00' }, 
	// 	{ label: '20:30' }, { label: '20:30' }, { label: '20:30' }, { label: '20:30' }, { label: '20:30' }, { label: '20:30' }, { label: '20:30' }, 
	// 	{ label: '21:00' }, { label: '21:00' }, { label: '21:00' }, { label: '21:00' }, { label: '21:00' }, { label: '21:00' }, { label: '21:00' }, 
	// 	{ label: '21:30' }, { label: '21:30' }, { label: '21:30' }, { label: '21:30' }, { label: '21:30' }, { label: '21:30' }, { label: '21:30' }, 
	// 	{ label: '22:00' }, { label: '22:00' }, { label: '22:00' }, { label: '22:00' }, { label: '22:00' }, { label: '22:00' }, { label: '22:00' }, 
	// 	{ label: '22:30' }, { label: '22:30' }, { label: '22:30' }, { label: '22:30' }, { label: '22:30' }, { label: '22:30' }, { label: '22:30' }, 
	// 	{ label: '23:00' }, { label: '23:00' }, { label: '23:00' }, { label: '23:00' }, { label: '23:00' }, { label: '23:00' }, { label: '23:00' }, 
	// 	{ label: '23:30' }, { label: '23:30' }, { label: '23:30' }, { label: '23:30' }, { label: '23:30' }, { label: '23:30' }, { label: '23:30' }, 
	// ];

	const CreateEvent = async () => {
		var jwtToken = await AsyncStorage.getItem('@jwt');
		var userID = jwt_decode(jwtToken).userId;

		var daysOfWeek = [];

		if (monday)
		{
			daysOfWeek.push("Monday");
		}

		if (tuesday)
		{
			daysOfWeek.push("Tuesday");
		}
		
		if (wednesday)
		{
			daysOfWeek.push("Wednesday");
		}
		
		if (thursday)
		{
			daysOfWeek.push("Thursday");
		}
		
		if (friday)
		{
			daysOfWeek.push("Friday");
		}
		
		if (saturday)
		{
			daysOfWeek.push("Saturday");
		}

		if (sunday)
		{
			daysOfWeek.push("Sunday");
		}



        var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/createEvent', {
            creatorID: userID,
			eventName: eventName,
			startTime: startTime,
			endTime: endTime,
			weekly: weekly,
			daysOfWeek: daysOfWeek,
			jwtToken: jwtToken
		});

		if (response.data.jwtToken) {
			await AsyncStorage.setItem('@jwt', response.data.jwtToken);
		}

		if (response.data.error) {
			setError(response.data.error);
		}
	}

	return (
		<View style={form_full} >
			<ScrollView contentContainerStyle={scrollview}>
				<View style={horizontalRow}>
					<Input
						placeholder="My Event"
						label="Event Ne"
						value={eventNe}
						onChangeText={setEventne}
						/>
				</View>

				<View style={picker}>
					<Text style={{
						textAlign: 'center',
					}}>
						Start Time:
					</Text>
					<Picker
						selectedValue={startTime}
						onValueChange={
							(itemValue, itemIndex) => setStarttime(itemValue)}
						mode='dialog'>
						<Picker.Item	label="12:00" value="1" />
						<Picker.Item	label="12:30" value="2" />
						<Picker.Item	label="1:00"	value="3" />
						<Picker.Item	label="1:30"	value="4" />
						<Picker.Item	label="2:00"	value="5" />
						<Picker.Item	label="2:30"	value="6" />
						<Picker.Item	label="3:00"	value="7" />
						<Picker.Item	label="3:30"	value="8" />
						<Picker.Item	label="4:00"	value="9" />
						<Picker.Item	label="4:30"	value="10" />
						<Picker.Item	label="5:00"	value="11" />
						<Picker.Item	label="5:30"	value="12" />
						<Picker.Item	label="6:00"	value="13" />
						<Picker.Item	label="6:30"	value="14" />
						<Picker.Item	label="7:00"	value="15" />
						<Picker.Item	label="7:30"	value="16" />
						<Picker.Item	label="8:00"	value="17" />
						<Picker.Item	label="8:30"	value="18" />
						<Picker.Item	label="9:00"	value="19" />
						<Picker.Item	label="9:30"	value="20" />
						<Picker.Item	label="10:00" value="21" />
						<Picker.Item	label="10:30" value="22" />
						<Picker.Item	label="11:00" value="23" />
						<Picker.Item	label="11:30" value="24" />
						<Picker.Item	label="12:00" value="25" />
						<Picker.Item	label="12:30" value="26" />
						<Picker.Item	label="1:00"	value="27" />
						<Picker.Item	label="1:30"	value="28" />
						<Picker.Item	label="2:00"	value="29" />
						<Picker.Item	label="2:30"	value="30" />
						<Picker.Item	label="3:00"	value="31" />
						<Picker.Item	label="3:30"	value="32" />
						<Picker.Item	label="4:00"	value="33" />
						<Picker.Item	label="4:30"	value="34" />
						<Picker.Item	label="5:00"	value="35" />
						<Picker.Item	label="5:30"	value="36" />
						<Picker.Item	label="6:00"	value="37" />
						<Picker.Item	label="6:30"	value="38" />
						<Picker.Item	label="7:00"	value="39" />
						<Picker.Item	label="7:30"	value="40" />
						<Picker.Item	label="8:00"	value="41" />
						<Picker.Item	label="8:30"	value="42" />
						<Picker.Item	label="9:00"	value="43" />
						<Picker.Item	label="9:30"	value="44" />
						<Picker.Item	label="10:00" value="45" />
						<Picker.Item	label="10:30" value="46" />
						<Picker.Item	label="11:00" value="47" />
						<Picker.Item	label="11:30" value="48" />
						</Picker>
				</View>

				<View style={picker}>
					<Text style={{
						textAlign: 'center',
					}}>
						End Time:
					</Text>
					<Picker
						selectedValue={endTime}
						onValueChange={
							(itemValue, itemIndex) => setEndtime(itemValue)}
						mode='dialog'>
						<Picker.Item	label="12:00" value="1" />
						<Picker.Item	label="12:30" value="2" />
						<Picker.Item	label="1:00"	value="3" />
						<Picker.Item	label="1:30"	value="4" />
						<Picker.Item	label="2:00"	value="5" />
						<Picker.Item	label="2:30"	value="6" />
						<Picker.Item	label="3:00"	value="7" />
						<Picker.Item	label="3:30"	value="8" />
						<Picker.Item	label="4:00"	value="9" />
						<Picker.Item	label="4:30"	value="10" />
						<Picker.Item	label="5:00"	value="11" />
						<Picker.Item	label="5:30"	value="12" />
						<Picker.Item	label="6:00"	value="13" />
						<Picker.Item	label="6:30"	value="14" />
						<Picker.Item	label="7:00"	value="15" />
						<Picker.Item	label="7:30"	value="16" />
						<Picker.Item	label="8:00"	value="17" />
						<Picker.Item	label="8:30"	value="18" />
						<Picker.Item	label="9:00"	value="19" />
						<Picker.Item	label="9:30"	value="20" />
						<Picker.Item	label="10:00" value="21" />
						<Picker.Item	label="10:30" value="22" />
						<Picker.Item	label="11:00" value="23" />
						<Picker.Item	label="11:30" value="24" />
						<Picker.Item	label="12:00" value="25" />
						<Picker.Item	label="12:30" value="26" />
						<Picker.Item	label="1:00"	value="27" />
						<Picker.Item	label="1:30"	value="28" />
						<Picker.Item	label="2:00"	value="29" />
						<Picker.Item	label="2:30"	value="30" />
						<Picker.Item	label="3:00"	value="31" />
						<Picker.Item	label="3:30"	value="32" />
						<Picker.Item	label="4:00"	value="33" />
						<Picker.Item	label="4:30"	value="34" />
						<Picker.Item	label="5:00"	value="35" />
						<Picker.Item	label="5:30"	value="36" />
						<Picker.Item	label="6:00"	value="37" />
						<Picker.Item	label="6:30"	value="38" />
						<Picker.Item	label="7:00"	value="39" />
						<Picker.Item	label="7:30"	value="40" />
						<Picker.Item	label="8:00"	value="41" />
						<Picker.Item	label="8:30"	value="42" />
						<Picker.Item	label="9:00"	value="43" />
						<Picker.Item	label="9:30"	value="44" />
						<Picker.Item	label="10:00" value="45" />
						<Picker.Item	label="10:30" value="46" />
						<Picker.Item	label="11:00" value="47" />
						<Picker.Item	label="11:30" value="48" />
						</Picker>
				</View>

				<View style={horizontalRow}>
					<Text style={{ fontSize: 18 }}>Weekly</Text>
					<CheckBox
						value={weekly}
						onValueChange={(newValue) => setWeekly(newValue)}
						style={checkbox}
					/>
				</View>
				
				<View style={horizontalRow}>
					<Text style={{ fontSize: 18 }}>Monday</Text>
					<CheckBox
						value={monday}
						onValueChange={(newValue) => setMonday(newValue)}
						style={checkbox}
					/>
					{
					/*monday ? (

					): (

					)*/
					}
				</View>

				<View style={horizontalRow}>
					<Text style={{fontSize:18}}>Tuesday</Text>
					<CheckBox
						value={tuesday}
						onValueChange={(newValue) => setTuesday(newValue)}
						style={checkbox}
					/>
				</View>

				<View style={horizontalRow}>
					<Text style={{fontSize:18}}>Wednesday</Text>
					<CheckBox
						value={wednesday}
						onValueChange={(newValue) => setWednesday(newValue)}
						style={checkbox}
					/>
				</View>

				<View style={horizontalRow}>
					<Text style={{ fontSize: 18 }}>Thursday</Text>
					<CheckBox
						value={thursday}
						onValueChange={(newValue) => setThursday(newValue)}
						style={checkbox}
					/>
				</View>

				<View style={horizontalRow}>
					<Text style={{ fontSize: 18 }}>Friday</Text>
					<CheckBox
						value={friday}
						onValueChange={(newValue) => setFriday(newValue)}
						style={checkbox}
					/>
				</View>

				<View style={horizontalRow}>
					<Text style={{ fontSize: 18 }}>Saturday</Text>
					<CheckBox
						value={saturday}
						onValueChange={(newValue) => setSaturday(newValue)}
						style={checkbox}
					/>
				</View>

				<View style={horizontalRow}>
					<Text style={{ fontSize: 18 }}>Sunday</Text>
					<CheckBox
						value={sunday}
						onValueChange={(newValue) => setSunday(newValue)}
						style={checkbox}
					/>
				</View>

				{//<MainSetWeek />
				}

				{/* <SelectableGrid
					data={timeData}
					maxSelect={336}
					maxPerRow={7}
				/> */}

				<Button
					onPress={CreateEvent}
					title="Create Event"
					color="#841584"
					accessibilityLabel="Create Event button"
					style={{
						height: '10%',

					}}
				/>
			</ScrollView>
		</View>
	);
}