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
    console.log(fb_id);
    this.props.getQuestions(fb_id);
  }
  static navigationOptions = ({ navigation }) => {
    const name = navigation.getParam("name");
    const profile_pic = navigation.getParam("profile_pic");
    return {
      title: name,
      headerRight: <Thumbnail small source={{ uri: profile_pic }} />
    };
  };
  render() {
    const name = this.props.navigation.getParam("name");
    console.log(name);
    return (
      <Container style={styles.container}>
        <Content padder>
          <Card style={styles.blockView}>
            <CardItem>
              <Text style={styles.headerText}>Instructions</Text>
            </CardItem>
            <CustomButton text="Continue" />
          </Card>
        </Content>
      </Container>
    );
  }
}

export default connect(null, { getQuestions })(Instructions);
