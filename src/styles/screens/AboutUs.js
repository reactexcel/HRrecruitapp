import { StyleSheet } from "react-native";
import { COLOR } from "../color";

export default StyleSheet.create({
  childview: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  firstrow: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "center"
  },
  imagename: {
    textAlign: "center",
    fontSize: 16,
    color: "#3aa1af",
    marginTop: 2,
    marginBottom: 5,
    fontFamily: "Montserrat-SemiBold"
  },
  ecom: {
    width: "96%",
    textAlign: "center",
    fontSize: 11,
    marginTop: 0,
    marginLeft: 6,
    color: "#868b9e",
    fontFamily: "Montserrat-SemiBold"
  },
  ux: {
    textAlign: "center",
    fontSize: 11,
    color: "#868b9e",
    fontFamily: "Montserrat-SemiBold"
  },
  edge: {
    textAlign: "center",
    fontSize: 12,
    color: "#5b637d",
    fontFamily: "Montserrat-SemiBold",
    marginLeft: 5,
    marginRight: 5,
    fontWeight: "100"
  },
  grw: {
    marginTop: 18,
    textAlign: "center",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
    color: "#3aa1af"
  },
  secondrow: {
    width: "50%",
    marginTop: 5,
    flexDirection: "column",
    justifyContent: "center",
    borderLeftWidth: 0.5,
    borderLeftColor: "#BDC3C7"
  },
  border: {
    height: 1,
    borderTopWidth: 0.6,
    width: "41%",
    borderTopColor: "#BDC3C7"
  },
  mobileview: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "center"
  },
  apptext: {
    textAlign: "center",
    fontSize: 11,
    width: "98%",
    color: "#868b9e",
    fontFamily: "Montserrat-SemiBold"
  },
  cloudview: {
    width: "50%",
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "center",
    borderLeftWidth: 0.5,
    borderLeftColor: "#BDC3C7"
  },
  cloudtext: {
    width: "90%",
    textAlign: "center",
    fontSize: 11,
    marginLeft: 6,
    color: "#868b9e",
    fontFamily: "Montserrat-SemiBold"
  },
  blockchainname: {
    textAlign: "center",
    fontSize: 16,
    color: "#3aa1af",
    marginTop: 2,
    marginBottom: 5,
    fontFamily: "Montserrat-SemiBold"
  },
  blockchaintext: {
    textAlign: "center",
    fontSize: 11,
    width: "52%",
    alignSelf: "center",
    color: "#868b9e",
    fontFamily: "Montserrat-SemiBold"
  },
  aboutcover: {
    width: "94%",
    height: 180,
    zIndex: 1,
    position: "absolute",
    alignSelf: "center",
    top: "7%"
  },
  pplSay: {
    margin: 0,
    padding: 20,
    paddingBottom: 35,
    justifyContent: "center",
    alignItems: "center"
  },
  ourServices: {
    fontSize: 18,
    fontFamily: "Montserrat",
    color: COLOR.TURQUOISE,
    textAlign: "center",
    marginBottom: 20
  },
  inQoute: {
    paddingHorizontal: 10,
    marginBottom: 30,
    marginTop: 120
  },
  cover: {
    flex: 1,
    borderRadius: 3,
    height: "100%",
    width: "100%"
  },
  excelbelieve: {
    fontSize: 14,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.TEXTCOLOR
  },
  masterview: {
    marginTop: -135
  }
});
