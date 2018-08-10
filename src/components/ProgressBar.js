import React from "react";
import { Text, View, Platform } from "react-native";
import { COLOR } from "../styles/color";
import styles from "../styles/components/ProgressBar";

const ProgressBar = ({ items, index }) => {
  let renderBar = items.map((item, k) => {
    let backGrndColr = index == k ? COLOR.MUSTARD : "white";
    return (
      <View key={k} style={[styles.block, { backgroundColor: backGrndColr }]} />
    );
  });
  return <View style={styles.container}>{renderBar}</View>;
};

export default ProgressBar;
