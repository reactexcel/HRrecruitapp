import { StyleSheet } from "react-native";
import { COLOR } from "../color";

export default StyleSheet.create({
  profileView: {
    flexBasis: "35%",
    backgroundColor: "white",
    alignItems: "center",
    paddingBottom: 15
  },
  thumbnail: {
    width: 110,
    height: 110,
    borderRadius: 55
  },
  nameText: {
    fontSize: 20,
    fontFamily: "Montserrat-Medium"
  },
  number: {
    color: COLOR.TURQUOISE,
    fontFamily: "Montserrat-Medium"
  },
  plusIcon: {
    color: COLOR.PINK,
    position: "absolute",
    top: "25%",
    right: "25%"
  }
});
