import React, { Component, Fragment } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableNativeFeedback,
  Keyboard,
  ActivityIndicator
} from "react-native";
import Button from "../components/Button";
import { isLowercase, isEmail } from "validator";
import Logo from "../components/Logo";
import styles from "../styles/InterviewLogin";
import { connect } from "react-redux";
import { signUp } from "../actions";

class InterviewLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      errors: {}
    };
  }
  static navigationOptions = {
    header: null
  };

  _onResponderRelease = event => {
    Keyboard.dismiss();
    this.textInput.blur();
  };
  _onStartShouldSetResponder = event => [true];

  handleSubmit = async email => {
    const errors = this.validate(this.state.email);
    if (Object.keys(errors).length === 0) {
      await this.props.signUp(this.state.email);
      const {
        interviewSignUp: { status }
      } = this.props;
      if (status === 0) {
        this.props.navigation.navigate("VerifyingCandidate");
        this.textInput.clear();
        this.setState({ email: "" });
      } else if (status === 1) {
        this.props.navigation.navigate("ExistingEmail");
        this.textInput.clear();
        this.setState({ email: "" });
      }
    }
  };

  validate(data) {
    const errors = {};
    if (!data) {
      errors.data = "Please enter your email";
      alert(errors.data);
    } else if (!isLowercase(data)) {
      errors.data = "Email must be in lowercase";
      alert(errors.data);
    } else if (!isEmail(data)) {
      errors.data = "Please enter a valid email";
      alert(errors.data);
    }
    return errors;
  }

  render() {
    const {
      interviewSignUp: { registering }
    } = this.props;
    const { navigation } = this.props;
    const appliedBefore = navigation.getParam("appliedBefore", false);
    const appliedText = navigation.getParam("appliedText");

    return (
      <View
        style={styles.container}
        onStartShouldSetResponder={this._onStartShouldSetResponder}
        onResponderRelease={this._onResponderRelease}
      >
        <Logo />
        <View style={styles.formView}>
          {!appliedBefore ? (
            <Fragment>
              <Text style={styles.headerText}>Interview Test Papers</Text>
              <View style={styles.horizontalLine} />
              <Text style={styles.text}>
                Login with your Email-Id to take interview test paper, in case
                of any questions please contact HR
              </Text>
            </Fragment>
          ) : (
            <Text style={styles.text}>{appliedText}</Text>
          )}
          <View style={styles.inputTextView}>
            <TextInput
              ref={input => {
                this.textInput = input;
              }}
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="#c1c0c1"
              name="email"
              value={this.state.email}
              keyboardType="email-address"
              selectionColor="#c1c0c1"
              underlineColorAndroid="#c1c0c1"
              onChangeText={text => this.setState({ email: text })}
              autoCapitalize="none"
            />
          </View>
          {registering ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button onPress={this.handleSubmit} text="Submit" />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ interviewSignUp }) => ({ interviewSignUp });

export default connect(mapStateToProps, { signUp })(InterviewLogin);
