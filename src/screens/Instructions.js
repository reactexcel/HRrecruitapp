import React, {Component, Fragment} from 'react';
import {Image, Alert, StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Text,
  Thumbnail,
  Card,
  CardItem,
  Spinner,
} from 'native-base';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getQuestions,
  getCandidateRoundDetails,
  getExamQuestions,
} from '../actions';
import styles from '../styles';
import CustomButton from '../components/CustomButton';
import HorizontalLine from '../components/HorizontalLine';
import {setItem, getItem} from '../helper/storage';
import {SUCCESS_STATUS, JOB_APPLYING} from '../helper/constant';
import {COLOR} from '../styles/color';
import HTMLView from 'react-native-htmlview';

const instructions =
  'The test consist of 4 sections {`\n`} Aptitute,English,Logical,{`\n`} There is a time limit of {`\n`} 1hr.{`\n`},Press Finish & submit only after you have complted all 3 sections {`\n`} Do not {`\n`} close/refresh {`\n`} the test at all in between,if you do you will might{`\n`} hab=ve to start you text paper from scratch ';

class Instructions extends Component {
  async componentDidMount() {
    const {
      candidateInterview: {data},
    } = this.props.candidate;
    await this.props.getExamQuestions(data.user_id);
  }

  static navigationOptions = ({navigation}) => {
    const name = navigation.getParam('name');
    const profile_pic = navigation.getParam('profile_pic');
    return {
      // title: name.split(' ')[0],
      headerStyle: {
        backgroundColor: COLOR.LGONE,
        elevation: 0,
        color: COLOR.PINK,
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

  handlePress = async () => {
    const {examQuestions, currentUser} = this.props.candidate;
    const email = await getItem('email');
    console.log(email, currentUser, 'currentUsercurrentUser');

    let remaining_time;
    if (email !== currentUser) {
      await AsyncStorage.multiRemove(['solution', 'remaining_time']);
    }
    let remaningTime = await getItem('remaining_time');
    if (remaningTime) {
      remaining_time = remaningTime;
    } else {
      remaining_time = examQuestions.data.timeForExam * 60;
    }
    await setItem('email', JSON.stringify(currentUser));
    this.props.navigation.replace('TestPage', {
      remaining_time: remaining_time,
    });
  };

  render() {
    const {examQuestions} = this.props.candidate;
    return (
      <Container style={styles.container}>
        <Content padder>
          <Card style={styles.blockView}>
            <CardItem>
              <Text style={styles.headerText}>Instructions</Text>
            </CardItem>
            <HorizontalLine />
            {examQuestions.isSuccess && (
              <Fragment>
                {examQuestions.data.instructions && (
                  <Fragment>
                    <CardItem>
                      <HTMLView
                        stylesheet={webViewStyle}
                        value={`<span style={webViewStyle.styledText}>${examQuestions.data.instructions}</span>`}
                      />
                    </CardItem>
                    <CustomButton
                      textColor={{color: COLOR.LGONE}}
                      style={{backgroundColor: COLOR.MUSTARD}}
                      text="Continue"
                      onPress={this.handlePress}
                    />
                  </Fragment>
                )}
              </Fragment>
            )}
            {examQuestions.isLoading && <Spinner color={COLOR.MUSTARD} />}
            {examQuestions.isError && (
              <Text style={[webViewStyle.styledText, {color: 'red'}]}>
                {examQuestions.data.msg}
              </Text>
            )}
          </Card>
        </Content>
      </Container>
    );
  }
}
const webViewStyle = StyleSheet.create({
  span: {
    color: 'black',
    opacity: 0.5,
    fontSize: 13,
    textAlign: 'justify',
    fontFamily: 'Montserrat-Regular',
  },
});

const mapStateToProps = ({candidate, candidateInfo}) => ({
  candidate,
  candidateInfo,
});

export default connect(
  mapStateToProps,
  {getQuestions, getCandidateRoundDetails, getExamQuestions},
)(Instructions);
