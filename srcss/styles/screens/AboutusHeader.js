import { StyleSheet } from "react-native";
import { COLOR } from "../color";
import { DEVICE_WIDTH } from '../../helper/constant'

export default StyleSheet.create({
    headerview:{
        backgroundColor: COLOR.MUSTARD,
        height: 40,
        paddingHorizontal: 0,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
      },
      fragmentview:{
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 12,
        borderRightWidth: 12,
        borderTopWidth: 15,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderTopColor: COLOR.MUSTARD,
        marginLeft: DEVICE_WIDTH/2
      }
})