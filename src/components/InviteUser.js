import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function InviteUser(eventID, email, eventName) {
    var jwtToken = await AsyncStorage.getItem('@jwt');

    var response = await axios.post('https://plannit-cop4331.herokuapp.com/api/inviteUser', {
        eventID: eventID,
        email: email,
        eventName: eventName,
        jwtToken: jwtToken
    });
    
    if (response.data.jwtToken) {
        await AsyncStorage.setItem('@jwt', response.data.jwtToken);    
    }

    return response.data.error;
}