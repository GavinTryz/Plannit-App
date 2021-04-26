import React, { useState } from 'react'
import axios from 'axios';
import './calendarcss.js';
import CalendarInfoOnCell from './CalendarInfoOnCell';

export default function RetrieveCalendar(props) {
    // Objects received from SetCalendar.js
    const dayOfWeekObj = props.daysAvailable;
    const timeObj = props.time;

    const daysOfWeek = ['Time', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
                data={props.calendar}
            />
        </View>
    );
}
