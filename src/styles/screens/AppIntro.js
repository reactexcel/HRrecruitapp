import { StyleSheet, Platform, Dimensions } from "react-native";
var { height, width } = Dimensions.get("window");
import { COLOR } from "../color";

export default StyleSheet.create({
  container: {
    width: width,
    justifyContent: "center"
  },
  containerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  images: {
    height: 150,
    width: 150
    // alignSelf: 'center'
  },
  helloImage: {
    height: 110,
    width: 140,
    position: "absolute",
    top: "15%"
  },
  margin: {
    marginTop: 20
  },
  text: {
    color: "black"
  },
  bottomContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: /* COLOR.LGTWO */ 'transparent'
  },
  btnBack: {
    position: "absolute",
    height: 45,
    width: 45,
    borderRadius: 30,
    opacity: 0.1,
    backgroundColor: "black",
    right: -12
  },
  appIntroCardStyle: {
    width: "85%",
    flex: 0.7,
    borderRadius: 10,
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  rawText: {
    color: "#263051",
    fontFamily: "Montserrat-Bold"
  },
  boldText: {
    color: COLOR.MUSTARD,
    fontFamily: "Montserrat-Bold"
  },
  skipText: {
    color: "white",
    fontFamily: "Montserrat-Regular"
  },
  nextView: {
    marginRight: 7,
    marginTop: -10
  },
  nextIcon: {
    opacity: 1,
    color: "white",
    marginTop: 8
  },
  secondImageTextView: {
    flexDirection: "row",
    marginLeft: -15
  },
  fourthImageTextView: {
    position: "relative",
    top: 25,
    right: 48
  }
});
