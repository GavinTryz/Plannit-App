import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { Input, TextLink, Loading, Button } from './common';
import axios from 'axios';

export default class NewEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {

		return (
			<View>
				<Text>This is the NewEvent page</Text>
			</View>
		);
	}
}

export { NewEvent };