import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {COLOR} from '../styles/color';
import styles from '../styles';
import {Container} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
import CountDown from 'react-native-countdown-component';
import {getExamQuestions, verifyCandidate} from '../actions';
import {connect} from 'react-redux';
import {getItem} from '../helper/storage';

class ThankYou extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    reset: 0,
  };
  componentDidMount() {
    SplashScreen.hide();
  }

  getStatus = async () => {
    const email = await getItem('email');
    const paylaod = {
      email,
      appliedEmail: email,
      profile_pic: `https://pikmail.herokuapp.com/${email}?size=60`,
    };
    await this.props.verifyCandidate(paylaod);
  };

  async componentDidUpdate(nextProps) {
    const {candidateInterview,
      candidateInterview: {isSuccess},
    } = this.props.candidate;
    if (
      isSuccess !== nextProps.candidate.candidateInterview.isSuccess &&
      isSuccess
    ) {
      if (candidateInterview.data.user_id) {
        this.props.navigation.replace('Instructions');
      }
    }
  }

  onFinish = () => {
    this.getStatus();
    this.setState({reset: this.state.reset + 1});
  };

  render() {
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
            <View style={style.textWrapper}>
              <Text style={style.thnkuText}>Thank You!</Text>
              <Text style={style.description}>
                Please contact HR to assign you the test paper. Keep this page
                open, test paper will be assigned to you soon.
              </Text>
              <View style={style.seperator} />
              <CountDown
                id={`${this.state.reset}`}
                until={6}
                size={30}
                running={true}
                onFinish={() => this.onFinish()}
                digitStyle={{backgroundColor: 'transparent'}}
                digitTxtStyle={{color: COLOR.WHITE}}
                timeToShow={['M', 'S']}
                timeLabels={{m: '', s: ''}}
              />
            </View>
          </ScrollView>
        </LinearGradient>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    candidate: state.candidate,
  };
};

export default connect(
  mapStateToProps,
  {
    getExamQuestions,
    verifyCandidate,
  },
)(ThankYou);

const style = StyleSheet.create({
  container: {},
  thnkuText: {
    fontSize: 35,
    textAlign: 'center',
    fontFamily: 'Montserrat-Semibold',
    marginTop: 100,
    color: COLOR.WHITE,
  },
  textWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  description: {
    textAlign: 'center',
    color: COLOR.WHITE,
    fontSize: 15,
    fontFamily: 'Montserrat-Semibold',
  },
  seperator: {
    marginBottom: 20,
  },
});
