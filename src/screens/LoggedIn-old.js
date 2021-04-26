import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewEvent from './NewEvent';

const AppNavigator = createStackNavigator();

export default class LoggedIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          userID: -1,
          firstname: "",
          lastname: "",
          showLogin: false
        };
      }

    render() {
        const { section, redTextStyle, buttonView, button } = styles; 
        //const navigation = useNavigation();

        return (
          <View style={section}>   
            <Text>
                {"Hello " + this.props.firstname + ", this is your homepage. Below you may edit and view your events."}
                {"\n"}
            </Text>
            <Text style={redTextStyle}>
                {this.props.userID},
                {this.props.firstname},
                {this.props.lastname},
                {"\n"}
            </Text>
            <View style={buttonView}>
                <Button title="New Event" style={button} color="#485063" onPress={() => this.props.navigation.navigate('NewEvent')}/>
                <Text> {"\n"} </Text>
                <Button title="List Events" style={button} color="#485063"/>
                <Text> {"\n"} </Text>
                <Button title="My Typical Week" style={button} color="#485063"/>
                <Text> {"\n"} </Text>
                <Button title="Notifications" style={button} color="#485063"/>
                <Text> {"\n"} </Text>
            </View>
          </View>
        );
    }
}

/*class NewEvent extends Component {
    render() {
        return(
            <View>
                <Text>This is the NewEvent page</Text>
            </View>
        );
    }
}*/
    
const styles = {
    button: {
        
    },
    buttonView: {
    width: "50%", 
    alignSelf: "center",
    },
    form: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
    },
    section: {
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    },
    redTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
    }
};
    
export { LoggedIn };
//export default createAppContainer(AppNavigator);
