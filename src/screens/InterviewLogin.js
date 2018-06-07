import React, { Component, Fragment } from "react";
import {
  Container,
  Content,
  Body,
  Text,
  Card,
  CardItem,
  Item,
  Input,
  Spinner,
  Toast,
} from "native-base";
import { NetInfo } from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid";
import CustomButton from "../components/CustomButton";
import HorizontalLine from "../components/HorizontalLine";
import Logo from "../components/Logo";
import styles from "../styles";
import { isLowercase, isEmail } from "validator";
import { COLOR } from "../styles/color";
import { connect } from "react-redux";
import { signUp } from "../actions";
import { notify } from "../helper/notify";
import { SUCCESS_STATUS } from "../helper/constant";
import { GOOGLE_ANALYTICS_TRACKER } from "../config/dev";
import { getItem } from "../helper/storage";

class InterviewLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      isOnline:false
    };
  }
  static navigationOptions = {
    header: null
  };

  static getDerivedStateFromProps(nextProps) {
    const { error, success } = nextProps.interviewSignUp;
    if (error !== undefined && error === 1) {
      alert("Please ask HR to assign a Job Profile and round");
    }
    if (success !== undefined && !success) {
      notify("Something went wrong");
    }
    return null;
  }
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleNetwork
    );
  }

  handleNetwork = isconnect => {
    this.setState({ isOnline: isconnect });
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleNetwork
    );
  }

  handleSubmit = async () => {
    const errors = this.validate(this.state.email);
    if (Object.keys(errors).length === 0) {
      if(this.state.isOnline){
        GOOGLE_ANALYTICS_TRACKER.trackEvent("INTERVIEWLOGIN", this.state.email);
        await this.props.signUp(this.state.email);
        const {
          interviewSignUp: { status, fb_id }
        } = this.props;
        if (status === 0) {
          GOOGLE_ANALYTICS_TRACKER.trackEvent(
            this.state.email,
            status.toString()
          );
          this.props.navigation.navigate("VerifyingCandidate");
          this.setState({ email: "" });
        } else if (status === SUCCESS_STATUS) {
          GOOGLE_ANALYTICS_TRACKER.trackEvent(
            this.state.email,
            status.toString()
          );
          this.props.navigation.navigate("OTPpage");
          this.setState({ email: "" });
        }
      }else {
        alert("Please connect to internet");
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
      interviewSignUp: { registering, success }
    } = this.props;

    const { navigation } = this.props;
    const appliedBefore = navigation.getParam("appliedBefore", false);
    const appliedText = navigation.getParam("appliedText");

    return (
      <Container style={styles.container}>
        <Content padder>
          <Grid>
            <Row style={styles.logoView}>
              <Logo />
            </Row>
            <Row>
              <Card style={styles.blockView}>
                {!appliedBefore ? (
                  <Fragment>
                    <CardItem header>
                      <Text style={styles.headerText}>
                        Interview Test Papers
                      </Text>
                    </CardItem>
                    <HorizontalLine />
                    <CardItem>
                      <Body>
                        <Text style={styles.text}>
                          Login with your Email-Id to take interview test paper,
                          in case of any questions please contact HR
                        </Text>
                      </Body>
                    </CardItem>
                  </Fragment>
                ) : (
                  <CardItem>
                    <Text style={styles.text}>{appliedText}</Text>
                  </CardItem>
                )}
                <Item style={styles.inputTextView}>
                  <Input
                    style={styles.inputText}
                    placeholder="Email"
                    placeholderTextColor={COLOR.Grey}
                    name="email"
                    value={this.state.email}
                    keyboardType="email-address"
                    selectionColor={COLOR.Grey}
                    underlineColorAndroid={COLOR.Grey}
                    onChangeText={text => this.setState({ email: text })}
                    autoCapitalize="none"
                  />
                </Item>
                {registering ? (
                  <Spinner color="#2196f3" />
                ) : (
                  <CustomButton onPress={this.handleSubmit} text="Submit" />
                )}
              </Card>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ interviewSignUp }) => ({ interviewSignUp });

export default connect(
  mapStateToProps,
  { signUp }
)(InterviewLogin);
