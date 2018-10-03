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
    marginLeft: 6,
    color: "#868b9e",
    fontFamily: "Montserrat-SemiBold"
  },
  ux: {
    textAlign: "center",
    fontSize: 12,
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
    marginTop: 8,
    flexDirection: "column",
    justifyContent: "center",
    borderLeftWidth: 0.5,
    borderLeftColor: "#BDC3C7"
  },
  border: {
    height: 1,
    borderTopWidth: 0.6,
    width: "45%",
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
    marginTop: 8,
    flexDirection: "column",
    justifyContent: "center",
    borderLeftWidth: 0.5,
    borderLeftColor: "#BDC3C7"
  },
  cloudtext: {
    width: "90%",
    textAlign: "center",
    fontSize: 12,
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
    fontSize: 12,
    width: "52%",
    alignSelf: "center",
    color: "#868b9e",
    fontFamily: "Montserrat-SemiBold"
  }
});
