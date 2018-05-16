import { StyleSheet } from "react-native";
import {COLOR} from "./color";

export default StyleSheet.create({
  
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.LightGrey,
    width: "100%"
  },
  inputTextView: {
    paddingVertical: 10,
    borderBottomWidth: 0
  },
  text: {
    letterSpacing: 1,
    textAlign: "center",
    fontSize: 14,
    color: COLOR.DarkGrey
  }
});
