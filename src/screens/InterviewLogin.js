import React, { Component, Fragment } from "react";
import { View } from "react-native";
import {
  Container,
  Content,
  Body,
  Text,
  Card,
  CardItem,
  Item,
  Input,
  Spinner,
} from "native-base";
import CustomButton from "../components/CustomButton";
import { isLowercase, isEmail } from "validator";
import Logo from "../components/Logo";
import styles from "../styles/InterviewLogin";
import { connect } from "react-redux";
import { signUp } from "../actions";

class InterviewLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      errors: {}
    };
  }
  static navigationOptions = {
    header: null
  };

  handleSubmit = async email => {
    const errors = this.validate(this.state.email);
    if (Object.keys(errors).length === 0) {
      await this.props.signUp(this.state.email);
      const {
        interviewSignUp: { status }
      } = this.props;
      if (status === 0) {
        this.props.navigation.navigate("VerifyingCandidate");
        this.setState({ email: "" });
      } else if (status === 1) {
        this.props.navigation.navigate("ExistingEmail");
        this.setState({ email: "" });
      }
    }
  };

  validate(data) {
    const errors = {};
    if (!data) {
      errors.data = "Please enter your email";
      alert(errors.data);
    } else if (!isLowercase(data)) {
      errors.data = "Email must be in lowercase";
      alert(errors.data);
    } else if (!isEmail(data)) {
      errors.data = "Please enter a valid email";
      alert(errors.data);
    }
    return errors;
  }

  render() {
    const {
      interviewSignUp: { registering }
    } = this.props;
    const { navigation } = this.props;
    const appliedBefore = navigation.getParam("appliedBefore", false);
    const appliedText = navigation.getParam("appliedText");

    return (
      <Container style={styles.container}>
        <Content padder>
          <View style = {styles.logoView}>
            <Logo />
          </View>
          <Card style={styles.formView}>
            {!appliedBefore ? (
              <Fragment>
                <CardItem header>
                  <Text style={styles.headerText}>Interview Test Papers</Text>
                </CardItem>
                <Content style={styles.horizontalLine} />
                <CardItem>
                  <Body>
                    <Text style={styles.text}>
                      Login with your Email-Id to take interview test paper, in
                      case of any questions please contact HR
                    </Text>
                  </Body>
                </CardItem>
              </Fragment>
            ) : (
              <CardItem>
                <Text style={styles.text}>{appliedText}</Text>
              </CardItem>
            )}
            <Item style={styles.inputTextView}>
              <Input
                style={styles.inputText}
                placeholder="Email"
                placeholderTextColor="#c1c0c1"
                name="email"
                value={this.state.email}
                keyboardType="email-address"
                selectionColor="#c1c0c1"
                underlineColorAndroid="#c1c0c1"
                onChangeText={text => this.setState({ email: text })}
                autoCapitalize="none"
              />
            </Item>
            {registering ? (
              <Spinner color="#0000ff" />
            ) : (
              <CustomButton onPress={this.handleSubmit} text = "Submit"/>
            )}
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ interviewSignUp }) => ({ interviewSignUp });

export default connect(mapStateToProps, { signUp })(InterviewLogin);
