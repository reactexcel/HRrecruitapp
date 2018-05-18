import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Content,
  Text,
  Thumbnail,
  Card,
  CardItem
} from "native-base";
import { connect } from "react-redux";
import { getQuestions } from "../actions";
import styles from "../styles";
import CustomButton from "../components/CustomButton";

class Instructions extends Component {
  componentDidMount() {
    const fb_id = this.props.navigation.getParam("fb_id");
    this.props.getQuestions(fb_id);
  }
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
  render() {
    const instructions = {
      ins:
        "The test consists of multiple sections, make sure to complete all sections.There is time limit of the test. A time counter will start as soon as the test gets started and test will automatically be submitted when the time limit is reached.Do not close the test all in between, if you do you will have to start from scratch. Test is given best in landscape mode. So change your mobile display to landscape. Do not open any other tabs in your browser, if you open a new tab it will get recorded."
    };
    const name = this.props.navigation.getParam("name");
    console.log(name);
    return (
      <Container style={styles.container}>
        <Content padder>
          <Card style={styles.blockView}>
            <CardItem>
              <Text style={styles.headerText}>Instructions</Text>
            </CardItem>
            <CardItem>
              <Text style={styles.text}>{instructions.ins}</Text>
            </CardItem>
            <CustomButton text="Continue" />
          </Card>
        </Content>
      </Container>
    );
  }
}

export default connect(null, { getQuestions })(Instructions);
