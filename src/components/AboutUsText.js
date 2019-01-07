import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Button } from "native-base";
import { COLOR } from "../styles/color";
import { ABOUT_US } from "../helper/constant";
import styles from "../styles/components/AboutUsText";

const AboutUsText = ({textcolor}) => {
  return (
    <View style={styles.descriptionView}>
      <Text style={styles.textStyle}>About Excellence Technologies</Text>
      <View style={styles.aboutUsView}>
        <Text style={[styles.aboutUs, {color:textcolor}]}>{ABOUT_US}</Text>
      </View>
    </View>
  );
};

AboutUsText.defaultProps = {
  textcolor:COLOR.TEXTCOLOR
}

export default AboutUsText;
