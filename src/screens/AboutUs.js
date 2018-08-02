import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from "react-native";

class AboutUs extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>About Us</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  }
});

export default AboutUs;
