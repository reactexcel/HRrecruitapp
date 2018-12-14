import { StyleSheet } from "react-native";

export default StyleSheet.create({
  textStyle: {
    color: "white",
    marginTop: 6,
    fontFamily: "Montserrat-Regular"
  },
  btnView: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 6
  },
  aboutBtn: {
    backgroundColor: "transparent",
    marginHorizontal: 10,
    borderWidth:4,
    borderColor:'rgba(52, 66, 116, 1)',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation:0
  },
  btnText: {
    fontFamily: "Montserrat-SemiBold"
  }
});
