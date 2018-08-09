import { StyleSheet } from "react-native";
import { COLOR } from "./color";
import { DEVICE_WIDTH } from "../helper/constant";

export default StyleSheet.create({
  descriptionView: {
    borderRadius: 5,
    flex: 1,
    padding: 10,
    backgroundColor: COLOR.LightGrey,
    elevation: 1,
    marginVertical: 5
  },
  optText: {
    padding: 2,
    color: COLOR.DarkGrey
  },
  quesCountView: {
    width: "95%",
    alignItems: "flex-start"
  },
  helpButtonView: {
    width: "100%",
    alignItems: "flex-end"
  },
  radio: {
    height: 35,
    width: 35,
    justifyContent: "center"
  },
  radio_ios: {
    borderWidth: 2,
    borderRadius: 12,
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 5,
    borderColor: COLOR.DarkGrey
  },
  accordionHeader: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderRadius: 7,
    marginTop: 7
  },
  accordionStyle: {
    borderWidth: 0
  },
  accordionIcon: {
    fontSize: 18,
    position: "absolute",
    left: DEVICE_WIDTH - 50,
    color: COLOR.TEXTCOLOR
  },
  questionOptionView: {
    backgroundColor: "white",
    marginTop: 7,
    borderRadius: 7,
    paddingBottom: 20
  },
  questionView: {
    padding: 20
  },
  optionsView: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    paddingVertical: 1
  },
  optionText: {
    fontFamily: "Montserrat-Medium",
    color: COLOR.TEXTCOLOR
  },
  questionTextStyle: {
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.TURQUOISE
  },
  accordionHeaderText: {
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.TEXTCOLOR,
    textAlign: "center"
  }
});
