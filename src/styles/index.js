import { StyleSheet } from "react-native";
import { COLOR } from "./color";

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BGCOLOR
  },
  logoView: {
    height: 125,
    justifyContent: "center",
    alignItems: "center"
  },
  blockView: {
    alignItems: "center",
    borderRadius: 5,
    padding: 10
  },
  headerText: {
    color: COLOR.Black,
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 1,
    textAlign: "center"
  },
  text: {
    letterSpacing: 1,
    textAlign: "center",
    fontSize: 14,
    color: COLOR.DarkGrey
  },
  inputText: {
    color: COLOR.Black,
    fontSize: 15,
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
  }
});
