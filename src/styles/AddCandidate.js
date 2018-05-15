import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e3e4d",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  formView : {
    flex: 0.75,
    width: "90%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    padding: 10,
    
  },
  inputText: {
    color: "#333333",
    fontSize: 15,
    fontWeight: "400",
    letterSpacing: 1
  },
  inputTextView : {
      width : '100%'
  },
  headerText: {
    color: "#333333",
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 1
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeef",
    width: "100%"
  },
  picker :{
    width: "98%",
    borderBottomColor: "#c1c0c1",
    borderBottomWidth: 1
  },
  errorText : {
      color : "#ed1040",
      fontSize:12
  }
});
