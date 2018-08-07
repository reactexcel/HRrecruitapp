import { StyleSheet, Dimensions, Platform } from "react-native";
import { COLOR } from "./color";
var { height, width } = Dimensions.get('window');


export default StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:'#131931'
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:"center",
        marginTop:height*0.20,
        marginBottom:15,
        alignItems:'center'
    },
    subContainer : {
        marginTop: height * 0.02,
    },
    btnStyle:{
        marginTop:8,
        marginLeft:0, 
        alignSelf:'center',
        paddingLeft:28,
        paddingRight:28,
        opacity:0.9,
        backgroundColor:'#254B70'
    },
    btn: {
        height: 36,
        backgroundColor: "#f69f3c", 
        paddingLeft: 14,
        paddingRight: 14
    },
    listContainer: {
        borderWidth:1,
        height: height*0.1567,
        paddingTop:10,
        borderRadius: 3,
        borderBottomWidth: 0,
        elevation: 2,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 8,
        marginTop:25,
        borderRadius:10,
        backgroundColor:"#fefefe"
     },
    logoCnt :{
        top:0,
        bottom:0,
        right:0,
        left:width/2 - 190,
        position: 'absolute',
    },
    logoView:{
        height: Platform.OS === "ios" ? 170 : 135,
        justifyContent: "center",
        alignItems: "center"
    },
    listItem: { 
        height:height*0.16,
        borderWidth: 1, 
        marginLeft: 0,
        marginBottom:0 
    },
    textView :{
        flexDirection: 'column', 
        width: width * 0.68, 
        justifyContent: 'center', 
        marginTop: -34,
        
    },
    text: { 
        color: COLOR.LGONE, 
        alignSelf: 'center', 
        fontWeight: "600" 
    },
    image: { 
        width: 90, 
        height: 90
     },
    listSubContainer: { 
        flex: 0.87, 
        flexDirection: 'row', 
        marginBottom: -36 
    },
    joinBtnStyles:{ 
        fontSize: 14, 
        fontWeight: "100", 
        color: COLOR.LGONE 
    }
});
