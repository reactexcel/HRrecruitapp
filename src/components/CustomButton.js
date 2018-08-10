import React from "react";
import { StyleSheet, Platform } from "react-native";
import { Button, Text } from "native-base";
import PropTypes from "prop-types";

const CustomButton = props => {
  const { text, type = 'block', btnStyle = {}, btnTextStyle={} } = props;
  if(type == 'rounded'){
    return (
    <Button onPress={props.onPress} style={btnStyle} rounded info>
      <Text uppercase={false} style={[styles.btnText,btnTextStyle]}>
        {text}
      </Text>
    </Button>
  );
  } else {   
    return (
      <Button onPress={props.onPress} style={btnStyle}  block info>
        <Text uppercase={false} style={[styles.btnText, btnTextStyle]}>
        {text}
      </Text>
    </Button>
  );
}
};

const styles = StyleSheet.create({
  btnText: {
    fontSize: Platform.OS === "ios" ? 17 : 15,
    fontWeight: Platform.OS === "ios" ? "500" : "300",
    letterSpacing: 1
  }
});

CustomButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func.isRequired
};

export default CustomButton;
