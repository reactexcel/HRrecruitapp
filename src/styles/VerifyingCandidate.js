import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e3e4d",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  blockView: {
    flex: 0.5,
    width: "90%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    padding: 10,
    marginTop: -40
  },
  headerText: {
    color: "#333333",
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 1,
    textAlign: "center"
  }
});
