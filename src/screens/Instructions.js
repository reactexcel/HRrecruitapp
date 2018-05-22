import React, { Component } from "react";
import { Image, AsyncStorage } from "react-native";
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

class Instructions extends Component {
  componentDidMount() {
    const fb_id = this.props.navigation.getParam("fb_id");
    this.props.getQuestions(fb_id);
  }
  componentWillReceiveProps(nxtprops){
    if(nxtprops.questions.data.status == 1){
      AsyncStorage.setItem('question', JSON.stringify({data:nxtprops.questions.data}));
    }
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
  handlePress = () => {
    this.props.navigation.navigate("TestPage", {
      ...this.props.questions,
      ...this.props.navigation.state.params
    });
  };
  render() {
    const instructions = {
      ins:
        "The test consists of multiple sections, make sure to complete all sections.There is time limit of the test. A time counter will start as soon as the test gets started and test will automatically be submitted when the time limit is reached.Do not close the test all in between, if you do you will have to start from scratch. Test is given best in landscape mode. So change your mobile display to landscape. Do not open any other tabs in your browser, if you open a new tab it will get recorded."
    };
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
            <CardItem>
              <Text style={styles.text}>{instructions.ins}</Text>
            </CardItem>
            {questions !== null ? (
              <CustomButton text="Continue" onPress={this.handlePress} />
            ) : (
              <Spinner color="#2196f3" />
            )}
          </Card>
        </Content>
      </Container>
    );
  }
}
const mapStatetoProps = ({ questions }) => ({ questions });

export default connect(mapStatetoProps, { getQuestions })(Instructions);
