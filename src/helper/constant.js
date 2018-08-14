import { Dimensions } from "react-native";
import { COLOR } from "../styles/color";

export const SUCCESS_STATUS = 1;

export const ABOUT_US =
  "We are India based IT Services company found in August 2009, with the vision to provide excellence in software solutions. We work with US clients on web development projects. Our current team strength is 45+ and we are operating from Sector 8 Noida.";

export const DEVICE_WIDTH = Dimensions.get("window").width;
export const DEVICE_HEIGHT = Dimensions.get("window").height;

//custom styles for step indicator
export const customStyles = {
  stepIndicatorSize: 10,
  currentStepIndicatorSize: 10,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: COLOR.MUSTARD,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: COLOR.MUSTARD,
  stepStrokeUnFinishedColor: "#7d7885",
  separatorFinishedColor: COLOR.MUSTARD,
  separatorUnFinishedColor: "#7d7885",
  stepIndicatorFinishedColor: COLOR.MUSTARD,
  stepIndicatorUnFinishedColor: "#7d7885",
  stepIndicatorCurrentColor: COLOR.MUSTARD,
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: "transparent",
  stepIndicatorLabelFinishedColor: "transparent",
  stepIndicatorLabelUnFinishedColor: "transparent",
  labelColor: "#7d7885",
  labelSize: 10,
  currentStepLabelColor: COLOR.MUSTARD
};
