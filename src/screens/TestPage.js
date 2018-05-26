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
import * as _ from "lodash";
import { AsyncStorage, NetInfo, FlatList, View } from "react-native";
import { Row, Col, Grid } from "react-native-easy-grid";
import styles from "../styles";
import _styles from "../styles/TestPage";
import CustomButton from "../components/CustomButton";
import HorizontalLine from "../components/HorizontalLine";
import HandleCallHelp from "../components/HandleCallHelp";
import StartTest from "../components/StartTest";
import { callingHelp, submitTest } from "../actions";
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
  handleNetwork(isconnect) {
    //functinality for net connection at time of answering paper
    this.setState({ isOnline: isconnect });
    this.state.isOnline ? this.setState({ show: false }) : null;
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleNetwork
    );
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
              onTick={() => {}}
              onTimeElapsed={() => {}}
              allowFontScaling={true}
              style={{ fontSize: 15 }}
            />
          </Text>
        </Content>
      )
    };
  };

  async handleSubmit(question, option) {
    const solution = this.state.solution;
    let answer;
    if (solution[0] != undefined) {
      let found = false;
      let solutions = _.map(solution, (value, index) => {
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
    const uniqSolution = _.uniqWith(solution, _.isEqual);
    this.setState({
      solution: uniqSolution
    });
    await setItem("solution", JSON.stringify({ solution: uniqSolution }));
  }

  handleTestSubmit = async () => {
    const ans = await getItem("solution");
    this.setState({ answers: ans });
    const { params } = this.props.navigation.state;
    const fb_id = params.fb_id;
    const job_profile = params.data.job_profile;
    const questionIds = [];
    _.forEach(params.data.data, value => {
      _.forEach(value.questions, value => {
        questionIds.push(value._id);
      });
    });
    const taken_time_minutes = 10;
    const data = {
      answers: this.state.answers.solution,
      fb_id: fb_id,
      job_profile: job_profile,
      questionIds: questionIds,
      taken_time_minutes: taken_time_minutes
    };
    this.props.submitTest(data);
  };

  confirmSubmit = () => {
    Alert.alert(
      "Confirm Please",
      "Are you sure, you want to submit your Test? You won't be able to change your response after submitting the test.",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        { text: "OK", onPress: () => this.handleTestSubmit() }
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
        {!show ? (
          <Content padder>
            <Card style={styles.blockView}>
              <CardItem>
                <Text style={styles.headerText}> Test Questions </Text>
              </CardItem>
              <View>
                <View>
                  <Text style={styles.text}>
                    Questions Attempted : {`${solution.length}/`}
                    {count}{" "}
                  </Text>
                </View>
                <View>
                  <HandleCallHelp {...this.props} />
                </View>
              </View>
            </Card>
            <Card>
              <Content style={{ backgroundColor: "white" }}>
                <CardItem>
                  <Content>
                    {_.map(question.data, (questionObj, index) => {
                      return (
                        <React.Fragment>
                          <Col>
                            <Card style={styles.blockView}>
                              <CardItem>
                                <Text style={styles.headerText}>
                                  {questionObj.group_name}
                                </Text>
                              </CardItem>
                            </Card>
                          </Col>
                          {_.map(questionObj.questions, (ques, index) => {
                            return (
                              <Content key={index} padder>
                                <Text style={{ fontSize: 16 }}>
                                  {index + 1}. {ques.question}
                                </Text>
                                {ques.description ? (
                                  <View style={_styles.descriptionView}>
                                    <Text style={{ opacity: 0.8 }}>
                                      {ques.description}
                                    </Text>
                                  </View>
                                ) : null}
                                {_.map(ques.options, (values, index) => {
                                  let isSolution =
                                    solution[0] != undefined
                                      ? _.findIndex(solution, value => {
                                          return value.Q_id == ques._id;
                                        })
                                      : null;
                                  let selected =
                                    isSolution != null && isSolution != -1
                                      ? solution[isSolution].ans_id ==
                                        values.opt_id
                                        ? true
                                        : false
                                      : false;
                                  return (
                                    <Content key={index} padder>
                                      <Row>
                                        <Col style={{ width: "10%" }}>
                                          <Radio
                                            onPress={() => {
                                              this.handleSubmit(
                                                ques._id,
                                                values.opt_id
                                              );
                                            }}
                                            selected={selected}
                                          />
                                        </Col>
                                        <Col>
                                          <Text>{values.option}</Text>
                                        </Col>
                                      </Row>
                                    </Content>
                                  );
                                })}
                              </Content>
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                  </Content>
                </CardItem>
                <CustomButton text="Submit Test" onPress={this.confirmSubmit} />
              </Content>
            </Card>
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
  questions: state.questions
});
export default connect(mapStateToProps, { callingHelp, submitTest })(TestPage);
