import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import axios from 'axios';

import { Input, TextLink, Loading, Button } from '../components/common';
import styles from "../styles/styles"

export default function NewEvent ({navigation}) {
	const [eventName,	setEventname]	= useState('');
	const [startTime,	setStarttime]	= useState(-1);
	const [endTime,		setEndtime]		= useState(-1);
	const [weekly,		setWeekly]		= useState(false);
	const [monday,		setMonday]		= useState(false);
	const [tuesday,		setTuesday]		= useState(false);
	const [wednesday,	setWednesday]	= useState(false);
	const [thursday,	setThursday]	= useState(false);
	const [friday,		setFriday]		= useState(false);
	const [saturday,	setSaturday]	= useState(false);
	const [sunday,		setSunday]		= useState(false);

	const { form_full, section, errorTextStyle, section2, bordered, horizontalRow, checkbox } = styles;

	return (
		<View style={form_full} >
			<View style={section2}>
				<View style={bordered}>
					<Text>This is the NewEvent page</Text>
				</View>
				<View 
					style={{
						minHeight: '15%', 
						borderColor: '#ddd', 
						borderBottomWidth: 2,
					}}>
					<Input
						placeholder="My Event"
						label="Event Name"
						value={eventName}
						onChangeText={setEventname}
					/>
				</View>
				
				<View style={bordered}>
					<View style={horizontalRow}>
						<Text style={{fontSize:18}}>Weekly</Text>
						<Switch
							trackColor={{ false: "#767577", true: "#81b0ff" }}
							thumbColor={weekly ? "#f5dd4b" : "#f4f3f4"}
							onValueChange={(newValue) => setWeekly(newValue)}
							value={weekly}
						/>
					</View>
				</View>

				<View style={bordered}>
					<View style={horizontalRow}>
						<Text style={{fontSize:18}}>Monday</Text>
						<Switch
							trackColor={{ false: "#767577", true: "#81b0ff" }}
							thumbColor={monday ? "#f5dd4b" : "#f4f3f4"}
							onValueChange={(newValue) => setMonday(newValue)}
							value={monday}
						/>
					</View>
				</View>

				<View style={bordered}>
					<View style={horizontalRow}>
						<Text style={{fontSize:18}}>Tuesday</Text>
						<Switch
							trackColor={{ false: "#767577", true: "#81b0ff" }}
							thumbColor={tuesday ? "#f5dd4b" : "#f4f3f4"}
							onValueChange={(newValue) => setTuesday(newValue)}
							value={tuesday}
						/>
					</View>
				</View>

				<View style={bordered}>
					<View style={horizontalRow}>
						<Text style={{fontSize:18}}>Wednesday</Text>
						<Switch
							trackColor={{ false: "#767577", true: "#81b0ff" }}
							thumbColor={wednesday ? "#f5dd4b" : "#f4f3f4"}
							onValueChange={(newValue) => setWednesday(newValue)}
							value={wednesday}
						/>
					</View>
				</View>

				<View style={bordered}>
					<View style={horizontalRow}>
						<Text style={{fontSize:18}}>Thursday</Text>
						<Switch
							trackColor={{ false: "#767577", true: "#81b0ff" }}
							thumbColor={thursday ? "#f5dd4b" : "#f4f3f4"}
							onValueChange={(newValue) => setThursday(newValue)}
							value={thursday}
						/>
					</View>
				</View>

				<View style={bordered}>
					<View style={horizontalRow}>
						<Text style={{fontSize:18}}>Friday</Text>
						<Switch
							trackColor={{ false: "#767577", true: "#81b0ff" }}
							thumbColor={friday ? "#f5dd4b" : "#f4f3f4"}
							onValueChange={(newValue) => setFriday(newValue)}
							value={friday}
						/>
					</View>
				</View>

				<View style={bordered}>
					<View style={horizontalRow}>
						<Text style={{fontSize:18}}>Saturday</Text>
						<Switch
							trackColor={{ false: "#767577", true: "#81b0ff" }}
							thumbColor={saturday ? "#f5dd4b" : "#f4f3f4"}
							onValueChange={(newValue) => setSaturday(newValue)}
							value={saturday}
						/>
					</View>
				</View>

				<View style={bordered}>
					<View style={horizontalRow}>
						<Text style={{fontSize:18}}>Sunday</Text>
						<Switch
							trackColor={{ false: "#767577", true: "#81b0ff" }}
							thumbColor={sunday ? "#f5dd4b" : "#f4f3f4"}
							onValueChange={(newValue) => setSunday(newValue)}
							value={sunday}
						/>
					</View>
				</View>
			</View>
		</View>
	);
}