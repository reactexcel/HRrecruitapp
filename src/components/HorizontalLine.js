import React from "react";
import { Text, StyleSheet, View, Platform } from "react-native";

const HorizontalLine = () => {
  return <View style={styles.horizontalLine} />;
};

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomWidth: Platform.OS === "ios" ? 2 : 1,
    borderBottomColor: "#eeeeef",
    width: "100%"
  }
});

export default HorizontalLine;
