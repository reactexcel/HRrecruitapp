import { StyleSheet } from "react-native";
import { COLOR } from "../color";
import { DEVICE_WIDTH } from "../../helper/constant";

export default StyleSheet.create({
  modalView: {
    flex: 1
  },
  modal: {
    height: 230,
    width: DEVICE_WIDTH * 0.96
  },
  cnfrm: {
    textAlign: "center",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 20,
    color: "#253055"
  },
  closeBtnStyle: {
    height: 20,
    marginRight: -5,
    position: "relative",
    top: 5
  },
  closeIconStyle: {
    fontSize: 15,
    color: "#253055",
    fontWeight: "900"
  },
  modalContentView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: -25
  },
  modalImageView: {
    marginLeft: 0
  },
  modalImageStyle: {
    height: 210,
    width: 90
  },
  modalTextView: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap"
  },
  confirmText: {
    marginBottom: 15,
    marginTop: -5,
    color: "#109aaa",
    fontFamily: "Montserrat-SemiBold"
  },
  modalText: {
    fontSize: 12,
    marginBottom: 15,
    fontFamily: "Montserrat-SemiBold"
  },
  modalBtnView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  cancelBtnStyle: {
    marginLeft: -15,
    height: 30,
    width: 90,
    paddingLeft: 5,
    backgroundColor: "#e3e5e9"
  },

  okBtnStyle: {
    marginLeft: 10,
    height: 30,
    width: 60,
    paddingLeft: 5,
    backgroundColor: COLOR.MUSTARD
  },
  btnTextStyle: {
    fontSize: 10,
    color: COLOR.TEXTCOLOR,
    fontFamily: "Montserrat-Medium"
  }
});
