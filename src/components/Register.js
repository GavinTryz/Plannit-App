import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { Input, TextLink, Button, Loading } from './common';
import axios from 'axios';

class Register extends Component {


  constructor(props) {
    super(props);
 
   this.state = {
      userId: -1,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      error: '',
      loading: false
      };
      this.register = this.register.bind(this);  
      this.setResponseData = this.setResponseData.bind(this);
  }

  async register() {
    await axios
      .post('https://plannit-cop4331.herokuapp.com/api/register', {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password
      },
      {
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      .then ((response) => this.setState({error: response.data.error}))
      .catch(function (error) {
        Promise.reject(new Error(error));
        console.log(error);
      });

   }

   setResponseData(error) {
      this.setState({
        error: error
      });
   }

  render() {
    const { firstname, lastname, email, password, error, loading } = this.state;
    const { form, section, errorTextStyle } = styles;

    return (
        <Fragment>
            <View style={form}>
            <View style={section}>
                <Input
                  placeholder="john"
                  label="First Name"
                  value={firstname}
                  onChangeText={firstname => this.setState({ firstname })}
                />
              </View>

              <View style={section}>
                <Input
                  placeholder="doe"
                  label="Last Name"
                  value={lastname}
                  onChangeText={lastname => this.setState({ lastname })}
                />
              </View>
              
              <View style={section}>
                <Input
                  placeholder="user@email.com"
                  label="Email"
                  value={email}
                  onChangeText={email => this.setState({ email })}
                />
              </View>

              <View style={section}>
                <Input
                  secureTextEntry
                  placeholder="password"
                  label="Password"
                  value={password}
                  onChangeText={password => this.setState({ password })}
                />
              </View>

              <Text style={errorTextStyle}>
                {error}
              </Text>

              {!loading ?
                <Button onPress={this.register}>
                  Register
                </Button>
                :
                <Loading size={'large'} />}

            </View>

            <TextLink onPress={this.props.switch}>
              Already have an account? Log in!
            </TextLink>
        </Fragment>
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
   errorTextStyle: {
      alignSelf: 'center',
      fontSize: 18,
      color: 'red'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems:'center'
    }  
};

export { Register };