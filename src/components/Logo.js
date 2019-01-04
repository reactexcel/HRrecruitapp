import React from "react";
import { Text, View, Image } from "react-native";
import styles from "../styles/components/Logo.js";

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../images/logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
    </View>
  );
};

export default Logo;
