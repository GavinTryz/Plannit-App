import { StyleSheet } from "react-native"

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
        //flex:1
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
        flex: 1
    },
    button: {
        marginTop: 10,
        marginBottom: 10,
		padding: 10
    },
    buttonView: {
        width: "50%", 
        alignSelf: "center",
    },
    redTextStyle: {
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
        height: "80%",
        width: "80%",
        alignItems: 'stretch',
    },
    form_full: {
        borderColor: '#ddd',
        alignItems:'center',
        //justifyContent: 'center',
        //flex: 1,
    },
    bordered: {
        borderColor: '#ddd',
        borderBottomWidth: 2,
        //borderTopWidth: 2,
        height: "12%",
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    }, 
    horizontalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
    },
    checkbox: {

    },
    myEventListContainer: {
		flex: 1,
		//backgroundColor: '#fff',
		paddingTop: 40,
		paddingHorizontal: 20
	},
	myEventListTitle: {
		marginTop: 24,
		padding: 30,
		backgroundColor: '#E5E5E5',
		fontSize: 24
	},
    tableContainer: { 
        flex: 1, 
        padding: 16, 
        paddingTop: 30, 
        backgroundColor: '#ffffff' 
    },
    head: { 
        height: 50, 
        backgroundColor: '#6F7BD9' 
    },
    text: { 
        textAlign: 'center', 
        fontWeight: '200' 
    },
    dataWrapper: { 
        marginTop: -1 
    },
    row: { 
        height: 40, 
        backgroundColor: '#F7F8FA'
    },
    HeadStyle: { 
        height: 50,
        alignContent: "center",
        backgroundColor: '#ffe0f0'
    },
    TableText: { 
        margin: 10
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