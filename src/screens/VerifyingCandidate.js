import React, {Component} from 'react';
import {View} from 'react-native';
import {Container, Content, Card, CardItem, Item, Text} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Logo from '../components/Logo';
import CustomButton from '../components/CustomButton';
import styles from '../styles';
import _styles from '../styles/screens/AddCandidate';
import {COLOR} from '../styles/color';
import SplashScreen from 'react-native-splash-screen';

class VerifyingCandidate extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    // SplashScreen.hide();
  }

  handlePressApplied = () =>
    this.props.navigation.navigate('InterviewLogin', {
      appliedBefore: true,
      appliedText:
        'Input the email id with which you have already applied, so we can find your job application easily',
    });
  handlePressWalkin = () => this.props.navigation.navigate('AddCandidate');
  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
          <Grid>
            <Row style={styles.logoView}>
              <Logo />
            </Row>
            <Row style={{flexDirection: 'column',}}>
              <Text style={_styles.headerText}>
                We couldn't find your email address in our system. Please select
                option below
              </Text>
              <View style={_styles.buttonWrapper}>
                <CustomButton
                  textColor={{color: COLOR.LGONE}}
                  style={{backgroundColor: COLOR.MUSTARD}}
                  btnStyle={_styles.joinNowBtn}
                  btnTextStyle={_styles.joinNowBtnText}
                  text="Have you applied before?"
                  onPress={this.handlePressApplied}
                />
                <Text style={_styles.OrText}>OR</Text>
                <CustomButton
                  textColor={{color: COLOR.LGONE}}
                  style={{backgroundColor: COLOR.MUSTARD}}
                  btnStyle={_styles.joinNowBtn}
                  btnTextStyle={_styles.joinNowBtnText}
                  text="It's Walk-In"
                  onPress={this.handlePressWalkin}
                />
              </View>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default VerifyingCandidate;
