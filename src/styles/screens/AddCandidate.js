import { StyleSheet, Platform, Dimensions } from "react-native";
var { height, width } = Dimensions.get("window");
import { COLOR } from "../color";

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
    fontSize: 12,
    fontFamily: "Montserrat-SemiBold",
    marginLeft: 15
  },
  text: {
    marginLeft: 10,
    marginRight: 10,
    letterSpacing: 1,
    alignSelf: "center",
    fontSize: Platform.OS === "ios" ? 15 : 15,
    color: "#109aaa",
    fontWeight: Platform.OS === "ios" ? "500" : "400"
  },
  fileName: {
    width: width * 0.7,
    marginLeft: 10,
    marginRight: 10,
    letterSpacing: 1,
    alignSelf: "center",
    fontSize: Platform.OS === "ios" ? 16 : 14,
    color: COLOR.DarkGrey,
    fontWeight: Platform.OS === "ios" ? "400" : "400",
    fontFamily: "Montserrat-SemiBold"
  },
  uploadSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.92,
    marginTop: 10
  },
  uploadIcon: {
    fontSize: 35,
    color: "#f69f3c"
  },
  closeIcon: {
    color: "red",
    fontSize: 30,
    paddingRight: 8
  },
  jobTitleBtn: {
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: "#f69f3c"
  },
  defaultJobBtn: {
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: "#131931",
    borderWidth: 3,
    borderColor: "#19203e"
  },
  checkedBtnText: {
    fontSize: 11,
    color: "black",
    fontFamily: "Montserrat-Medium"
  },
  uncheckedBtnText: {
    fontSize: 11,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Medium"
  },
  labelText: {
    color: COLOR.LTONE,
    fontFamily: "Montserrat-Medium"
  },
  jobTitleView: {
    margin: 6,
    marginBottom: 10
  },
  jobTitleText: {
    alignSelf: "flex-start",
    fontFamily: "Montserrat-Medium"
  },
  jobTitleBtnView: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 15
  },
  //resume
  resumeView: {
    marginLeft: 8
  },
  resumeText: {
    fontFamily: "Montserrat-Medium"
  },
  cloudBtn: {
    marginTop: 5
  },
  resumeErrorText: {
    marginLeft: 10
  },
  acquaintedTitle: {
    marginBottom:5,
    textAlign: "center",
    fontSize: 13,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold"
  },
  acquaintedDescription: {
    textAlign: "center",
    color: COLOR.WHITE,
    fontSize: 11.5,
    fontFamily: "Montserrat-Regular"
  },
  joinNowBtn: {
    backgroundColor: COLOR.MUSTARD
  },
  joinNowBtnText: {
    color: "black",
    fontFamily: "Montserrat-Bold"
  }
});
