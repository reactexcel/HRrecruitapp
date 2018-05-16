import React, { Component } from "react";
import {View} from "react-native";
import { Container, Content, Card, CardItem, Item ,Text} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import Logo from "../components/Logo";
import CustomButton from "../components/CustomButton";
import styles from '../styles'

class VerifyingCandidate extends Component {
  static navigationOptions = {
    header: null
  };
  handlePressApplied = () =>
    this.props.navigation.navigate("InterviewLogin", {
      appliedBefore: true,
      appliedText:
        "Input the email id with which you have already applied, so we can find your job application easily"
    });
  handlePressWalkin = () => this.props.navigation.navigate("AddCandidate");
  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
        <Grid>
        <Row style={styles.logoView}>
            <Logo />
          </Row>
          <Row>
          <Card style={styles.blockView}>
            <CardItem>
              <Text style={styles.headerText}>
                We couldn't find your email address in our system. Please select
                option below
              </Text>
            </CardItem>
            <CardItem>
              <CustomButton
                text="Have you applied before?"
                onPress={this.handlePressApplied}
              />
              </CardItem>
              <CardItem>
              <CustomButton
                text="It's Walk-In"
                onPress={this.handlePressWalkin}
              />
              </CardItem>
          </Card>
          </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default VerifyingCandidate;
