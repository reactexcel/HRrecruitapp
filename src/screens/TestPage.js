import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, NetInfo, BackHandler, AsyncStorage } from "react-native";
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Spinner,
  Radio
} from "native-base";
import map from "lodash/map";
import uniqWith from "lodash/uniqWith";
import isEqual from "lodash/isEqual";
import { Row, Col, Grid } from "react-native-easy-grid";
import styles from "../styles";
import _styles from "../styles/TestPage";
import CustomButton from "../components/CustomButton";
import Questions from "../components/Questions";
import StartTest from "../components/StartTest";
import { callingHelp } from "../actions";
import { notify } from "../helper/notify";
import { SUCCESS_STATUS } from "../helper/constant";
import { COLOR } from "../styles/color";
import TimerCountdown from "react-native-timer-countdown";
import { setItem, getItem } from "../helper/storage";

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
      time: 0
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
    const name = navigation.getParam("name");
    const profile_pic = navigation.getParam("profile_pic");
    const counter =
      navigation.state.params.time !== undefined
        ? navigation.state.params.time
        : navigation.state.params.data.timeForExam;
    const round = navigation.state.params.data.round;

    return {
      title: name,
      headerLeft: (
        <Content padder>
          <Thumbnail small source={{ uri: profile_pic }} />
        </Content>
      ),
      headerRight: (
        <Content padder>
          {navigation.state.params.show !== undefined ? (
            navigation.state.params.show ? (
              <React.Fragment>
                <Text style={styles.text}>Remaining Time : </Text>
                <Text style={{ color: COLOR.Red }}>
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
                    onTimeElapsed={async () => {
                      if (round === "First Round") {
                        navigation.navigate("SubmitTest", {
                          ...navigation.state.params,
                          taken_time_minutes:
                            navigation.state.params.data.timeForExam
                        });
                      } else if (round == "Second Round") {
                        const email = navigation.getParam("email");
                        const stored_email = await getItem("email");
                        if (stored_email.email === email) {
                          setItem(
                            "status",
                            JSON.stringify({ submit_status: SUCCESS_STATUS })
                          );
                        }
                        Alert.alert(
                          "Alert",
                          "Your time has finished. Contact HR to proceed further.\nClick Ok to exit application.",
                          [
                            {
                              text: "OK",
                              onPress: () => BackHandler.exitApp()
                            }
                          ],
                          { cancelable: false }
                        );
                      }
                    }}
                    allowFontScaling={true}
                    style={{ fontSize: 15 }}
                  />
                </Text>
              </React.Fragment>
            ) : null
          ) : null}
        </Content>
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
    const time = this.state.time;
    if (this.state.solution.length === 0) {
      alert("Cannot submit without attempting any question.");
    } else {
      Alert.alert(
        "Confirm Please",
        `You have attempted ${this.state.solution.length}/${this.state.count}. 
      \nAre you sure, you want to submit your Test? You won't be able to change your response after submitting the test.`,
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => {
              this.props.navigation.navigate("SubmitTest", {
                ...this.props.navigation.state.params,
                taken_time_minutes: 60 - Math.ceil(time / (60 * 1000))
              });
            }
          }
        ]
      );
    }
  };
  confirmSecondRoundSubmit = () => {
    Alert.alert(
      "Confirm Please",
      "Are you sure, you want to submit your Test?\nIf Yes, Click OK to exit application and Contact HR to proceed further.",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            const email = this.props.navigation.getParam("email");
            const stored_email = await getItem("email");
            if (stored_email.email === email) {
              setItem(
                "status",
                JSON.stringify({ submit_status: SUCCESS_STATUS })
              );
            }
            BackHandler.exitApp();
          }
        }
      ]
    );
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

  render() {
    const { count, question, isOnline, show } = { ...this.state };
    let solution = this.state.solution;
    const { roundType } = this.props.questions.data;
    return (
      <Container style={styles.container}>
        {show ? (
          <Content padder>
            <Card style={styles.blockView}>
              <CardItem>
                <Text style={styles.headerText}> Test Questions </Text>
              </CardItem>
              {roundType !== "Subjective" ? (
                <Text style={styles.text}>
                  Questions Attempted : {`${solution.length}/`}
                  {count}{" "}
                </Text>
              ) : (
                <Text style={styles.text}>Total Questions : {count}</Text>
              )}
            </Card>
            <Card>
              <Questions
                question={question}
                solution={solution}
                handleSubmit={this.handleSubmit}
              />
            </Card>
            {roundType !== "Subjective" ? (
              <CustomButton text="Submit Test" onPress={this.confirmSubmit} />
            ) : (
              <CustomButton
                text="Submit Test"
                onPress={this.confirmSecondRoundSubmit}
              />
            )}
          </Content>
        ) : (
          <StartTest
            isOnline={isOnline}
            handleStartTest={this.handleStartTest}
            callHelp={this.props.callHelp}
            handleCallHelp={this.handleCallHelp}
          />
        )}
      </Container>
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
