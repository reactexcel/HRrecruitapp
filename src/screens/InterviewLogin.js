import React, {Component, Fragment} from 'react';
import {
  BackHandler,
  Alert,
  View,
  Platform,
  PermissionsAndroid,
  StatusBar,
} from 'react-native';
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
  Toast,
  Button,
  Header,
} from 'native-base';
import {connect} from 'react-redux';
import Logo from '../components/Logo';
import styles from '../styles';
import _styles from '../styles/screens/InterviewLogin';
import {isLowercase, isEmail} from 'validator';
import {COLOR} from '../styles/color';
import {
  signUp,
  connectionState,
  getCandidateDetails,
  getCandidateRoundDetails,
  getCandidateJobDetails,
  candidateValidationapi,
  interviewLoginClearData,
  verifyCandidate,
  setCurrentUser,
} from '../actions';
import LinearGradient from 'react-native-linear-gradient';
import AlertMessage from '../helper/toastAlert';
import {setItem, getItem} from '../helper/storage';
class InterviewLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      spinner: false,
      alertMessage: false,
      activity: true,
      isError: false,
      isConnected: false,
    };
  }
  static navigationOptions = {
    headerStyle: {
      backgroundColor: COLOR.LGONE,
      elevation: 0,
    },
    headerTintColor: COLOR.PINK,
  };

  async componentDidUpdate(nextProps) {
    const {
      candidateInterview,
      candidateInterview: {isSuccess},
    } = this.props.candidate;
    if (
      isSuccess !== nextProps.candidate.candidateInterview.isSuccess &&
      isSuccess
    ) {
      this.props.setCurrentUser(this.state.email);
      this.setState({email: ''});
      if(candidateInterview.data.user_id){
        this.props.navigation.replace('Instructions');
      }else{
        this.props.navigation.replace('VerifyingCandidate');
      }
    }
  }


  handleSubmit = async () => {
    const {email} = this.state;
    const paylaod = {
      email,
      appliedEmail: email,
      profile_pic: `https://pikmail.herokuapp.com/${email}?size=60`,
    };
    let error = this.validate(email);
    if (error) {
      AlertMessage(error, 'toast');
    } else {
      this.props.verifyCandidate(paylaod);
    }
  };

  validate = data => {
    let errors = '';
    if (!data) {
      errors = 'Please enter your email';
    } else if (!isLowercase(data)) {
      errors = 'Email must be in lowercase';
    } else if (!isEmail(data)) {
      errors = 'Please enter a valid email';
    }
    return errors;
  };

  render() {
    const {
      candidateInterview: {isLoading},
    } = this.props.candidate;
    const {appliedText} = this.props.navigation.state.params;
    return (
      <LinearGradient
        colors={[COLOR.LGONE, COLOR.LGTWO]}
        style={_styles.lgView}>
        <View style={styles.logoView}>
          <Logo />
        </View>
        <View style={_styles.textInputView}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontFamily: 'Montserrat-SemiBold',
                textAlign: 'center',
              }}>
              {appliedText
                ? appliedText
                : 'Login with your Email-Id to take interview test paper, in case of any questions please contact HR'}
            </Text>
          </View>
          <Item style={styles.itemView}>
            <Input
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor={COLOR.DARKGREY}
              name="email"
              value={this.state.email}
              keyboardType="email-address"
              selectionColor={COLOR.DARKGREY}
              underlineColorAndroid={COLOR.PURPLE}
              onChangeText={email => this.setState({email})}
              autoCapitalize="none"
            />
          </Item>
        </View>
        <View style={_styles.btnView}>
          {isLoading ? (
            <Spinner color={COLOR.MUSTARD} />
          ) : (
            <Button
              onPress={this.handleSubmit}
              rounded
              style={_styles.btnStyle}>
              <Text style={_styles.textStyle}>Submit</Text>
            </Button>
          )}
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    interviewSignUp: state.interviewSignUp,
    isConnected: state.network.isConnected,
    candidateInfo: state.candidateInfo,
    candidateValidation: state.candidateValidation,
    appliedJob: state.appliedJob,
    candidate: state.candidate,
  };
};
export default connect(
  mapStateToProps,
  {
    signUp,
    connectionState,
    verifyCandidate,
    getCandidateDetails,
    getCandidateRoundDetails,
    getCandidateJobDetails,
    candidateValidationapi,
    interviewLoginClearData,
    setCurrentUser
  },
)(InterviewLogin);
