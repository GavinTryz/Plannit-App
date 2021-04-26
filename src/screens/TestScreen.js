import React from 'react';
import { View, Text } from 'react-native';

import axios from 'axios';

import { Input, TextLink, Loading, Button } from './common';

export default function TestScreen ({navigation, route}) {
	const {eventName, key} = route.params;

	return (
		<View>
			<Text>{"Display the event with the id: " + key + "\nThat is this event: " + eventName}</Text>
		</View>
	);
}