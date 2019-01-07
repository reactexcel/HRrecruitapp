import { StyleSheet,Platform } from "react-native";
import { COLOR } from "../color";

export default StyleSheet.create({
  header: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center"
  },
  headerImage: {
    height: 100,
    width: 150
  },
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
    color: COLOR.TURQUOISE,
    marginTop: 2,
    marginBottom: 5,
    // fontFamily: "Montserrat-SemiBold"
  },
  ecom: {
    width: "96%",
    textAlign: "center",
    fontSize: 11,
    marginTop: 0,
    marginLeft: 6,
    color: COLOR.TEXTCOLOR,
    // fontFamily: "Montserrat-SemiBold"
  },
  ux: {
    textAlign: "center",
    fontSize: 11,
    color: COLOR.TEXTCOLOR,
    // fontFamily: "Montserrat-SemiBold"
  },
  edge: {
    textAlign: "center",
    fontSize: 12,
    color: COLOR.EDGECOLOR,
    // fontFamily: "Montserrat-SemiBold",
    marginLeft: 5,
    marginRight: 5,
    fontWeight: "100"
  },
  grw: {
    marginTop: 18,
    textAlign: "center",
    // fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
    color: COLOR.TURQUOISE
  },
  secondrow: {
    width: "50%",
    marginTop: Platform.OS === 'ios' ?25 : 5,
    flexDirection: "column",
    justifyContent: "center",
    borderLeftWidth: 0.5,
    borderLeftColor:COLOR.ROWCOLOR
  },
  border: {
    height: 1,
    borderTopWidth: 0.6,
    width: "41%",
    borderTopColor: COLOR.ROWCOLOR
  },
  mobileview: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    marginTop:Platform.OS ==='ios' ? -10 :0
  },
  apptext: {
    textAlign: "center",
    fontSize: 11,
    width: "98%",
    color: COLOR.TEXTCOLOR,
    // fontFamily: "Montserrat-SemiBold"
  },
  cloudview: {
    width: "50%",
    marginTop:Platform.OS ==='ios' ?15 : 10,
    flexDirection: "column",
    justifyContent: "center",
    borderLeftWidth: 0.5,
    borderLeftColor: COLOR.ROWCOLOR
  },
  cloudtext: {
    width: "90%",
    textAlign: "center",
    fontSize: 11,
    marginLeft: 6,
    color: COLOR.TEXTCOLOR,
    // fontFamily: "Montserrat-SemiBold"
  },
  blockchainname: {
    textAlign: "center",
    fontSize: 16,
    color: COLOR.TURQUOISE,
    marginTop: 2,
    marginBottom: 5,
    // fontFamily: "Montserrat-SemiBold"
  },
  blockchaintext: {
    textAlign: "center",
    fontSize: 11, 
    width: "52%",
    alignSelf: "center",
    color: COLOR.TEXTCOLOR,
    // fontFamily: "Montserrat-SemiBold"
  },
  aboutcover: {
    width: "94%",
    height: 180,
    zIndex: 1,
    position: "absolute",
    alignSelf: "center",
    top: "8%"
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
    // fontFamily: "Montserrat",
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
    // fontFamily: "Montserrat-SemiBold",
    color: COLOR.TEXTCOLOR
  },
  masterview: {
    marginTop: -135
  },
  chainview: {
    justifyContent: "center",
    alignSelf: "center"
  },
  borderParent: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8
  },
  one: {
    width: 70,
    height: 62,
    marginLeft: 56
  },
  two: {
    width: 70,
    height: 77,
    marginLeft: 50
  },
  three: {
    width: 60,
    height: 70,
    marginLeft: 50
  },
  four: {
    width: 77,
    height: 70,
    marginLeft: 50
  }
});
