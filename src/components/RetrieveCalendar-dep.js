import React, { useState } from 'react'
import axios from 'axios';
import './calendarcss.js';
import CalendarInfoOnCell from './CalendarInfoOnCell';

export default function RetrieveCalendar(props) {
    // Objects received from SetCalendar.js
    const dayOfWeekObj = props.daysAvailable;
    const timeObj = props.time;

    const daysOfWeek = ['Time', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const timeData = [
        '12:00AM',  '12:00AM',  '12:00AM',  '12:00AM',  '12:00AM',  '12:00AM',  '12:00AM',
        '12:30AM',  '12:30AM',  '12:30AM',  '12:30AM',  '12:30AM',  '12:30AM',  '12:30AM',
        '1:00AM',   '1:00AM',   '1:00AM',   '1:00AM',   '1:00AM',   '1:00AM',   '1:00AM',
        '1:30AM',   '1:30AM',   '1:30AM',   '1:30AM',   '1:30AM',   '1:30AM',   '1:30AM',
        '2:00AM',   '2:00AM',   '2:00AM',   '2:00AM',   '2:00AM',   '2:00AM',   '2:00AM',
        '2:30AM',   '2:30AM',   '2:30AM',   '2:30AM',   '2:30AM',   '2:30AM',   '2:30AM',
        '3:00AM',   '3:00AM',   '3:00AM',   '3:00AM',   '3:00AM',   '3:00AM',   '3:00AM',
        '3:30AM',   '3:30AM',   '3:30AM',   '3:30AM',   '3:30AM',   '3:30AM',   '3:30AM', 
        '4:00AM',
        '4:30AM',
        '5:00AM',
        '5:30AM',
        '6:00AM',
        '6:30AM',
        '7:00AM',
        '7:30AM',
        '8:00AM',
        '8:30AM',
        '9:00AM',
        '9:30AM',
        '10:00AM',
        '10:30AM',
        '11:00AM',
        '11:30AM',
        '12:00PM', '12:00AM', '12:00AM', '12:00AM', '12:00AM', '12:00AM', '12:00AM',
        '12:30PM', '12:30AM', '12:30AM', '12:30AM', '12:30AM', '12:30AM', '12:30AM',
        '1:00PM', '1:00AM', '1:00AM', '1:00AM', '1:00AM', '1:00AM', '1:00AM',
        '1:30PM', '1:30AM', '1:30AM', '1:30AM', '1:30AM', '1:30AM', '1:30AM',
        '2:00PM', '2:00AM', '2:00AM', '2:00AM', '2:00AM', '2:00AM', '2:00AM',
        '2:30PM', '2:30AM', '2:30AM', '2:30AM', '2:30AM', '2:30AM', '2:30AM',
        '3:00PM', '3:00AM', '3:00AM', '3:00AM', '3:00AM', '3:00AM', '3:00AM',
        '3:30PM', '3:30AM', '3:30AM', '3:30AM', '3:30AM', '3:30AM', '3:30AM',
        '4:00PM',
        '4:30PM',
        '5:00PM',
        '5:30PM',
        '6:00PM',
        '6:30PM',
        '7:00PM',
        '7:30PM',
        '8:00PM',
        '8:30PM',
        '9:00PM',
        '9:30PM',
        '10:00PM',
        '10:30PM',
        '11:00PM',
        '11:30PM',
    ];

    {/*
    const tableCell = (dayOfWeekObj, timeObj, nameofDay) => {
        if (dayOfWeekObj === true)
            return (
                <tr>
                    <CalendarInfoOnCell time={timeObj}          day={nameofDay} calendar={props.calendar} setCalendar={props.setCalendar} />
                    <CalendarInfoOnCell time={timeObj + ':30'}  day={nameofDay} calendar={props.calendar} setCalendar={props.setCalendar} />
                </tr>
            );
        else
            return (
                <tr>
                    <tr><span className="calendarCellOff" /></tr>
                    <tr><span className="calendarCellOff" /></tr>
                </tr>
            );
    }


    const tableHeader = (daysOfWeek, index) => {
        return (
            <th className='calendarTh' key={index}>{daysOfWeek}</th>
        );
    }

    const makecolumns = (timeObj, index) => {
        return (
            <tr key={index}>
                <td className='calendarTd'>{timeToString(timeObj)}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.sunday,      timeObj, 'Sunday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.monday,      timeObj, 'Monday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.tuesday,     timeObj, 'Tuesday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.wednesday,   timeObj, 'Wednesday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.thursday,    timeObj, 'Thursday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.friday,      timeObj, 'Friday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.saturday,    timeObj, 'Saturday')}</td>
            </tr>
        );
    }
    */}

    const timeToString = (time) => {
        const newTime = '';
        if (time > 12) {
            time = time % 12;
            newTime = time.toString() + " p.m.";
        } else if (time == 12) {
            newTime = time.toString() + " p.m.";
        } else {
            newTime = time.toString() + " a.m.";
        }
        return newTime;
    }

    return (
        <View>
            <SelectableGrid
                data={timeData}
            />
        </View>
    );
}