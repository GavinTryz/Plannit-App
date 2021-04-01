import React, { Component } from 'react';
import { View, Text } from 'react-native';


export default class LoggedIn extends Component {
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
        
        const { section, textStyle } = styles;      

        return (
          <View style={section}>   
            <Text style={textStyle}>
                {this.props.userID},
            </Text>

            <Text style={textStyle}>
              {this.props.firstname},
            </Text>

            <Text style={textStyle}>
              {this.props.lastname},
            </Text>
          </View>
        );
      }
    }
    
    const styles = {
      form: {
        width: '100%',
        borderTopWidth: 1,
        borderColor: '#ddd',
      },
      section: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#ddd',
      },
      textStyle: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'red'
      }
    };
    
    export { LoggedIn };
