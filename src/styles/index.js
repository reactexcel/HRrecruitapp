import { StyleSheet, Platform, Dimensions } from "react-native";
var { height, width } = Dimensions.get("window");

import { COLOR } from "./color";
import { CardItem } from "native-base";

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BGCOLOR
  },
  logoView: {
    flexBasis: "25%",
    justifyContent: "center",
    alignItems: "center"
  },
  blockView: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.93,
    borderRadius: 5,
    padding: 10,
    borderWidth: 0
  },
  headerText: {
    color: COLOR.Black,
    fontSize: Platform.OS === "ios" ? 22 : 20,
    fontWeight: Platform.OS === "ios" ? "700" : "500",
    letterSpacing: 1,
    textAlign: "center"
  },
  text: {
    fontFamily: "Montserrat-Medium", 
    textAlign: "center",
    // letterSpacing: 0.4,
    color: COLOR.TEXTCOLOR,
    fontSize: 12
  },
  inputText: {
    color: "#7d7885",
    fontSize: Platform.OS === "ios" ? 19 : 17,
    fontWeight: "400",
    letterSpacing: 1
  },
  itemView: {
    paddingVertical: 10,
    borderBottomWidth: 0
  },
  footerView: {
    height: 15,
    backgroundColor: COLOR.BGCOLOR,
    borderTopWidth: 0
  },
  footerText: {
    letterSpacing: 1,
    textAlign: "left",
    fontSize: 10,
    color: "#fff"
  },
  buttonPadder: {
    margin: 10,
    height: 35,
    backgroundColor: COLOR.LGONE,
    marginBottom:15
  },
  descriptionText: {
    width: width * 0.88,
    marginBottom:-20
  },
  cardItem: { 
    justifyContent: "space-between", 
    padding: 0 
  },
  viewDesign: { 
    flexDirection: "column" 
  },
  viewText:{ 
    fontFamily: "Montserrat-SemiBold", 
    fontSize: 12.8, 
    color: COLOR.TURQUOISE 
  },
  iconView: { 
    flexDirection: "row", 
    marginTop: 10 
  },
  viewRow: { 
    flexDirection: "row" 
  },
  viewIcon: { 
    marginTop: 1 
  },
  rowText: { 
    fontFamily: "Montserrat-Medium", 
    color:COLOR.TEXTCOLOR,
    fontSize: 9, 
    marginLeft: 2, 
    marginRight: 10 
  },
  applyBtn: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 1,
    paddingLeft: 1,
    width: 80,
    height: 27,
    marginRight: 10,
    backgroundColor: COLOR.YELLOW,
    justifyContent: "center"
  },
  applyBtnText: {
    fontFamily: "Montserrat-Bold", 
    fontSize: 9,
    alignSelf: "center",
    textAlign: "center"
  }
});
