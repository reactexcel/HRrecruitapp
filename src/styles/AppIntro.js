import { StyleSheet, Platform, Dimensions } from "react-native";
var { height, width } = Dimensions.get('window');
import { COLOR } from './color'

export default StyleSheet.create({
    container: {
        width: width, 
        justifyContent: 'center'
    },
    images: { 
        height: 110, 
        width: 140, 
        alignSelf: 'center' 
    },
    margin: {
         marginTop: 20 
    },
    text: { 
        color:'white' 
    },
    bottomContainer: {  
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingLeft: 15, 
        paddingRight: 15 
    }
});