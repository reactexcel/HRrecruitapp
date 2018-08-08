import { StyleSheet } from "react-native";
import { COLOR } from "./color";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: "5%"
  },
  jobTitle: {
    color: COLOR.TURQUOISE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18
  },
  headerTextStyle: {
    fontFamily: "Montserrat-Bold",
    color: "#253055"
  },
  descriptionText: {
    color: "#253055",
    fontFamily: "Montserrat-Medium"
    
  },
  btnView: {
    flex: 1,
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 50
  },
  btnText: {
    fontFamily: "Montserrat-Bold",
    color: "#253055"
  },
  btnStyle: { backgroundColor: COLOR.MUSTARD },
  keySkillsView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  keySkillsButton: {
    backgroundColor: "#e3e5e9",
    marginVertical: 5,
    height: 40,
    marginRight: 3
  },
  keySkillsButtonText: {
    color: "#253055",
    paddingHorizontal: 15,
    fontFamily: "Montserrat-Bold",
    fontSize:12
  }
});
