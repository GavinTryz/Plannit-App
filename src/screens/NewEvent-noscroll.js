import React, { useState } from 'react';
import { View, Text, Switch, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';

import axios from 'axios';

import { Input, TextLink, Loading, Button } from '../components/common';
import styles from "../styles/styles"

export default function NewEvent ({navigation}) {
	const [eventName,	setEventname]	= useState('');
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

	const { form_full, section, errorTextStyle, section2, bordered, horizontalRow, checkbox } = styles;

	return (
		
		<View style={form_full} >
			<View style={section2}>
				<ScrollView>
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

					<View style={{
							minHeight: '15%', 
							borderColor: '#ddd', 
							borderBottomWidth: 2,
						}}>
						<View style={horizontalRow}>
							<Text>Start Time:</Text>
							<Picker
								selectedValue={startTime}
								onValueChange={
									(itemValue, itemIndex) => setStarttime(itemValue)}
								mode='dialog'>
								<Picker.Item	label="12:00AM" value="1" />
								<Picker.Item	label="12:30AM" value="2" />
								<Picker.Item	label="1:00AM"	value="3" />
								<Picker.Item	label="1:30AM"	value="4" />
								<Picker.Item	label="2:00AM"	value="5" />
								<Picker.Item	label="2:30AM"	value="6" />
								<Picker.Item	label="3:00AM"	value="7" />
								<Picker.Item	label="3:30AM"	value="8" />
								<Picker.Item	label="4:00AM"	value="9" />
								<Picker.Item	label="4:30AM"	value="10" />
								<Picker.Item	label="5:00AM"	value="11" />
								<Picker.Item	label="5:30AM"	value="12" />
								<Picker.Item	label="6:00AM"	value="13" />
								<Picker.Item	label="6:30AM"	value="14" />
								<Picker.Item	label="7:00AM"	value="15" />
								<Picker.Item	label="7:30AM"	value="16" />
								<Picker.Item	label="8:00AM"	value="17" />
								<Picker.Item	label="8:30AM"	value="18" />
								<Picker.Item	label="9:00AM"	value="19" />
								<Picker.Item	label="9:30AM"	value="20" />
								<Picker.Item	label="10:00AM" value="21" />
								<Picker.Item	label="10:30AM" value="22" />
								<Picker.Item	label="11:00AM" value="23" />
								<Picker.Item	label="11:30AM" value="24" />
								<Picker.Item	label="12:00PM" value="25" />
								<Picker.Item	label="12:30PM" value="26" />
								<Picker.Item	label="1:00PM"	value="27" />
								<Picker.Item	label="1:30PM"	value="28" />
								<Picker.Item	label="2:00PM"	value="29" />
								<Picker.Item	label="2:30PM"	value="30" />
								<Picker.Item	label="3:00PM"	value="31" />
								<Picker.Item	label="3:30PM"	value="32" />
								<Picker.Item	label="4:00PM"	value="33" />
								<Picker.Item	label="4:30PM"	value="34" />
								<Picker.Item	label="5:00PM"	value="35" />
								<Picker.Item	label="5:30PM"	value="36" />
								<Picker.Item	label="6:00PM"	value="37" />
								<Picker.Item	label="6:30PM"	value="38" />
								<Picker.Item	label="7:00PM"	value="39" />
								<Picker.Item	label="7:30PM"	value="40" />
								<Picker.Item	label="8:00PM"	value="41" />
								<Picker.Item	label="8:30PM"	value="42" />
								<Picker.Item	label="9:00PM"	value="43" />
								<Picker.Item	label="9:30PM"	value="44" />
								<Picker.Item	label="10:00PM" value="45" />
								<Picker.Item	label="10:30PM" value="46" />
								<Picker.Item	label="11:00PM" value="47" />
								<Picker.Item	label="11:30PM" value="48" />
							</Picker>
						</View>
					</View>

					<View style={bordered}>
						<View style={horizontalRow}>
							<Text>End Time:</Text>
							<Picker
								selectedValue={endTime}
								onValueChange={
									(itemValue, itemIndex) => setEndtime(itemValue)}
								mode='dialog'>
								<Picker.Item	label="12:00AM" value="1" />
								<Picker.Item	label="12:30AM" value="2" />
								<Picker.Item	label="1:00AM"	value="3" />
								<Picker.Item	label="1:30AM"	value="4" />
								<Picker.Item	label="2:00AM"	value="5" />
								<Picker.Item	label="2:30AM"	value="6" />
								<Picker.Item	label="3:00AM"	value="7" />
								<Picker.Item	label="3:30AM"	value="8" />
								<Picker.Item	label="4:00AM"	value="9" />
								<Picker.Item	label="4:30AM"	value="10" />
								<Picker.Item	label="5:00AM"	value="11" />
								<Picker.Item	label="5:30AM"	value="12" />
								<Picker.Item	label="6:00AM"	value="13" />
								<Picker.Item	label="6:30AM"	value="14" />
								<Picker.Item	label="7:00AM"	value="15" />
								<Picker.Item	label="7:30AM"	value="16" />
								<Picker.Item	label="8:00AM"	value="17" />
								<Picker.Item	label="8:30AM"	value="18" />
								<Picker.Item	label="9:00AM"	value="19" />
								<Picker.Item	label="9:30AM"	value="20" />
								<Picker.Item	label="10:00AM" value="21" />
								<Picker.Item	label="10:30AM" value="22" />
								<Picker.Item	label="11:00AM" value="23" />
								<Picker.Item	label="11:30AM" value="24" />
								<Picker.Item	label="12:00PM" value="25" />
								<Picker.Item	label="12:30PM" value="26" />
								<Picker.Item	label="1:00PM"	value="27" />
								<Picker.Item	label="1:30PM"	value="28" />
								<Picker.Item	label="2:00PM"	value="29" />
								<Picker.Item	label="2:30PM"	value="30" />
								<Picker.Item	label="3:00PM"	value="31" />
								<Picker.Item	label="3:30PM"	value="32" />
								<Picker.Item	label="4:00PM"	value="33" />
								<Picker.Item	label="4:30PM"	value="34" />
								<Picker.Item	label="5:00PM"	value="35" />
								<Picker.Item	label="5:30PM"	value="36" />
								<Picker.Item	label="6:00PM"	value="37" />
								<Picker.Item	label="6:30PM"	value="38" />
								<Picker.Item	label="7:00PM"	value="39" />
								<Picker.Item	label="7:30PM"	value="40" />
								<Picker.Item	label="8:00PM"	value="41" />
								<Picker.Item	label="8:30PM"	value="42" />
								<Picker.Item	label="9:00PM"	value="43" />
								<Picker.Item	label="9:30PM"	value="44" />
								<Picker.Item	label="10:00PM" value="45" />
								<Picker.Item	label="10:30PM" value="46" />
								<Picker.Item	label="11:00PM" value="47" />
								<Picker.Item	label="11:30PM" value="48" />
							</Picker>
						</View>
					</View>
				
					<View style={bordered}>
						<View style={horizontalRow}>
							<Text style={{fontSize:18}}>Weekly</Text>
							<CheckBox
								value={weekly}
								onValueChange={(newValue) => setWeekly(newValue)}
								style={checkbox}
							/>
						</View>
					</View>

					<View style={bordered}>
						<View style={horizontalRow}>
							<Text style={{fontSize:18}}>Monday</Text>
							<CheckBox
								value={monday}
								onValueChange={(newValue) => setMonday(newValue)}
								style={checkbox}
							/>
						</View>
					</View>

					<View style={bordered}>
						<View style={horizontalRow}>
							<Text style={{fontSize:18}}>Tuesday</Text>
							<CheckBox
								value={tuesday}
								onValueChange={(newValue) => setTuesday(newValue)}
								style={checkbox}
							/>
						</View>
					</View>

					<View style={bordered}>
						<View style={horizontalRow}>
							<Text style={{fontSize:18}}>Wednesday</Text>
							<CheckBox
								value={wednesday}
								onValueChange={(newValue) => setWednesday(newValue)}
								style={checkbox}
							/>
						</View>
					</View>

					<View style={bordered}>
						<View style={horizontalRow}>
							<Text style={{fontSize:18}}>Thursday</Text>
							<CheckBox
								value={thursday}
								onValueChange={(newValue) => setThursday(newValue)}
								style={checkbox}
							/>
						</View>
					</View>

					<View style={bordered}>
						<View style={horizontalRow}>
							<Text style={{fontSize:18}}>Friday</Text>
							<CheckBox
								value={friday}
								onValueChange={(newValue) => setFriday(newValue)}
								style={checkbox}
							/>
						</View>
					</View>

					<View style={bordered}>
						<View style={horizontalRow}>
							<Text style={{fontSize:18}}>Saturday</Text>
							<CheckBox
								value={saturday}
								onValueChange={(newValue) => setSaturday(newValue)}
								style={checkbox}
							/>
						</View>
					</View>

					<View style={bordered}>
						<View style={horizontalRow}>
							<Text style={{fontSize:18}}>Sunday</Text>
							<CheckBox
								value={sunday}
								onValueChange={(newValue) => setSunday(newValue)}
								style={checkbox}
							/>
						</View>
					</View>
				</ScrollView>
			</View>
		</View>
	);
}