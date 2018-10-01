import React, { Fragment } from "react";
import { Text, View } from "react-native";
import { COLOR } from "../styles/color";
import { DEVICE_WIDTH } from "../helper/constant";

const AboutUsHeader = ({ text }) => {
  return (
    <Fragment>
      <View
        style={{
          backgroundColor: COLOR.MUSTARD,
          height: 40,
          paddingHorizontal: 0,
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat-Bold",
            fontSize: 16,
            color: COLOR.TEXTCOLOR
          }}
        >
          {text}
        </Text>
      </View>
      <View
        style={{
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
        }}
      />
    </Fragment>
  );
};

export default AboutUsHeader;
