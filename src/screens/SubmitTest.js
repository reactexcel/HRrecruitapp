import React, {Component} from 'react';
import {BackHandler, Alert, Platform, Animated} from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Thumbnail,
  Spinner,
} from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import HorizontalLine from '../components/HorizontalLine';
import CustomButton from '../components/CustomButton';
import styles from '../styles';
import {COLOR} from '../styles/color';
import {connect} from 'react-redux';
import forEach from 'lodash/forEach';
import {submitTest} from '../actions';
import {getItem, setItem} from '../helper/storage';
import {SUCCESS_STATUS, LOW_CONN_ALERT} from '../helper/constant';
import {notify} from '../helper/notify';
import AsyncStorage from '@react-native-community/async-storage';

class SubmitTest extends Component {
  constructor() {
    super();
    this.state = {
      isOnline: false,
      fontSize: new Animated.Value(13.5),
      fontColor: new Animated.Value(0),
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleNetwork,
    );
  }
  handleNetwork = isconnect => {
    //functinality for net connection at time of answering paper
    this.setState({isOnline: isconnect});
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleNetwork,
    );
  }

  componentDidUpdate(preProps) {
    const {isSuccess} = this.props.test;
    if (isSuccess !== preProps.test.isSuccess && isSuccess) {
      Alert.alert(
        'Thank You',
        'Your response has been recorded. Please contact HR for for further instructions.',
        [
          {
            text: 'OK',
            onPress: async () => {
              await AsyncStorage.clear()
              this.props.navigation.replace('HomePage');
            },
          },
        ],
        {cancelable: false},
      );
    }
  }

  handleBackButton = () => {
    alert('Not Allowed');
    return true;
  };
  static navigationOptions = ({navigation}) => {
    // const name = navigation.getParam("name");
    const profile_pic = navigation.getParam('profile_pic');
    return {
      // title: name.split(" ")[0],
      headerStyle: {
        backgroundColor: COLOR.LGONE,
        elevation: 0,
        color: 'white',
      },
      headerTitleStyle: {
        fontFamily: 'Montserrat',
        color: COLOR.PINK,
        fontWeight: '100',
      },
      headerLeft: (
        <Content style={{paddingHorizontal: 10}}>
          <Thumbnail small source={{uri: profile_pic}} />
        </Content>
      ),
    };
  };

  handleTestSubmit = async () => {
    const email = this.props.navigation.getParam('email');
    const answers = await getItem('solution');
    const {params} = this.props.navigation.state;
    const {candidateInterview, examQuestions} = this.props.candidate;
    const {testPaperId, data} = examQuestions.data;
    const {user_id} = candidateInterview.data;
    const questionIds = [];
    forEach(data, value => {
      forEach(value.questions, value => {
        questionIds.push(value._id);
      });
    });
    const taken_time_minutes = params.taken_time_minutes;
    let payload = {
      answers: answers.solution,
      user_id,
      questionIds,
      taken_time_minutes,
      testPaperId,
    };
    this.props.submitTest(payload);
  };

  onSubmitNoInternet = () => {
    Animated.parallel([
      Animated.timing(this.state.fontSize, {
        toValue: 18,
        duration: 1000,
      }).start(() => {
        Animated.timing(this.state.fontSize, {
          toValue: 13.5,
          duration: 1000,
        }).start();
      }),
      Animated.timing(this.state.fontColor, {
        toValue: 1,
        duration: 1000,
      }).start(() => {
        Animated.timing(this.state.fontColor, {
          toValue: 0,
          duration: 1000,
        }).start();
      }),
    ]).start();
  };
  render() {
    const {isOnline} = this.state;
    const {
      test: {isLoading},
    } = this.props;
    const BackgroundColorConfig = this.state.fontColor.interpolate({
      inputRange: [0, 0.5, 1],

      outputRange: ['#253055', '#ed1040', '#253055'],
    });
    return (
      <Container style={styles.container}>
        <Content padder>
          <Card style={styles.blockView}>
            <CardItem>
              <Text style={styles.headerText}>Submit Test</Text>
            </CardItem>
            <HorizontalLine />
            <CardItem>
              <Animated.Text
                style={[
                  styles.text,
                  {fontSize: this.state.fontSize, color: BackgroundColorConfig},
                ]}>
                {LOW_CONN_ALERT}
              </Animated.Text>
            </CardItem>
            {!isOnline ? (
              <Button
                style={{backgroundColor: '#cccccc'}}
                onPress={this.onSubmitNoInternet}
                /* disabled */ block>
                <Text>Click Here</Text>
              </Button>
            ) : isLoading ? (
              <Spinner color={COLOR.MUSTARD} />
            ) : (
              <CustomButton
                textColor={{color: COLOR.LGONE}}
                style={{backgroundColor: COLOR.MUSTARD}}
                text="Click Here"
                onPress={this.handleTestSubmit}
              />
            )}
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  test: state.test,
  email: state.interviewSignUp.email,
  candidate: state.candidate,
});
export default connect(
  mapStateToProps,
  {submitTest},
)(SubmitTest);
