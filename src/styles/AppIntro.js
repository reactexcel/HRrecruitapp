import { StyleSheet, Platform, Dimensions } from "react-native";
var { height, width } = Dimensions.get("window");
import { COLOR } from "./color";

export default StyleSheet.create({
  container: {
    width: width,
    justifyContent: "center"
  },
  images: {
    height: 150,
    width: 150
    // alignSelf: 'center'
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
    paddingRight: 15
  },
  btnBack: {
    position: "absolute",
    height: 45,
    width: 45,
    borderRadius: 30,
    opacity: 0.1,
    backgroundColor: "black",
    right: -12
  }
});
