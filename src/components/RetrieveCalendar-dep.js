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
        '12:00',  '12:00',  '12:00',  '12:00',  '12:00',  '12:00',  '12:00',
        '12:30',  '12:30',  '12:30',  '12:30',  '12:30',  '12:30',  '12:30',
        '1:00',   '1:00',   '1:00',   '1:00',   '1:00',   '1:00',   '1:00',
        '1:30',   '1:30',   '1:30',   '1:30',   '1:30',   '1:30',   '1:30',
        '2:00',   '2:00',   '2:00',   '2:00',   '2:00',   '2:00',   '2:00',
        '2:30',   '2:30',   '2:30',   '2:30',   '2:30',   '2:30',   '2:30',
        '3:00',   '3:00',   '3:00',   '3:00',   '3:00',   '3:00',   '3:00',
        '3:30',   '3:30',   '3:30',   '3:30',   '3:30',   '3:30',   '3:30', 
        '4:00',
        '4:30',
        '5:00',
        '5:30',
        '6:00',
        '6:30',
        '7:00',
        '7:30',
        '8:00',
        '8:30',
        '9:00',
        '9:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00', '12:00', '12:00', '12:00', '12:00', '12:00', '12:00',
        '12:30', '12:30', '12:30', '12:30', '12:30', '12:30', '12:30',
        '1:00', '1:00', '1:00', '1:00', '1:00', '1:00', '1:00',
        '1:30', '1:30', '1:30', '1:30', '1:30', '1:30', '1:30',
        '2:00', '2:00', '2:00', '2:00', '2:00', '2:00', '2:00',
        '2:30', '2:30', '2:30', '2:30', '2:30', '2:30', '2:30',
        '3:00', '3:00', '3:00', '3:00', '3:00', '3:00', '3:00',
        '3:30', '3:30', '3:30', '3:30', '3:30', '3:30', '3:30',
        '4:00',
        '4:30',
        '5:00',
        '5:30',
        '6:00',
        '6:30',
        '7:00',
        '7:30',
        '8:00',
        '8:30',
        '9:00',
        '9:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
    ];

    {/*
    const tableCell = (dayOfWeekObj, timeObj, neofDay) => {
        if (dayOfWeekObj === true)
            return (
                <tr>
                    <CalendarInfoOnCell time={timeObj}          day={neofDay} calendar={props.calendar} setCalendar={props.setCalendar} />
                    <CalendarInfoOnCell time={timeObj + ':30'}  day={neofDay} calendar={props.calendar} setCalendar={props.setCalendar} />
                </tr>
            );
        else
            return (
                <tr>
                    <tr><span classNe="calendarCellOff" /></tr>
                    <tr><span classNe="calendarCellOff" /></tr>
                </tr>
            );
    }


    const tableHeader = (daysOfWeek, index) => {
        return (
            <th classNe='calendarTh' key={index}>{daysOfWeek}</th>
        );
    }

    const makecolumns = (timeObj, index) => {
        return (
            <tr key={index}>
                <td classNe='calendarTd'>{timeToString(timeObj)}</td>
                <td classNe='calendarTd'>{tableCell(dayOfWeekObj.sunday,      timeObj, 'Sunday')}</td>
                <td classNe='calendarTd'>{tableCell(dayOfWeekObj.monday,      timeObj, 'Monday')}</td>
                <td classNe='calendarTd'>{tableCell(dayOfWeekObj.tuesday,     timeObj, 'Tuesday')}</td>
                <td classNe='calendarTd'>{tableCell(dayOfWeekObj.wednesday,   timeObj, 'Wednesday')}</td>
                <td classNe='calendarTd'>{tableCell(dayOfWeekObj.thursday,    timeObj, 'Thursday')}</td>
                <td classNe='calendarTd'>{tableCell(dayOfWeekObj.friday,      timeObj, 'Friday')}</td>
                <td classNe='calendarTd'>{tableCell(dayOfWeekObj.saturday,    timeObj, 'Saturday')}</td>
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
