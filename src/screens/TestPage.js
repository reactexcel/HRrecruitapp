import React, { Component } from "react";
import { connect } from "react-redux";
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
import CustomButton from "../components/CustomButton";
import HorizontalLine from "../components/HorizontalLine";
import { callingHelp } from "../actions";
import { notify } from "../helper/notify";
import { COLOR } from "../styles/color";
import TimerCountdown from "react-native-timer-countdown";

class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      count: 0,
      question: [],
      solution: [],
      isSubmit: false,
      isLoading: false,
      isOnline: true,
      show: false,
      selected: false
    };
    this.handleNetwork = this.handleNetwork.bind(this);
  }
  componentDidMount() {
    AsyncStorage.getItem("question", (err, result) => {
      if (result !== null) {
        const question = JSON.parse(result);
        this.setState({ question: question.data, count: question.data.count });
      }
    });
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleNetwork
    );
  }
  handleNetwork(isconnect) {
    //functinality for net connection at time of answering paper
    this.setState({ isOnline: isconnect });
    // this.state.isOnline ? this.setState({ show: false }) : null;
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
        <Text style={styles.text}>
          Remaining Time :{" "}
          <Text style={{ color: COLOR.Red }}>
            {/* {this.state.counter} */}
            <TimerCountdown
              initialSecondsRemaining={counter}
              onTick={() => {}}
              onTimeElapsed={() => {}}
              allowFontScaling={true}
              style={{ fontSize: 15 }}
            />
          </Text>
        </Text>
      )
    };
  };

  handleCallHelp = async () => {
    const fb_id = this.props.navigation.getParam("fb_id");
    const accessToken = fb_id ? true : null;
    await this.props.callingHelp(accessToken, fb_id);
    const { data } = this.props.callHelp;
    if (data.status === 1) {
      notify("Please Wait. The message has been sent to HR");
    }
  };

  handleSubmit(question, option) {
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
    this.setState({
      solution: _.uniqBy(solution, solution.Q_id)
    });
    AsyncStorage.setItem("solution", JSON.stringify({ solution: solution }));
  }
  handleStartTest = () => {
    this.setState({ show: true });
  };

  render() {
    const {
      callHelp: { calling, success }
    } = this.props;

    const { count, question, isOnline, show } = { ...this.state };
    let solution = this.state.solution;

    if (success !== undefined) {
      if (success === false) {
        notify("Something went wrong");
      }
    }
    return (
      <Container style={styles.container}>
        {!show ? (
          <Content padder>
            <Card style={styles.blockView}>
              <CardItem>
                <Text style={styles.headerText}> Test Questions </Text>
              </CardItem>
              <Row>
                <Col style={{ width: "75%", alignItems: "flex-start" }}>
                  <Text style={styles.text}>
                    Questions Attempted : {`${solution.length}/`}
                    {count}{" "}
                  </Text>
                </Col>
                <Col style={{ width: "25%", alignItems: "flex-end" }}>
                  {calling ? (
                    <Spinner color="#2196f3" />
                  ) : (
                    <Button onPress={this.handleCallHelp} info>
                      <Text style={{ fontSize: 10, textAlign: "center" }}>
                        Call for Help
                      </Text>
                    </Button>
                  )}
                </Col>
              </Row>
            </Card>
            <Card>
              <Content style={{ backgroundColor: "white" }}>
                <CardItem>
                  <FlatList
                    data={question.data}
                    renderItem={({ item, index }) => (
                      <Content key={index}>
                        <FlatList
                          data={item.questions}
                          ListHeaderComponent={() => (
                            <Card style={styles.blockView}>
                              <CardItem>
                                <Text style={styles.headerText}>
                                  {item.group_name}
                                </Text>
                              </CardItem>
                            </Card>
                          )}
                          renderItem={({ item, index }) => (
                            <Content key={index} padder>
                              <Text style={{ fontSize: 16 }}>
                                {index + 1}. {item.question}
                              </Text>
                              {item.description ? (
                                <View
                                  style={{
                                    borderRadius: 5,
                                    flex: 1,
                                    padding: 10,
                                    backgroundColor: COLOR.LightGrey,
                                    elevation: 1,
                                    marginVertical: 5
                                  }}
                                >
                                  <Text style={{ opacity: 0.8 }}>
                                    {item.description}
                                  </Text>
                                </View>
                              ) : null}
                              {_.map(item.options, (value, index) => {
                                console.log(solution, "solution");
                                let isSolution =
                                  solution[0] != undefined
                                    ? _.findIndex(solution, value => {
                                        return (
                                          value.questionId == index.question
                                        );
                                      })
                                    : null;
                                console.log(isSolution, "isSol");
                                return (
                                  <Content key={index} padder>
                                    <Row>
                                      <Col style={{ width: "10%" }}>
                                        <Radio
                                          onPress={() => {
                                            this.setState({ selected: true });

                                            this.handleSubmit(
                                              item._id,
                                              value.opt_id
                                            );
                                          }}
                                          selected={this.state.selected}
                                        />
                                      </Col>
                                      <Col>
                                        <Text>{value.option}</Text>
                                      </Col>
                                    </Row>
                                  </Content>
                                );
                              })}
                              <View style={{ paddingTop: 15 }}>
                                <HorizontalLine />
                              </View>
                            </Content>
                          )}
                        />
                      </Content>
                    )}
                  />
                </CardItem>
              </Content>
            </Card>
          </Content>
        ) : (
          <Content padder>
            <Card style={styles.blockView}>
              <CardItem>
                <Text style={styles.headerText}>Start Test</Text>
              </CardItem>
              <HorizontalLine />
              <CardItem>
                <Text style={styles.text}>
                  To Start Test, please turn off your Internet connection.
                </Text>
              </CardItem>
              {isOnline ? (
                <Button disabled block>
                  <Text>Click Here</Text>
                </Button>
              ) : (
                <CustomButton
                  text="Click Here"
                  onPress={this.handleStartTest}
                />
              )}
            </Card>
          </Content>
        )}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  callHelp: state.callHelp,
  questions: state.questions
});
export default connect(mapStateToProps, { callingHelp })(TestPage);
