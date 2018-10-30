import React, { Fragment } from "react";
import { Text, View } from "react-native";
import { COLOR } from "../styles/color";
import { DEVICE_WIDTH } from "../helper/constant";
import headerStyle from '../styles/screens/AboutusHeader'

const AboutUsHeader = ({ text }) => {
  return (
    <Fragment>
      <View
        style={headerStyle.headerview}
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
        style={headerStyle.fragmentview}
      />
    </Fragment>
  );
};

export default AboutUsHeader;
