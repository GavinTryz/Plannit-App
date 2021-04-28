import React from 'react';
import { View, Text, FlatList } from 'react-native';

import axios from 'axios';

import { Input, TextLink, Loading, Button } from './common';
import styles from "../styles/styles"

export default function TestPage ({navigation}) {

    var myVar = ["John", "Kyle", "Xanu, God of Destruction"];

	return (
		<View >
            <FlatList
                keyExtractor={(item, i) => i.toString()}
                data={myVar}
                renderItem={({item}) => (
                    <Text style = {styles.myEventListTitle}>{item}</Text>
                )}
            />
        </View>
	);
}