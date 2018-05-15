import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#2e3e4d"
  },
  logoView: {
    height: 125,
    justifyContent: "center",
    alignItems: "center"
  },
  formView: {
    alignItems: "center",
    borderRadius: 5,
    padding: 10
  },
  inputText: {
    color: "#333333",
    fontSize: 15,
    fontWeight: "400",
    letterSpacing: 1
  },
  inputTextView: {
    borderBottomWidth: 0,
    width: "100%"
  },
  errorTextView: {
    width: "95%"
  },
  headerText: {
    color: "#333333",
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 1
  },
  horizontalLine: {
    paddingVertical:5,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeef",
    width: "100%"
  },
  picker: {
    width: "98%",
    borderBottomColor: "#c1c0c1",
    borderBottomWidth: 1,
    marginBottom:7
  },
  errorText: {
    color: "#ed1040",
    fontSize: 12
  }
});
