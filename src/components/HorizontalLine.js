import React from "react";
import { Text, StyleSheet, View } from "react-native";

const HorizontalLine = () => {
  return <View style={styles.horizontalLine} />;
};

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeef",
    width: "100%"
  }
});

export default HorizontalLine;
