import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../images/logo.png")} resizeMode="contain" style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  logo: {
    flex: 1,
    height: 150,
    width: 220,
  }
});

export default Logo;