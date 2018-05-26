import React, { Component } from "react";
import { Container, Content, Text, Button, Card, CardItem } from "native-base";
import HorizontalLine from "./HorizontalLine";
import CustomButton from "./CustomButton";
import styles from "../styles";

class StartTest extends Component {
  render() {
    const { isOnline, handleStartTest } = this.props;
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
          </Card>
        </Content>
      </Container>
    );
  }
}
export default StartTest;
