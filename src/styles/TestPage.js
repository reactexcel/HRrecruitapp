import { StyleSheet } from "react-native";
import { COLOR } from "./color";

export default StyleSheet.create({
  descriptionView: {
    borderRadius: 5,
    flex: 1,
    padding: 10,
    backgroundColor: COLOR.LightGrey,
    elevation: 1,
    marginVertical: 5
  },
  helpButton: {
    fontSize: 10,
    textAlign: "center"
  },
  quesCountView: {
    width: "75%",
    alignItems: "flex-start"
  },
  helpButtonView: {
    width: "25%",
    alignItems: "flex-end"
  }
});
