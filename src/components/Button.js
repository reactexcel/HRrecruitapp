import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableNativeFeedback } from "react-native";

class Button extends Component {
  render() {
    const {text} = this.props;
    return (
        <TouchableNativeFeedback onPress={this.props.onPress}>
          <View style={styles.button}>
            <Text style={styles.btnText}>{text}</Text>
          </View>
        </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: "90%",
    height: 50,
    backgroundColor: "#2196f3",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "300",
    letterSpacing: 1
  }
});

export default Button;
