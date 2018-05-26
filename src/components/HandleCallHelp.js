import React, { Component, Fragment } from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Text, Button } from "native-base";
import { notify } from "../helper/notify";
import { connect } from "react-redux";
import { callHelp } from "../actions";
import { SUCCESS_STATUS } from "../helper/constant";

class HandleCallHelp extends Component {
  handleCallHelp = async () => {
    const fb_id = this.props.navigation.getParam("fb_id");
    const accessToken = fb_id ? true : null;
    await this.props.callingHelp(accessToken, fb_id);
    const { data } = this.props.callHelp;
    if (data.status === SUCCESS_STATUS) {
      notify("Please Wait. The message has been sent to HR");
    }
  };

  render() {
    const {
      callHelp: { calling, success }
    } = this.props;
    if (success !== undefined) {
      if (success === false) {
        notify("Something went wrong");
      }
    }
    return (
      <Fragment>
        {calling ? (
          <Button disabled>
            <Text style={styles.helpButton}>Call for Help</Text>
          </Button>
        ) : (
          <Button onPress={this.handleCallHelp} info>
            <Text style={styles.helpButton}>Call for Help</Text>
          </Button>
        )}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  helpButton: {
    fontSize: 10,
    textAlign: "center"
  }
});

const mapStateToProps = ({ calling }) => ({ calling });

export default connect(mapStateToProps, { callHelp })(HandleCallHelp);
