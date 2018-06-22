import React, { Component, Fragment } from "react";
import { BackHandler, Alert, NetInfo, View, AsyncStorage } from "react-native";
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
  Toast
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import CustomButton from "../components/CustomButton";
import HorizontalLine from "../components/HorizontalLine";
import Logo from "../components/Logo";
import styles from "../styles";
import { isLowercase, isEmail } from "validator";
import { COLOR } from "../styles/color";
import { connect } from "react-redux";
import {
  signUp,
  connectionState,
  getCandidateDetails,
  getCandidateRoundDetails
} from "../actions";
import { notify } from "../helper/notify";
import { SUCCESS_STATUS } from "../helper/constant";
import { GOOGLE_ANALYTICS_TRACKER } from "../config/dev";
import { getItem } from "../helper/storage";
import branch from "react-native-branch";

class InterviewLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      linkOpening: true
    };
  }
  static navigationOptions = {
    header: null
  };

  static getDerivedStateFromProps(nextProps) {
    const { error, success, msg, message } = nextProps.interviewSignUp;
    if (error !== undefined && error === 1) {
      alert(message);
    }
    if (success !== undefined && !success) {
      notify("Something went wrong");
    }
    if (msg !== undefined) {
      alert(msg);
    }
    return null;
  }

  async componentDidMount() {
    branch.subscribe(async ({ errors, params }) => {
      if (errors) {
        alert("Error from Branch: " + errors);
        return;
      }
      if (params.$deeplink_path !== undefined) {
        let fb_id = params.$deeplink_path;
        await this.props.getCandidateDetails(fb_id);
        const { data, message, error, status } = this.props.interviewSignUp;
        if (status == SUCCESS_STATUS) {
          this.setState({ linkOpening: false });
          this.props.navigation.navigate("Instructions", {
            fb_id: fb_id,
            profile_pic: `https://pikmail.herokuapp.com/${
              data.sender_mail
            }?size=60`,
            name: data.from,
            email: data.sender_mail
          });
        } else if (error == 1) {
          this.setState({ linkOpening: false });
        }
      } else {
        this.setState({ linkOpening: false });
      }
    });
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleNetworks
    );
    const fb_id = await getItem("fb_id");

    if (fb_id !== undefined) {
      await this.props.getCandidateRoundDetails(fb_id.fb_id);
    }
    const round = await getItem("round");

    if (round !== undefined) {
      const {
        currentRound,
        appearedInFirstRound,
        appearedInSecondRound
      } = this.props.candidateInfo.data;
      if (appearedInFirstRound) {
        AsyncStorage.removeItem("solution");
        AsyncStorage.removeItem("remaining_time");
      }
      const roundType =
        currentRound === "First Round" ? "Objective" : "Subjective";
      if (currentRound === round.round) {
        Alert.alert(
          "Info",
          `You have submitted your ${roundType} paper. Please contact HR to proceed further.`,
          [
            {
              text: "Ok",
              onPress: () => BackHandler.exitApp()
            }
          ],
          { cancelable: false }
        );
      } else if (currentRound !== round.round) {
        Alert.alert("Info", `You have been moved to ${roundType} round.`, [
          {
            text: "Ok",
            onPress: () => {}
          }
        ]);
      }
    }
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
  // backPressed = () => {
  //   Alert.alert(
  //     "Thank You",
  //     "You have submitted your test. Contact HR to proceed further.",
  //     [{ text: "Ok", onPress: () => BackHandler.exitApp() }],
  //     { cancelable: false }
  //   );

  //   return true;
  // };

  handleSubmit = async () => {
    const errors = this.validate(this.state.email);
    if (Object.keys(errors).length === 0) {
      NetInfo.isConnected.fetch().done(async isConnected => {
        if (isConnected) {
          GOOGLE_ANALYTICS_TRACKER.trackEvent(
            "INTERVIEWLOGIN",
            this.state.email
          );
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
        } else {
          alert("Please connect to internet");
        }
      });
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
    const { linkOpening } = this.state;
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
              {!linkOpening ? (
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
                            Login with your Email-Id to take interview test
                            paper, in case of any questions please contact HR
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
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    flexDirection: "column"
                  }}
                >
                  <Spinner color={COLOR.Spinner} />
                </View>
              )}
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  interviewSignUp: state.interviewSignUp,
  isConnected: state.network.isConnected,
  candidateInfo: state.candidateInfo
});
export default connect(
  mapStateToProps,
  { signUp, connectionState, getCandidateDetails, getCandidateRoundDetails }
)(InterviewLogin);
