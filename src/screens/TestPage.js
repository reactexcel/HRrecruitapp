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
import HandleCallHelp from "../components/HandleCallHelp";
import CustomButton from "../components/CustomButton";
import Questions from "../components/Questions";
import StartTest from "../components/StartTest";
import { callingHelp } from "../actions";
import { notify } from "../helper/notify";
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
      answers: [],
      isSubmit: false,
      isLoading: false,
      isOnline: true,
      show: false
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
    return {
      title: name,
      headerLeft: (
        <Content padder>
          <Thumbnail small source={{ uri: profile_pic }} />
        </Content>
      ),
      headerRight: (
        <Content padder>
          <Text style={styles.text}>Remaining Time : </Text>
          <Text style={{ color: COLOR.Red }}>
            <TimerCountdown
              initialSecondsRemaining={counter}
              onTick={counter => {
                if (counter < 180000 && counter > 178000) {
                  notify(
                    "You have less than 3 minutes left to complete your test."
                  );
                }
              }}
              onTimeElapsed={() => {
                navigation.navigate("SubmitTest", {
                  ...navigation.state.params
                });
              }}
              allowFontScaling={true}
              style={{ fontSize: 15 }}
            />
          </Text>
        </Content>
      )
    };
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
              ...this.props.navigation.state.params
            });
          }
        }
      ]
    );
  };

  handleStartTest = () => {
    this.setState({ show: true });
  };

  render() {
    const { count, question, isOnline, show } = { ...this.state };
    let solution = this.state.solution;

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
              <HandleCallHelp {...this.props} />
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
          />
        )}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  callHelp: state.callHelp,
  questions: state.questions,
  test: state.test
});
export default connect(mapStateToProps, { callingHelp })(TestPage);
