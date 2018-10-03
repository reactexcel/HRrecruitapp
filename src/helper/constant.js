import { Dimensions } from "react-native";
import { COLOR } from "../styles/color";

export const SUCCESS_STATUS = 1;

export const ABOUT_US =
  "We are India based IT Services company found in August 2009, with the vision to provide excellence in software solutions. We work with US clients on web development projects. Our current team strength is 45+ and we are operating from Sector 8 Noida.";

export const EXCEL_BELIVE =
  "At Excellence we believe growth is a team sport. We aren't just helping companies globally grow, we are helping more than one thousand employees grow personally and professionally. It's hard to pick our favourite perk here. Here are some of the one we love.";

export const EMP_SAY = "See what employees and candidates say about what it's like to work at Excellence Technologies. Salaries, reviews and more - all posted by employees working at ...";

export const GRW_US='Grow with Us';
export const EDGE_TECH='We work on cutting edge technologies and provide end-to-end solutions in mobile apps and developement';
export const UX_UI='We develope apps using AngularJS,ReactJS,Vue.js';

export const eCommerce='We specialize in full magento customization from module developement to theme designs';

export const M_APPS='We develope cutting adge apps in Android iOS';

export const CLOUD_DEV='We deploy highly scalable backend services on AWS Azure using NodeJS,Laravel';
export const BLK_CHAIN='We develope smart contract & dApps on leading blockchain platforms'

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
