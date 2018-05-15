import React, { Component } from "react";
import { Text, View, TouchableNativeFeedback } from "react-native";
import Logo from "../components/Logo";
import Button from "../components/Button";
import styles from "../styles/VerifyingCandidate";

class VerifyingCandidate extends Component {
  static navigationOptions = {
    header: null
  };
  handlePressApplied = () =>
    this.props.navigation.navigate("InterviewLogin", {
      appliedBefore: true,
      appliedText:
        "Input the email id with which you have already applied, so we can find your job application easily"
    });
  handlePressWalkin = () => this.props.navigation.navigate("AddCandidate");
  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <View style={styles.blockView}>
          <Text style={styles.headerText}>
            We couldn't find your email address in our system. Please select
            option below
          </Text>
          <Button
            text="Have you applied before?"
            onPress={this.handlePressApplied}
          />
          <Button text="It's Walk-In" onPress={this.handlePressWalkin} />
        </View>
      </View>
    );
  }
}

export default VerifyingCandidate;
