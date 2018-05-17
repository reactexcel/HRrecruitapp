import React, { Component, Fragment } from "react";
import { AsyncStorage } from "react-native";
import {
  Container,
  Content,
  Body,
  Text,
  Card,
  CardItem,
  Item,
  Input,
  Spinner
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import CustomButton from "../components/CustomButton";
import { isLowercase, isEmail } from "validator";
import Logo from "../components/Logo";
import styles from "../styles";
import _styles from "../styles/InterviewLogin";
import { COLOR } from "../styles/color";
import { connect } from "react-redux";
import { signUp } from "../actions";
import { setItem } from "../helper";

class InterviewLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: ""
    };
  }
  static navigationOptions = {
    header: null
  };

  handleSubmit = async () => {
    const errors = this.validate(this.state.email);
    if (Object.keys(errors).length === 0) {
      await this.props.signUp(this.state.email);
      const {
        interviewSignUp: { status, fb_id }
      } = this.props;
      if (status === 0) {
        this.props.navigation.navigate("VerifyingCandidate");
        this.setState({ email: "" });
      } else if (status === 1) {
        this.props.navigation.navigate("OTPpage");
        this.textInput._root.clear();
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
          <Grid>
            <Row style={styles.logoView}>
              <Logo />
            </Row>
            <Row>
              <Card style={styles.blockView}>
                {!appliedBefore ? (
                  <Fragment>
                    <CardItem header>
                      <Text style={styles.headerText}>
                        Interview Test Papers
                      </Text>
                    </CardItem>
                    <Content style={_styles.horizontalLine} />
                    <CardItem>
                      <Body>
                        <Text style={styles.text}>
                          Login with your Email-Id to take interview test paper,
                          in case of any questions please contact HR
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
                    ref={input => (this.textInput = input)}
                    style={styles.inputText}
                    placeholder="Email"
                    placeholderTextColor={COLOR.Grey}
                    name="email"
                    value={this.state.email}
                    keyboardType="email-address"
                    selectionColor={COLOR.Grey}
                    underlineColorAndroid={COLOR.Grey}
                    onChangeText={text => this.setState({ email: text })}
                    autoCapitalize="none"
                  />
                </Item>
                {registering ? (
                  <Spinner color="#2196f3" />
                ) : (
                  <CustomButton onPress={this.handleSubmit} text="Submit" />
                )}
              </Card>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ interviewSignUp }) => ({ interviewSignUp });

export default connect(mapStateToProps, { signUp })(InterviewLogin);
