import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#2e3e4d"
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeef",
    width: "100%"
  },
  logoView:{
    height: 125,
    justifyContent: "center",
    alignItems: "center"
  },
  formView: {
    alignItems: "center",
    borderRadius: 5,
    padding: 10
  },
  headerText: {
    color: "#333333",
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 1
  },
  inputText: {
    color: "#333333",
    fontSize: 15,
    fontWeight: "400",
    letterSpacing: 1
  },
  inputTextView: {
    paddingVertical: 10,
    borderBottomWidth: 0
  },
  text: {
    letterSpacing: 1,
    textAlign: "center",
    fontSize: 14,
    color: "#818181"
  }
});
