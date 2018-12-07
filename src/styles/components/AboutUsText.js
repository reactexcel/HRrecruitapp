import { StyleSheet } from "react-native";
import { COLOR } from "../color";

export default StyleSheet.create({
  descriptionView: {
    // backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  textStyle: {
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.TURQUOISE
  },
  aboutUsView: {
    marginVertical: 10,
    paddingBottom:12
  },
  aboutUs: {
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
    fontSize: 13.5,
    textAlignVertical: "center"
  },
  btnStyle: {
    marginBottom: 15,
    height: 35,
    backgroundColor: COLOR.MUSTARD,
    marginBottom: 10
  }
});
