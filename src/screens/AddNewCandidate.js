import React, {Component, Fragment} from 'react';
import {
  View,
  Alert,
  Platform,
  PermissionsAndroid,
  ScrollView,
  Animated,
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
  Picker,
  Spinner,
  Button,
  Icon,
  Label,
  Form,
} from 'native-base';
import Permissions from 'react-native-permissions';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {reduxForm, Field} from 'redux-form';
import {isEmail, isMobilePhone, isLowercase} from 'validator';
import Logo from '../components/Logo';
import CustomButton from '../components/CustomButton';
import styles from '../styles';
import _styles from '../styles/screens/AddCandidate';
import {COLOR} from '../styles/color';
import {notify} from '../helper/notify';
import {connect} from 'react-redux';
import {
  addCandidate,
  candidateValidationapi,
  candidateUploadImage,
  candidateUploadProfile,
  getCandidateUpdateProfileDetails,
  getCandidateJobDetails,
  addNewCandidate,
} from '../actions';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
// var RNFS = require('react-native-fs');
import {setItem, getItem} from '../helper/storage';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import {UploadProfile} from '../actions/actions';
import SplashScreen from 'react-native-splash-screen';
import toastMessage from '../helper/toastAlert';
// http://176.9.137.77:8081/exams/getQuestinsForCandidate/6145055953

class AddCandidate extends Component {
  contentHeight = 0;
  scrollViewHeight = 0;
  constructor() {
    super();
    this._animatedValue = new Animated.ValueXY();
    this._animatedValue.setValue({x: 0, y: 0});
    this.state = {
      candidate_email: '',
      from: '',
      mobile_no: '',
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: COLOR.LGONE,
      elevation: 0,
    },
    headerTintColor: COLOR.PINK,
  };

  async componentDidMount() {
    const candidate_email = await getItem('email');
    if (candidate_email) {
        this.setState({candidate_email})
      this.props.change('candidate_email', candidate_email);
    }
  }

  handleSubmit = async () => {
    const {candidate_email, from, mobile_no} = this.state;
    const data = {
      candidate_email,
      from,
      mobile_no,
    };
    await setItem('email', JSON.stringify(candidate_email));
    this.props.addNewCandidate(data);
  };

  componentDidUpdate(preProps) {
    const {addNewUser} = this.props.candidate;
    if (
      addNewUser.isSuccess !== preProps.candidate.addNewUser.isSuccess &&
      addNewUser.isSuccess
    ) {
      this.props.navigation.navigate('ThankYou');
    }
  }

  renderField(props) {
    const {input, ...inputProps} = props;
    const {
      meta: {touched, error, active},
    } = props;
    const underLineColor = active ? COLOR.MUSTARD : COLOR.PURPLE;
    const {} = props;
    const {} = props;
    return (
      <Fragment>
        <Item stackedLabel style={[_styles.inputTextView]}>
          <Label style={_styles.labelText}>{props.labelName}</Label>
          <Input
            style={styles.inputText}
            {...inputProps}
            onChangeText={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            value={input.value}
            placeholderTextColor={COLOR.WHITE}
            selectionColor={COLOR.LTONE}
            underlineColorAndroid={underLineColor}
          />
        </Item>
        <View style={_styles.errorTextView}>
          {touched && error && <Text style={_styles.errorText}>{error}</Text>}
        </View>
      </Fragment>
    );
  }

  render() {
    const {handleSubmit} = this.props;
    const {
      addNewUser: {isLoading},
    } = this.props.candidate;
    const {} = this.state;
    return (
      <Container style={styles.container}>
        <LinearGradient
          style={styles.linearGradientView}
          colors={[COLOR.LGONE, COLOR.LGTWO]}>
          <ScrollView
            contentHeight={1000}
            contentContainerStyle={{flex: 0}}
            ref={scroll => {
              this.scroll = scroll;
            }}
            overScrollMode="never">
            <Content padder>
              <Grid>
                <Row style={[styles.logoView, {marginTop: -40}]}>
                  <Logo />
                </Row>
                <Row
                  style={{
                    justifyContent: 'center',
                    marginTop: -30,
                    marginBottom: 25,
                  }}>
                  <View style={styles.descriptionText}>
                    <Text style={_styles.acquaintedTitle}>
                      Let's get acquainted
                    </Text>
                    <Text style={_styles.acquaintedDescription}>
                      Let’s get acquainted Excellence Technologies gathers data
                      to ensure the accuracy of the information we are providing
                      for you as well as the security of business for employers
                      and workers.
                    </Text>
                  </View>
                </Row>
                <Row>
                  <View style={styles.blockView}>
                    <Form>
                      <Field
                        name="candidate_email"
                        labelName="EMAIL"
                        keyboardType="email-address"
                        component={this.renderField}
                        autoCapitalize="none"
                        onChange={candidate_email =>
                          this.setState({candidate_email})
                        }
                      />
                      <Field
                        name="from"
                        labelName="NAME"
                        component={this.renderField}
                        onChange={from => this.setState({from})}
                      />
                      <Field
                        name="mobile_no"
                        labelName="PHONE"
                        component={this.renderField}
                        keyboardType="numeric"
                        onChange={mobile_no => this.setState({mobile_no})}
                      />
                    </Form>
                  </View>
                </Row>
              </Grid>
            </Content>
          </ScrollView>
          {isLoading ? (
            <Spinner color={COLOR.MUSTARD} />
          ) : (
            <CustomButton
              textColor={{color: COLOR.LGONE}}
              style={{backgroundColor: COLOR.MUSTARD}}
              btnStyle={_styles.joinNowBtn}
              btnTextStyle={_styles.joinNowBtnText}
              text="SUBMIT"
              onPress={handleSubmit(this.handleSubmit)}
            />
          )}
        </LinearGradient>
      </Container>
    );
  }
}
validate = values => {
  const errors = {};
  if (!values.from) {
    errors.from = 'Cannot be Empty';
  }

  if (!values.candidate_email) {
    errors.candidate_email = 'Cannot be Empty';
  } else if (
    !isEmail(values.candidate_email) ||
    !isLowercase(values.candidate_email)
  ) {
    errors.candidate_email = 'Enter a valid email and must be in lowercase';
  }
  if (!values.mobile_no) {
    errors.mobile_no = 'Cannot be Empty';
  } else if (!isMobilePhone(values.mobile_no, 'en-IN')) {
    errors.mobile_no = 'Enter valid phone number';
  }
  return errors;
};

const mapStateToProps = state => {
  return {
    candidateValidation: state.candidateValidation,
    candidate: state.candidate,
    appliedJob: state.appliedJob,
    candidateProfileUpdateDetails: state.candidateProfileUpdateDetails,
  };
};
export default reduxForm({
  form: 'AddCandidate',
  validate,
  initialized: true,
  enableReinitialize: true,
})(
  connect(
    mapStateToProps,
    {
      addCandidate,
      UploadProfile,
      candidateUploadProfile,
      getCandidateUpdateProfileDetails,
      getCandidateJobDetails,
      candidateValidationapi,
      addNewCandidate,
    },
  )(AddCandidate),
);
