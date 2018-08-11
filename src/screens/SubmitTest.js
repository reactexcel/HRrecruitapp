import React, { Component } from "react";
import { BackHandler, NetInfo, Alert, Platform } from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Thumbnail,
  Spinner
} from "native-base";
import HorizontalLine from "../components/HorizontalLine";
import CustomButton from "../components/CustomButton";
import styles from "../styles";
import { COLOR } from "../styles/color";
import { connect } from "react-redux";
import forEach from "lodash/forEach";
import { submitTest } from "../actions";
import { getItem, setItem } from "../helper/storage";
import { SUCCESS_STATUS } from "../helper/constant";
import { notify } from "../helper/notify";

class SubmitTest extends Component {
  constructor() {
    super();
    this.state = {
      isOnline: false
    };
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleNetwork
    );
  }
  handleNetwork = isconnect => {
    //functinality for net connection at time of answering paper
    this.setState({ isOnline: isconnect });
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleNetwork
    );
  }

  componentDidUpdate() {
    if (this.props.test.data !== undefined) {
      if (this.props.test.data.status === SUCCESS_STATUS) {
        const { roundType } = this.props.navigation.state.params.data;
        const { round } = this.props.navigation.state.params.data;

        Alert.alert(
          "Thank You",
          "Your response has been recorded. Please contact HR for for further instructions.",
          [
            {
              text: "OK",
              onPress: async () => {
                const email = this.props.navigation.getParam("email");
                const stored_email = await getItem("email");
                if (stored_email.email === email) {
                  setItem("round", JSON.stringify({ round }));
                }
                this.props.navigation.navigate("HomePage", {
                  setUser: true
                });
              }
            }
          ],
          { cancelable: false }
        );
      }
    }
    const { success } = this.props.test;
    if (success !== undefined) {
      if (success === false) {
        notify("Something went wrong");
      }
    }
  }

  handleBackButton = () => {
    alert("Not Allowed");
    return true;
  };
  static navigationOptions = ({ navigation }) => {
    const name = navigation.getParam("name");
    const profile_pic = navigation.getParam("profile_pic");
    return {
      title: name.split(" ")[0],
      headerLeft: (
        <Content style={{ paddingHorizontal: 10 }}>
          <Thumbnail small source={{ uri: profile_pic }} />
        </Content>
      )
    };
  };

  handleTestSubmit = async () => {
    const email = this.props.navigation.getParam("email");
    const ans = await getItem("solution");
    const { params } = this.props.navigation.state;
    const fb_id = params.fb_id;
    const job_profile = params.data.job_profile;
    const roundType = params.data.roundType;
    const questionIds = [];
    forEach(params.data.data, value => {
      forEach(value.questions, value => {
        questionIds.push(value._id);
      });
    });
    const taken_time_minutes = params.taken_time_minutes;
    let data;
    if (roundType === "Objective") {
      data = {
        answers: ans.solution,
        fb_id,
        job_profile,
        questionIds,
        taken_time_minutes,
        roundType
      };
    } else if (roundType === "Subjective") {
      data = {
        fb_id,
        roundType
      };
    }
    this.props.submitTest(email, data);
  };

  render() {
    const { isOnline } = this.state;
    const {
      test: { submitting }
    } = this.props;

    return (
      <Container style={styles.container}>
        <Content padder>
          <Card style={styles.blockView}>
            <CardItem>
              <Text style={styles.headerText}>Submit Test</Text>
            </CardItem>
            <HorizontalLine />
            <CardItem>
              <Text style={styles.text}>
                To Submit your Test, please turn on your Internet connection.
              </Text>
            </CardItem>
            {!isOnline ? (
              <Button disabled block>
                <Text>Click Here</Text>
              </Button>
            ) : submitting ? (
              <Spinner color={COLOR.Spinner} />
            ) : (
              <CustomButton text="Click Here" onPress={this.handleTestSubmit} />
            )}
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  test: state.test,
  email: state.interviewSignUp.email
});
export default connect(
  mapStateToProps,
  { submitTest }
)(SubmitTest);
