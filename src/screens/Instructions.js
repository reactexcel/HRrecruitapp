import React, { Component } from "react";
import { Image } from "react-native";
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
import { setItem } from "../helper/storage";
import { SUCCESS_STATUS } from "../helper/constant";

class Instructions extends Component {
  componentDidMount() {
    const fb_id = this.props.navigation.getParam("fb_id");
    this.props.getQuestions(fb_id);
  }
  static getDerivedStateFromProps(nxtprops) {
    if (nxtprops.questions !== null && nxtprops.questions !== undefined) {
      if (nxtprops.questions.data.status == SUCCESS_STATUS) {
        setItem("question", JSON.stringify({ data: nxtprops.questions.data }));
      }
    }
    return null;
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
              <React.Fragment>
                <CardItem>
                  <Text style={styles.text}>{questions.data.instructions}</Text>
                </CardItem>
                <CustomButton text="Continue" onPress={this.handlePress} />
              </React.Fragment>
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
