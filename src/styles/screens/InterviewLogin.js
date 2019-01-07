import { StyleSheet } from "react-native";
import { COLOR } from "../color";

export default StyleSheet.create({
  textInputView: {
    marginHorizontal: 20
  },
  lgView: {
    flex: 1
  },
  btnView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  btnStyle: {
    backgroundColor: COLOR.MUSTARD
  },
  textStyle: {
    color: COLOR.LGONE,
    // fontFamily: "Montserrat-Bold"
  }
});
