import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Button } from "native-base";
import { COLOR } from "../styles/color";
import { ABOUT_US } from "../helper/constant";
import styles from "../styles/components/JobOpeningAboutUs";

const JobOpeningAboutUs = () => {
  return (
    <View style={styles.descriptionView}>
      <Text style={styles.textStyle}>About Excellence Technologies</Text>
      <View style={styles.aboutUsView}>
        <Text style={styles.aboutUs}>{ABOUT_US}</Text>
      </View>
    </View>
  );
};


export default JobOpeningAboutUs;
