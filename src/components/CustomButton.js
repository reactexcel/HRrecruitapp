import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "native-base";
import PropTypes from "prop-types";

const CustomButton = props => {
  const { text, type='block',btnStyle={} } = props;
  if(type == 'rounded'){
    return (
    <Button onPress={props.onPress} style={btnStyle} rounded info>
      <Text uppercase={false} style={styles.btnText}>
        {text}
      </Text>
    </Button>
  );
  } else {   
    return (
      <Button onPress={props.onPress} style={btnStyle}  block info>
      <Text uppercase={false} style={styles.btnText}>
        {text}
      </Text>
    </Button>
  );
}
};

const styles = StyleSheet.create({
  btnText: {
    fontSize: 15,
    fontWeight: "300",
    letterSpacing: 1
  }
});

CustomButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func.isRequired
};

export default CustomButton;
