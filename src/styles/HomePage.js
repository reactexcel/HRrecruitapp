import { StyleSheet, Dimensions, Platform } from "react-native";
import { COLOR } from "./color";
var { height, width } = Dimensions.get('window');


export default StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:'white'
    },
    bckgndImage: {
        marginTop:-35,
        height: height * 0.42, 
        width : width 
    },
    avatar:{
        padding:10,
        position: 'absolute',
        top: 130,
        left: (width / 2) - 60,
        alignItems: 'center',
        width: 120,
        height: 120,
        borderRadius: 100,
        backgroundColor:"white",
        elevation:4
    },
    avatarImage:{
        alignSelf: 'center',
        height: 100,
        width : 100 ,
        borderRadius:75,
    },
    btnContainer:{
        marginTop:height*0.040,
        marginBottom:8,
        alignItems:'center'
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
    listContainer: {
        paddingTop:10,
        paddingBottom:8,
        borderRadius: 3,
        borderBottomWidth: 0,
        elevation: 2,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 8,
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
    }
});
