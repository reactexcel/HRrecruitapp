import React, { Component, Fragment } from "react";
import { Image, Alert, AsyncStorage } from "react-native";
import {
  Container,
  Content,
  Text,
  Thumbnail,
  Card,
  CardItem,
  Spinner
} from "native-base";
import { connect } from "react-redux";
import { getQuestions } from "../actions";
import styles from "../styles";
import CustomButton from "../components/CustomButton";
import HorizontalLine from "../components/HorizontalLine";
import { setItem, getItem } from "../helper/storage";
import { SUCCESS_STATUS } from "../helper/constant";
import { COLOR } from "../styles/color";
import HTML from "react-native-render-html";

class Instructions extends Component {
  async componentDidMount() {
    const fb_id = this.props.navigation.getParam("fb_id");
    const email = this.props.navigation.getParam("email");
    this.props.getQuestions(email, fb_id);
    const get_email = await getItem("email");
    if (get_email !== undefined && get_email.email !== email) {
      AsyncStorage.removeItem("solution");
      AsyncStorage.removeItem("remaining_time");
    }
    setItem("email", JSON.stringify({ email }));
  }
  static getDerivedStateFromProps(nxtprops) {
    if (nxtprops.questions !== null && nxtprops.questions !== undefined) {
      const { data, msg } = nxtprops.questions;
      if (data !== undefined && data.status == SUCCESS_STATUS) {
        setItem("question", JSON.stringify({ data: data }));
      }
      if (msg !== undefined) {
        alert(msg);
      }
    }
    return null;
  }

  static navigationOptions = ({ navigation }) => {
    const name = navigation.getParam("name");
    const profile_pic = navigation.getParam("profile_pic");
    return {
      title: name.split(" ")[0],
      headerLeft: (
        <Content padder>
          <Thumbnail small source={{ uri: profile_pic }} />
        </Content>
      )
    };
  };
  handlePress = () => {
    this.props.navigation.navigate("TestPage", {
      ...this.props.questions,
      ...this.props.navigation.state.params
    });
  };
  render() {
    const name = this.props.navigation.getParam("name");
    const { questions } = this.props;
    return (
      <Container style={styles.container}>
        <Content padder>
          <Card style={styles.blockView}>
            <CardItem>
              <Text style={styles.headerText}>Instructions</Text>
            </CardItem>
            <HorizontalLine />
            {questions !== null ? (
              <Fragment>
                {questions.data !== undefined ? (
                  <Fragment>
                    <CardItem>
                      <HTML html={questions.data.instructions} />
                    </CardItem>
                    <CustomButton text="Continue" onPress={this.handlePress} />
                  </Fragment>
                ) : (
                  <Fragment>
                    <CardItem>
                      <Text style={styles.text}>
                        Hi {name}, you are applying for the job profile for
                        which there is no online interview process. Please
                        contact hr for the same so this issue can be sorted out
                      </Text>
                    </CardItem>
                    <CustomButton
                      text="Click Here"
                      onPress={() =>
                        this.props.navigation.navigate("InterviewLogin")
                      }
                    />
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <Spinner color={COLOR.Spinner} />
            )}
          </Card>
        </Content>
      </Container>
    );
  }
}
const mapStatetoProps = ({ questions }) => ({ questions });

export default connect(
  mapStatetoProps,
  { getQuestions }
)(Instructions);
