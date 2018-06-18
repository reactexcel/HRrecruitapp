import React, { Component } from "react";
import { StyleSheet, Modal } from "react-native";
import { Container, Content, Text, Button, Card, CardItem } from "native-base";
import HorizontalLine from "./HorizontalLine";
import CustomButton from "./CustomButton";
import styles from "../styles";
import PropTypes from "prop-types";

class StartTest extends Component {
  state = {
    modalVisible: false
  };
  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };
  render() {
    const { isOnline, handleStartTest, handleCallHelp } = this.props;
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
                <Text uppercase={false} style={_styles.Button}>
                  Click Here
                </Text>
              </Button>
            ) : (
              <CustomButton text="Click Here" onPress={handleStartTest} />
            )}
            <CardItem />
            <CardItem>
              <Text style={styles.text}>
                To Call Help, Internet connection must be on.
              </Text>
            </CardItem>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
            >
              <Card style={styles.blockView}>
                <CardItem>
                  <Text style={styles.headerText}>
                    To Call Help, Internet connection must be on.
                  </Text>
                </CardItem>
                <CardItem>
                  <CustomButton
                    onPress={() =>
                      this.setModalVisible(!this.state.modalVisible)
                    }
                    text="Close"
                  />
                </CardItem>
                <CardItem>
                  {!isOnline ? (
                    <Button disabled block>
                      <Text uppercase={false} style={_styles.Button}>
                        Call for Help
                      </Text>
                    </Button>
                  ) : (
                    <CustomButton
                      onPress={handleCallHelp}
                      text="Call for Help"
                    />
                  )}
                </CardItem>
              </Card>
            </Modal>
            {/* {!isOnline || calling ? (
              <Button disabled block>
                <Text uppercase={false} style={_styles.Button}>
                  Call for Help
                </Text>
              </Button>
            ) : ( */}
            <CustomButton
              onPress={() => {
                this.setModalVisible(true);
              }}
              text="Call for Help"
            />
            {/* )} */}
          </Card>
        </Content>
      </Container>
    );
  }
}

const _styles = StyleSheet.create({
  helpButton: {
    fontSize: 15,
    fontWeight: "300",
    letterSpacing: 1
  }
});

StartTest.propTypes = {
  isOnline: PropTypes.bool,
  handleStartTest: PropTypes.func.isRequired,
  calling: PropTypes.bool,
  handleCallHelp: PropTypes.func.isRequired
};
export default StartTest;
