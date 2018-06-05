import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../images/logo.png")} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  }
});

export default Logo;