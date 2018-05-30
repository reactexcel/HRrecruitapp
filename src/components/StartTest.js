import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Text, Button, Card, CardItem } from "native-base";
import HorizontalLine from "./HorizontalLine";
import CustomButton from "./CustomButton";
import styles from "../styles";

class StartTest extends Component {
  render() {
    const { isOnline, handleStartTest } = this.props;
    const { calling } = this.props.callHelp;
    return (
      <Container>
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
              <CustomButton text="Click Here" onPress={handleStartTest} />
            )}
            <CardItem />
            {calling ? (
              <Button disabled block>
                <Text style={_styles.helpButton}>Call for Help</Text>
              </Button>
            ) : (
              <CustomButton
                onPress={this.props.handleCallHelp}
                text="Call for Help"
              />
            )}
          </Card>
        </Content>
      </Container>
    );
  }
}
const _styles = StyleSheet.create({
  helpButton: {
    fontSize: 10,
    textAlign: "center"
  }
});
export default StartTest;
