import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Alert,
  NetInfo,
  BackHandler,
  AsyncStorage,
  Platform,
  Image
} from "react-native";
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Spinner,
  Radio,
  View,
  Icon
} from "native-base";
import map from "lodash/map";
import uniqWith from "lodash/uniqWith";
import isEqual from "lodash/isEqual";
import { Row, Col, Grid } from "react-native-easy-grid";
import styles from "../styles";
import _styles from "../styles/screens/TestPage";
import CustomButton from "../components/CustomButton";
import Questions from "../components/Questions";
import StartTest from "../components/StartTest";
import { callingHelp } from "../actions";
import { notify } from "../helper/notify";
import { SUCCESS_STATUS } from "../helper/constant";
import { COLOR } from "../styles/color";
import TimerCountdown from "react-native-timer-countdown";
import { setItem, getItem } from "../helper/storage";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modalbox";
import CustomSubmitAlert from "../components/CustomSubmitAlert";

class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      question: [],
      solution: [],
      isSubmit: false,
      isLoading: false,
      isOnline: true,
      show: false,
      time: 0,
      isOpen: false
    };
    this.handleNetwork = this.handleNetwork.bind(this);
  }
  async componentDidMount() {
    const question = await getItem("question");
    this.setState({ question: question.data, count: question.data.count });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleNetwork
    );
    this.props.navigation.setParams({
      setTime: this.setTime
    });
    const ans = await getItem("solution");
    const email = await getItem("email");
    if (
      ans !== undefined &&
      email.email === this.props.navigation.state.params.email
    ) {
      this.setState({ solution: ans.solution });
    }
    if (this.props.questions.data.roundType === "Subjective") {
      AsyncStorage.removeItem("remaining_time");
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleNetwork
    );
  }
  handleBackButton = () => {
    alert("You are not allowed to go back.");
    return true;
  };
  handleNetwork(isconnect) {
    //functinality for net connection at time of answering paper
    this.setState({ isOnline: isconnect });
    this.state.isOnline ? this.setState({ show: false }) : null;
  }

  static navigationOptions = ({ navigation }) => {
    const counter =
      navigation.state.params.time !== undefined
        ? navigation.state.params.time
        : navigation.state.params.data.timeForExam;
    const round = navigation.state.params.data.round;

    return {
      headerLeft: <View />,
      headerRight: <View />,
      headerStyle: {
        elevation: 0,
        backgroundColor: COLOR.LGONE
      },
      headerTitle: (
        <View style={_styles.timerView}>
          {navigation.state.params.show !== undefined ? (
            navigation.state.params.show ? (
              <React.Fragment>
                <Text
                  style={
                    Platform.OS === "ios"
                      ? _styles.remainingTimeTextIOS
                      : [styles.text, _styles.remainingTimeText]
                  }
                >
                  Remaining Time
                </Text>
                <Text style={_styles.timerStyle}>
                  <TimerCountdown
                    initialSecondsRemaining={counter}
                    onTick={counter => {
                      setItem(
                        "remaining_time",
                        JSON.stringify({ remaining_time: counter })
                      );
                      if (navigation.state.params.setTime !== undefined) {
                        navigation.state.params.setTime(counter);
                      }
                      if (counter < 180000 && counter > 175000) {
                        notify(
                          "You have less than 3 minutes left to complete your test.Your marked responses are saved. If you don't submit manually, you will be directed to next page where you will submit your test"
                        );
                      }
                    }}
                    onTimeElapsed={() => {
                      navigation.navigate("SubmitTest", {
                        ...navigation.state.params,
                        taken_time_minutes:
                          navigation.state.params.data.timeForExam
                      });
                    }}
                    allowFontScaling={true}
                    style={{ fontSize: Platform.OS === "ios" ? 13 : 15 }}
                  />
                </Text>
              </React.Fragment>
            ) : null
          ) : null}
        </View>
      )
    };
  };
  setTime = time => {
    this.setState({ time });
  };
  handleCallHelp = async () => {
    const fb_id = this.props.navigation.getParam("fb_id");
    const accessToken = fb_id ? true : null;
    await this.props.callingHelp(accessToken, fb_id);
    const { data } = this.props.callHelp;
    if (data !== undefined) {
      if (data.status === SUCCESS_STATUS) {
        notify("Please Wait. The message has been sent to HR");
      }
    }
    const { success } = this.props.callHelp;
    if (success !== undefined) {
      if (success === false) {
        notify("Something went wrong");
      }
    }
  };

  handleSubmit = async (question, option) => {
    const solution = this.state.solution;
    let answer;
    if (solution[0] != undefined) {
      let found = false;
      let solutions = map(solution, (value, index) => {
        if (value.Q_id == question) {
          value.ans_id = option;
          found = true;
        } else if (!found) {
          answer = { Q_id: question, ans_id: option };
        }
      });
    } else {
      answer = { Q_id: question, ans_id: option };
    }

    if (answer != undefined) {
      solution.push(answer);
    }
    const uniqSolution = uniqWith(solution, isEqual);
    this.setState({
      solution: uniqSolution
    });
    await setItem("solution", JSON.stringify({ solution: uniqSolution }));
  };

  confirmSubmit = () => {
    this.showCustomAlert(false);

    const time = this.state.time;
    if (this.state.solution.length === 0) {
      alert("Cannot submit without attempting any question.");
    } else {
      this.props.navigation.navigate("SubmitTest", {
        ...this.props.navigation.state.params,
        taken_time_minutes: 60 - Math.ceil(time / (60 * 1000))
      });
    }
  };
  confirmSecondRoundSubmit = () => {
    this.showCustomAlert(false);

    this.props.navigation.navigate("SubmitTest", {
      ...this.props.navigation.state.params
    });
  };

  handleStartTest = async () => {
    this.setState({ show: true });
    if (this.props.navigation.state.params.show === undefined) {
      this.props.navigation.setParams({
        show: true
      });
    } else if (this.props.navigation.state.params.show) {
      return;
    }

    const time =
      this.props.navigation.state.params.data.timeForExam * 60 * 1000;
    const remaining_time = await getItem("remaining_time");

    if (
      remaining_time !== undefined &&
      remaining_time.remaining_time !== null
    ) {
      this.props.navigation.setParams({
        time: remaining_time.remaining_time
      });
    } else {
      this.props.navigation.setParams({
        time
      });
    }
  };

  showCustomAlert = show => {
    this.setState({ isOpen: show });
  };

  render() {
    const name = this.props.navigation.getParam("name");
    const { count, question, isOnline, show } = { ...this.state };
    let solution = this.state.solution;
    const { roundType } = this.props.questions.data;
    return (
      <LinearGradient colors={[COLOR.LGONE, COLOR.LGTWO]} style={{ flex: 1 }}>
        {show ? (
          <Content>
            <Text
              style={[styles.text, { color: COLOR.TURQUOISE, marginTop: 10 }]}
            >
              Hi {name}
            </Text>
            {roundType !== "Subjective" ? (
              <Text style={[styles.text, { color: COLOR.TURQUOISE }]}>
                Questions Attempted : {`${solution.length}/`}
                {count}{" "}
              </Text>
            ) : (
              <Text style={styles.text}>Total Questions : {count}</Text>
            )}
            <Questions
              question={question}
              solution={solution}
              handleSubmit={this.handleSubmit}
            />
            <Button
              full
              style={{ backgroundColor: COLOR.MUSTARD }}
              onPress={() => {
                // roundType !== "Subjective"
                //   ? this.confirmSubmit()
                //   : this.confirmSecondRoundSubmit();
                this.showCustomAlert(true);
              }}
            >
              <Text style={_styles.submitButtonText}>Submit Test</Text>
            </Button>
            <CustomSubmitAlert
              showCustomAlert={this.showCustomAlert}
              isOpen={this.state.isOpen}
              length={this.state.solution.length}
              count={this.state.count}
              confirmSubmit={
                roundType !== "Subjective"
                  ? this.confirmSubmit
                  : this.confirmSecondRoundSubmit
              }
            />
          </Content>
        ) : (
          <StartTest
            isOnline={isOnline}
            handleStartTest={this.handleStartTest}
            callHelp={this.props.callHelp}
            handleCallHelp={this.handleCallHelp}
          />
        )}
      </LinearGradient>
    );
  }
}
const mapStateToProps = state => ({
  callHelp: state.callHelp,
  questions: state.questions
});
export default connect(
  mapStateToProps,
  { callingHelp }
)(TestPage);
