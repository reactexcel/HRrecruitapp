import React, { Component } from "react";
import { StyleSheet, Modal, View } from "react-native";
import { Container, Content, Text, Button, Card, CardItem } from "native-base";
import HorizontalLine from "./HorizontalLine";
import CustomButton from "./CustomButton";
import styles from "../styles";
import _styles from "../styles/components/StartTest";
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
                To Call Help during Test, Switch on your Internet connection and
                click here.
              </Text>
            </CardItem>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {}}
            >
              <View style={_styles.modalView}>
                <CardItem>
                  <Text style={styles.headerText}>
                    To Call Help, Internet connection must be on.
                  </Text>
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
                      onPress={() => {
                        handleCallHelp();
                        this.setModalVisible(!this.state.modalVisible);
                      }}
                      text="Call for Help"
                    />
                  )}
                </CardItem>
                <CardItem>
                  <CustomButton
                    onPress={() =>
                      this.setModalVisible(!this.state.modalVisible)
                    }
                    text="Close"
                  />
                </CardItem>
              </View>
            </Modal>
            {!calling ? (
              <CustomButton
                onPress={() => {
                  isOnline ? handleCallHelp() : this.setModalVisible(true);
                }}
                text="Call for Help"
              />
            ) : (
              <Button disabled block>
                <Text uppercase={false} style={_styles.Button}>
                  Call for Help
                </Text>
              </Button>
            )}
          </Card>
        </Content>
      </Container>
    );
  }
}

StartTest.propTypes = {
  isOnline: PropTypes.bool,
  handleStartTest: PropTypes.func.isRequired,
  calling: PropTypes.bool,
  handleCallHelp: PropTypes.func.isRequired
};
export default StartTest;
