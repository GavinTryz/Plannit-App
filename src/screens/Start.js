import React, { Component } from 'react';
import { View } from 'react-native';
import { Login, Register } from '../components';

export default class Start extends Component {

  constructor(props){
    super(props);
    this.state = {
      showLogin: false
    };
    this.switch = this.switch.bind(this);
    this.setPage = this.setPage.bind(this);
  }

  switch() {
      this.setState({
        showLogin : !this.state.showLogin
      });
    }

  setPage() {
    if (!this.state.showLogin)
    {
      return(<Register switch={this.switch}/>);
    }
    else{
      return(<Login switch={this.switch} setJWT={this.props.setJWT}/>);
    }
  }

  render() {
    return(
      <View style={styles.container}>
          {this.setPage()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  }
};