import React, { Component } from 'react';
import { Loading } from './components/common/';
import Start from './screens/Start';
import LoggedIn from './screens/LoggedIn';
import jwt_decode from 'jwt-decode';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      jwtToken: null,
      userID: -1,
      firstname: "",
      lastname: ""
    }
    this.setJWT = this.setJWT.bind(this);
  }

  setJWT(jwtToken, userID){
    var ud = jwt_decode(jwtToken);
    console.log(ud.userID);
    this.setState({
      jwtToken: jwtToken,
      firstname: ud.firstName,
      lastname: ud.lastName,
      userID: ud.userId
    });
  }

  render() {
     if (!this.state.jwtToken) {
      return (
        <Start setJWT={this.setJWT}/>
      );
    } else if (this.state.jwtToken) {
      return (
        <LoggedIn userID={this.state.userID} jwtToken={this.state.jwtToken} firstname = {this.state.firstname} lastname = {this.state.lastname}/>
      );
    }
  }
}