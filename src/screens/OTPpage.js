import React, { Component } from "react";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Item,
  Input,
  Spinner
} from "native-base";
import { NetInfo } from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import Logo from "../components/Logo";
import CustomButton from "../components/CustomButton";
import styles from "../styles";
import { notify } from "../helper/notify";
import { COLOR } from "../styles/color";
import { connect } from "react-redux";
import { verifyingOTP, connectionState } from "../actions";
import { SUCCESS_STATUS } from "../helper/constant";
import { GOOGLE_ANALYTICS_TRACKER } from "../config/dev";

class OTPpage extends Component {
  constructor(props) {
    super();
    this.state = {
      otp: "",
      fb_id: props.fb_id,
      email: props.email,
      errors: {},
      isconnect: true
    };
  }
  static navigationOptions = {
    title: "Enter OTP"
  };
  async componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleNetworks
    );
  }
  handleNetworks = async isconnect => {
    await this.props.connectionState(isconnect);
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleNetworks
    );
  }

  validate(data) {
    const errors = {};
    if (!data) {
      errors.data = "Enter OTP";
      alert(errors.data);
    }
    return errors;
  }

  handleSubmit = async () => {
    const errors = this.validate(this.state.otp);

    if (Object.keys(errors).length === 0) {
      if (this.state.isconnect) {
        await this.props.verifyingOTP(
          this.state.email,
          this.state.otp,
          this.state.fb_id
        );
        if (this.props.otp.data !== undefined) {
          const { status, data } = this.props.otp.data;
          if (status === SUCCESS_STATUS) {
            GOOGLE_ANALYTICS_TRACKER.trackEvent(
              this.state.fb_id.toString(),
              status.toString()
            );
            this.props.navigation.navigate("Instructions", {
              fb_id: data.fb_id,
              profile_pic: data.profile_pic,
              name: data.name,
              email: this.state.email
            });
            this.textInput._root.clear();
          }
        }
      } else {
        alert("Please connect to internet");
      }
    }
  };
  static getDerivedStateFromProps(nextProps) {
    const { success, msg } = nextProps.otp;
    if (success !== undefined && !success) {
      notify("Something went wrong");
    }
    if (msg !== undefined) {
      alert(msg);
    }
    return null;
  }
  render() {
    const {
      otp: { registering, message }
    } = this.props;
    return (
      <Container style={styles.container}>
        <Content padder>
          <Grid>
            <Row style={styles.logoView}>
              <Logo />
            </Row>
            <Row>
              <Card style={styles.blockView}>
                <CardItem>
                  <Text style={styles.text}>
                    You are are about to start your test. Since all tests are
                    confidential, it's mandatory that you do it after approval
                    of our HR. Confirm the same, please ask HR for OTP password
                  </Text>
                </CardItem>
                <CardItem>
                  {message ? (
                    <Text style={{ color: COLOR.Red }}> {message}</Text>
                  ) : null}
                </CardItem>
                <Item style={styles.inputTextView}>
                  <Input
                    ref={input => (this.textInput = input)}
                    style={styles.inputText}
                    placeholder="Enter OTP"
                    placeholderTextColor={COLOR.Grey}
                    maxLength={4}
                    name="otp"
                    value={this.state.otp}
                    keyboardType="numeric"
                    selectionColor={COLOR.Grey}
                    underlineColorAndroid={COLOR.Grey}
                    onChangeText={text => this.setState({ otp: text })}
                    onSubmitEditing = {this.handleSubmit}
                  />
                </Item>
                {registering ? (
                  <Spinner color={COLOR.Spinner} />
                ) : (
                  <CustomButton text="Submit" onPress={this.handleSubmit} />
                )}
              </Card>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  fb_id: state.interviewSignUp.fb_id,
  email: state.interviewSignUp.email,
  otp: state.otp,
  isConnected: state.network.isConnected
});
export default connect(
  mapStateToProps,
  { verifyingOTP, connectionState }
)(OTPpage);
