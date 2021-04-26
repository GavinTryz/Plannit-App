import { StyleSheet } from 'react-native';

export default styles = StyleSheets.create({
    calendarCell: {
        position: "relative",
        display: "inline-block",
        width: "90px",
        height: "15px",
        cursor: "pointer",
        display: "inline-block",

        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
    },
    calendarCell_input: {
        opacity: "0",
        width: "0",
        height: "0",
    },
    calendarCellOn: {
        position: "absolute",
        backgroundColor: "none",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
    },
    calendarCellOn_before: {
        position: "absolute",
        content: "",
        backgroundColor: "none",
        width: "90px",
        height: "15px",
    },
    calendarCell_input_checked, calendarCellOn: {
        backgroundColor: "rgb(107, 107, 218)",
    },
    calendarTable: {
        marginLeft: "auto",
        marginRight: "auto",
        borderCollapse: "collapse",
        border: "1px solid black",
    },
    calendarTd: {
        //border: "1px solid rgb(45, 56, 105)",
    },
    calendarTh: {
        textAlign: "center",
        //border: "1px solid rgb(45, 56, 105)",
    
    },
    calendarTd: {
        fontSize: "10pt",
        verticalAlign: "top",
    },
    calendarCellOff: {
        position: "relative",
        display: "inline-block",
        width: "90px",
        height: "15px",
        display: "inline-block",

        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgb(177, 177, 177)",
    },

    /*---------View Event Table------------*/
    calendarViewCell: {
        position: "relative",
        display: "inline-block",
        width: "90px",
        height: "15px",
        cursor: "pointer",
        display: "inline-block",
        background: "blue",

        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
    },
    calendarViewCell_hover: {
        background: "rgb(95, 215, 255)",
    },
    calendarViewCell_input: {
        opacity: "0",
        width: "0",
        height: "0",
    },
    participantList: {
        padding: "0 10px 0 10px",
    },
    calendarViewCell_input_checked, calendarCellOn: {
        backgroundColor: "rgb(255, 68, 68)",
    },

})