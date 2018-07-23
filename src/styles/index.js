import { StyleSheet, Platform, Dimensions } from "react-native";
var { height, width } = Dimensions.get('window');
import { COLOR } from "./color";

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BGCOLOR
  },
  logoView: {
    height: Platform.OS === "ios" ? 170 : 125,
    justifyContent: "center",
    alignItems: "center"
  },
  blockView: {
    justifyContent:'center',
    alignItems: 'center',
    width: width * 0.93,
    borderRadius: 5,
    padding: 10
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
    color: COLOR.Black,
    fontSize: Platform.OS === "ios" ? 17 : 15,
    fontWeight: "400",
    letterSpacing: 1
  },
  inputTextView: {
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
  }
});
