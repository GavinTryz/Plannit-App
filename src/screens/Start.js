import React, { useState  } from 'react';
import { View, Text } from 'react-native';
import { Login, Register } from '../components';

export default function Start ({navigation}){
    const [showLogin, setShowLogin] = useState(false);

    const switchShowLogin = () => {
        setShowLogin(!showLogin);
    }

    const setPage = () => {
        if (!showLogin) {
            {() => navigation.navigate('Register')}
            //return(<Register switchShowLogin={this.switchShowLogin}/>);
        } else {
            {() => navigation.navigate('Login')}
            //return(<Login switchShowLogin={switchShowLogin} setJWT={setJWT}/>);
        }
    }

    return(
        //{setPage()}
        <View style={styles.container}>
            <Text style={{ fontSize: 40 }}>
                {"Welcome to Plannit!\n\n"}
            </Text>
            
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }
};