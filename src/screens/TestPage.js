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
  Spinner
} from "native-base";
import { FlatList } from "react-native";
import { Row, Col, Grid } from "react-native-easy-grid";
import styles from "../styles";
import CustomButton from "../components/CustomButton";
import { callingHelp } from "../actions";
import { notify } from "../helper/notify";
import { COLOR } from "../styles/color";

class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      counter: props.navigation.state.params.data.timeForExam * 60 * 1000,
      questions: []
    };
  }
  componentDidMount() {
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer });
  }
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
  tick = () => {
    this.setState({ counter: this.state.counter - 1000 });
    // let now = new Date().getTime();

    // // Find the distance between now an the count down date
    // let distance = countDownDate - now;

    // // Time calculations for days, hours, minutes and seconds
    // let hours = Math.floor(
    //   (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    // );
    // let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    // let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  };

  static navigationOptions = ({ navigation }) => {
    const name = navigation.getParam("name");
    const profile_pic = navigation.getParam("profile_pic");
    return {
      title: name,
      headerLeft: (
        <Content padder>
          <Thumbnail small source={{ uri: profile_pic }} />
        </Content>
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

  render() {
    const {
      callHelp: { calling, success }
    } = this.props;

    const { data } = this.props.navigation.state.params;
    console.log(data.data, "data");

    if (success !== undefined) {
      if (success === false) {
        notify("Something went wrong");
      }
    }
    return (
      <Container style={styles.container}>
        <Content padder>
          <Card style={styles.blockView}>
            <CardItem>
              <Text style={styles.headerText}> Test Questions </Text>
            </CardItem>
            <Row>
              <Col style={{ width: "75%", alignItems: "flex-start" }}>
                <Text style={styles.text}>
                  Remaining Time :{" "}
                  <Text style={{ color: COLOR.Red }}>{this.state.counter}</Text>
                </Text>
                <Text style={styles.text}>
                  Questions Attempted : {"0/"}
                  {data.count}{" "}
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
            <CardItem>
              <FlatList
                data={data.data}
                renderItem={({ item }) => (
                  <Content>
                    <Text>{item.group_name}</Text>
                    <FlatList
                      data={item.questions}
                      renderItem={({ item,index }) => (
                        <Content>
                          <Text>Ques.{index+1}{" "}{item.question}</Text>
                          <FlatList
                            data={item.options}
                            renderItem={({ item, index }) => (
                              <Text>
                                {index + 1}.{" "}
                                {item.option}
                              </Text>
                            )}
                          />
                        </Content>
                      )}
                    />
                  </Content>
                )}
              />
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = ({ callHelp }) => ({ callHelp });

export default connect(mapStateToProps, { callingHelp })(TestPage);
