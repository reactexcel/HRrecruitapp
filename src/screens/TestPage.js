import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert } from "react-native";
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
import { NetInfo } from "react-native";
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
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleNetwork
    );
    this.props.navigation.setParams({
      setTime: this.setTime
      // show: this.state.show
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleNetwork
    );
  }
  handleNetwork(isconnect) {
    //functinality for net connection at time of answering paper
    this.setState({ isOnline: isconnect });
    this.state.isOnline ? this.setState({ show: false }) : null;
  }

  static navigationOptions = ({ navigation }) => {
    const name = navigation.getParam("name");
    const profile_pic = navigation.getParam("profile_pic");
    const counter = navigation.state.params.data.timeForExam * 60 * 1000;
    console.log(navigation.state.params.show, "show");
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
                        taken_time_minutes: 60
                      });
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
                taken_time_minutes: 60 - Math.floor(time / (60 * 1000))
              });
            }
          }
        ]
      );
    }
  };

  handleStartTest = () => {
    this.setState({ show: true });
    if (this.props.navigation.state.params.show === undefined) {
      this.props.navigation.setParams({
        show: true
      });
    } else if (this.props.navigation.state.params.show) {
      return;
    }
  };

  render() {
    const { count, question, isOnline, show } = { ...this.state };
    let solution = this.state.solution;
    console.log(this.props.navigation.state.params, "props params");

    return (
      <Container style={styles.container}>
        {show ? (
          <Content padder>
            <Card style={styles.blockView}>
              <CardItem>
                <Text style={styles.headerText}> Test Questions </Text>
              </CardItem>
              <Text style={styles.text}>
                Questions Attempted : {`${solution.length}/`}
                {count}{" "}
              </Text>
            </Card>
            <Card>
              <Questions
                question={question}
                solution={solution}
                handleSubmit={this.handleSubmit}
              />
            </Card>
            <CustomButton text="Submit Test" onPress={this.confirmSubmit} />
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
