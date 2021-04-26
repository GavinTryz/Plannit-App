import React from 'react';
import {useState} from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import axios from 'axios';

import { Input, TextLink, Loading, Button } from './common';
import { PickerItem } from 'react-native/Libraries/Components/Picker/Picker';

export default function ListEvents ({navigation}) {

	const [people,setName]=useState([
		{name:'Event', key:'123'}, // The key can just be the ID of each meeting
		{name:'Another Event', key:'231'},
		{name:'SomeNameOfAnEvent', key:'342'},
		{name:'Anime Club', key:'4345'},
		{name:'POOP Meeting', key:'5123'},
		{name:'Meeting with Kim Jong Un', key:'6345'},
		{name:'Some other event', key:'67'},
	
	  ])

	return (
		<View style={styles.container}>
			<ScrollView>
				{ people.map((item) => {
					return(
						<View key={item.key}>
							<Text style = {styles.item}>{item.name}</Text>
						</View>
					)
				})}
			</ScrollView>
			
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//backgroundColor: '#fff',
		paddingTop: 40,
		paddingHorizontal: 20
	},
	item: {
		marginTop: 24,
		padding: 30,
		backgroundColor: '#E5E5E5',
		fontSize: 24
	}
})