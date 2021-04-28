import React, { useState } from 'react';

import CheckBox from '@react-native-community/checkbox';


export default function WeekCell(props){
    const [checked, setChecked] = useState(isChecked());

    // RN this function id for testing 
    function handleChange(newValue)
    {
        setChecked(newValue);
        //console.log(tok.userId);
        var newWeek = props.week;
        newWeek[props.row][props.col] = newValue;
        props.setWeek(newWeek);   

    }

    function isChecked()
    {
        var check = props.week[props.row][props.col];
        return check;
    }
    
    return(
        <CheckBox disabled={false} onValueChange={(newValue) => handleChange(newValue)} value={checked}/>
    );
}