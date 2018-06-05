import { StyleSheet } from "react-native";
import {COLOR} from './color'

export default StyleSheet.create({
  picker: {
    width: "98%",
    borderBottomColor: COLOR.Grey,
    borderBottomWidth: 1,
    marginBottom: 7
  },
  inputTextView: {
    borderBottomWidth: 0,
    width: "100%"
  },
  errorTextView: {
    width: "95%"
  },
  errorText: {
    color: COLOR.Red,
    fontSize: 12
  }
});
