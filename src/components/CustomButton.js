import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "native-base";

class CustomButton extends Component {
  render() {
    const { text } = this.props;
    return (
      <Button onPress={this.props.onPress} block info>
        <Text uppercase={false} style={styles.btnText}>
          {text}
        </Text>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  btnText: {
    fontSize: 15,
    fontWeight: "300",
    letterSpacing: 1
  }
});

export default CustomButton;
