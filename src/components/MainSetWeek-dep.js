import React, { useState, useEffect } from 'react';
import './Maincss.js'
import RetrieveCalendar from './RetrieveCalendar';
import axios from 'axios';

export default function MainSetWeek() {
    const jwt       = require('jsonwebtoken');
    //const storage   = require('../tokenStorage');
    //const bp = require('./bp');

    const [calendar,    setCalendar]    = useState(createCalendar());
    const [loading,     setLoading]     = useState(false);

    useEffect(() => {
        setLoading(true);
        console.log('using effect');

        const tok = storage.retrieveToken();
        axios.post('https://plannit-cop4331.herokuapp.com/api/getWeek', { userID: jwt.decode(tok).userId, jwtToken: tok })
            .then((res) => {
                console.log(res);
                setCalendar(res.data.week);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const createCalendar = () => {
        const rows = 7;
        const cols = 48;

        const nestedArray = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => false)
        );
        return nestedArray;
    }

    const dayOfWeekObj = {    //what days show on the calendar?
        sunday: true,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true
    };

    const timeArr = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];  //times that show on cal

    const handleSubmit = (event) => {
        event.preventDefault();
        const tok = storage.retrieveToken();
        axios.post(bp.buildPath('api/createWeek'), { week: calendar, userID: jwt.decode(tok).userId, jwtToken: tok })
            .then((results) => {
                console.log(results);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <View style="main">
            <RetrieveCalendar
                daysAvailable={dayOfWeekObj}
                time={timeArr}
                calendar={calendar}
                setCalendar={setCalendar}
                handleSubmit={handleSubmit}
            />
        </View>

    );
}