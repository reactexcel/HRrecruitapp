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
    width: 35
  },
  radio_ios : {
    borderWidth : 2,
    borderRadius : 12,
    height : 20,
    width :20,
    alignItems : 'center',
    justifyContent : 'center',
    paddingBottom : 5,
    borderColor : COLOR.DarkGrey
  }
});
