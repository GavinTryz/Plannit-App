import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    centeredText: {
        textAlign: 'center',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        borderTopWidth: 1,
        borderColor: '#ddd',
        textAlign: 'center',
        alignItems: 'stretch',
    },
    section: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#ddd',
    },
    form2: {
        width: '100%',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    section_LoggedIn: {
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#ddd',
    },
    errorTextStyle: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'red'
    },
    button: {
        
    },
    buttonView: {
        width: "50%", 
        alignSelf: "center",
    },
    textStyle: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'red',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    },
    welcomeMessage: {
        width: "70%",
        alignSelf: 'center',
        textAlign: 'center',
    },
    section2: {
        //borderBottomWidth: 1,
        backgroundColor: '#fff',
        //alignItems:'center',
        //justifyContent: 'center',
        //height: "100%",
        width: "80%",
        alignItems: 'stretch',
        flex: 1,
    },
    form_full: {
        borderColor: '#ddd',
        alignItems: 'stretch',
        //justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff',
    },
    bordered: {
        borderColor: '#ddd',
        borderBottomWidth: 2,
        //borderTopWidth: 2,
        height: "12%",
        width: "80%",
        justifyContent: 'center',
        alignItems: 'center',
        
    }, 
    horizontalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        borderColor: '#ddd',
        borderBottomWidth: 2,
    },
    checkbox: {

    },
    scrollview: {
        alignItems: 'center',
    },
    picker: {
        width: "80%",
        borderColor: '#ddd',
        borderBottomWidth: 2,
    },
})