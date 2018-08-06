import React from "react";
import { Text, StyleSheet, View, Platform } from "react-native";
import { COLOR } from "../styles/color";

const ProgressBar = ({ items, index }) => {
  let renderBar = items.map((item, k) => {
    let backGrndColr = index == k ? COLOR.MUSTARD : "white";
    return (
      <View key={k} style={[styles.block, { backgroundColor: backGrndColr }]} />
    );
  });
  return <View style={styles.container}>{renderBar}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center"
  },
  block: {
    width: 7,
    height: 7,
    alignSelf: "center",
    marginLeft: 5,
    borderRadius: 20
  }
});

export default ProgressBar;
