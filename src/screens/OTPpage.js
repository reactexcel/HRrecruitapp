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
import { Grid, Row } from "react-native-easy-grid";
import Logo from "../components/Logo";
import CustomButton from "../components/CustomButton";
import styles from "../styles";
import { COLOR } from "../styles/color";
import { getItem } from "../helper";
import { connect } from "react-redux";
import { verifyingOTP } from "../actions";

class OTPpage extends Component {
  constructor(props) {
    super();
    this.state = {
      otp: "",
      fb_id : props.fb_id,
      errors: {}
    };
  }
  validate(data) {
    const errors = {};
    if (!data) {
      errors.data = "Enter  OTP";
      alert(errors.data);
    }
    return errors;
  }

  handleSubmit = () => {
    const errors = this.validate(this.state.otp);
    if (Object.keys(errors).length === 0) {
      this.props.verifyingOTP(this.state.otp, this.state.fb_id);
    }
  };
  render() {
    console.log(this.props.otp);
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
                <CardItem>{message ? <Text> {message}</Text> : null}</CardItem>
                <Item style={styles.inputTextView}>
                  <Input
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
                  />
                </Item>
                {registering ? (
                  <Spinner color="#0000ff" />
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
  otp: state.otp
});
export default connect(mapStateToProps, { verifyingOTP })(OTPpage);
