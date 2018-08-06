import { StyleSheet, Platform, Dimensions } from "react-native";
var { height, width } = Dimensions.get("window");

import { COLOR } from "./color";

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
    backgroundColor:'transparent',
    justifyContent:'center',
    alignItems: 'center',
    width: width * 0.93,
    borderRadius: 5,
    padding: 10,
    borderWidth:0
  },
  headerText: {
    color: COLOR.Black,
    fontSize: Platform.OS === "ios" ? 22 : 20,
    fontWeight: Platform.OS === "ios" ? "700" : "500",
    letterSpacing: 1,
    textAlign: "center"
  },
  text: {
    letterSpacing: 1,
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? 16 : 14,
    color: COLOR.DarkGrey
  },
  inputText: {
    color: "#7d7885",
    fontSize: Platform.OS === "ios" ? 19 : 17,
    fontWeight: "400",
    letterSpacing: 1,
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
  buttonPadder:{
    margin:10,
  },
  descriptionText: {
    width: width * 0.88
  }
});
