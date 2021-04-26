import React from 'react';
import { View, Text } from 'react-native';

import axios from 'axios';

import { Input, TextLink, Loading, Button } from './common';

export default function ViewEvent ({navigation, route}) {
	const {eventName, key} = route.params; // Key is the event ID

    // Connect to the viewEvent API, and store all the data about the event with the id "key"

	return (
		<View>
			<Text>{"Display the event with the id: " + key}</Text>
		</View>
	);
}