import React, { Component, Fragment } from "react";
import { Image, Alert, StyleSheet } from "react-native";
import {
  Container,
  Content,
  Text,
  Thumbnail,
  Card,
  CardItem,
  Spinner
} from "native-base";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import { getQuestions, getCandidateRoundDetails } from "../actions";
import styles from "../styles";
import CustomButton from "../components/CustomButton";
import HorizontalLine from "../components/HorizontalLine";
import { setItem, getItem } from "../helper/storage";
import { SUCCESS_STATUS, JOB_APPLYING } from "../helper/constant";
import { COLOR } from "../styles/color";
import HTMLView from "react-native-htmlview";

const instructions='The test consist of 4 sections {`\n`} Aptitute,English,Logical,{`\n`} There is a time limit of {`\n`} 1hr.{`\n`},Press Finish & submit only after you have complted all 3 sections {`\n`} Do not {`\n`} close/refresh {`\n`} the test at all in between,if you do you will might{`\n`} hab=ve to start you text paper from scratch '

class Instructions extends Component {

  async componentDidMount() {
    const fb_id = this.props.navigation.getParam("fb_id");
    const email = this.props.navigation.getParam("email");
    const linkOpening = this.props.navigation.getParam("linkOpening");
   await this.props.getQuestions(email, fb_id);
    const get_email = await getItem("email");
    if (get_email !== undefined && get_email.email !== email) {
      AsyncStorage.removeItem("solution");
      AsyncStorage.removeItem("remaining_time");
    }
    setItem("email", JSON.stringify({ email }));
    setItem("fb_id", JSON.stringify({ fb_id }));
    if(linkOpening){
      await this.props.getCandidateRoundDetails(fb_id);
    }
  }

 async componentDidUpdate(props){
   const {candidateInfo} = this.props;
    if(candidateInfo.isSuccess !== props.candidateInfo.isSuccess){
      if(candidateInfo.isSuccess){
        const round = await getItem("round");
        if (round !== undefined) {
          const {
            currentRound,
            appearedInFirstRound,
            appearedInSecondRound
          } = candidateInfo.data;
          if (appearedInFirstRound) {
            AsyncStorage.removeItem("solution");
            AsyncStorage.removeItem("remaining_time");
          }
        }
      }
    }
  }

  static getDerivedStateFromProps(nxtprops) {
    if (nxtprops.questions !== null && nxtprops.questions !== undefined) {
      const { data, msg } = nxtprops.questions;
      if (data !== undefined && data.status == SUCCESS_STATUS) {
        setItem("question", JSON.stringify({ data: data }));
      }
      if (msg !== undefined) {
        alert(msg);
      }
    }
    return null;
  }

  static navigationOptions = ({ navigation }) => {
    const name = navigation.getParam("name");
    const profile_pic = navigation.getParam("profile_pic");
    return {
      title: name.split(" ")[0],
      headerStyle: {
        backgroundColor: COLOR.LGONE,
        elevation: 0,
        color: COLOR.PINK
      },
      headerTitleStyle: {
        fontFamily: "Montserrat",
        color: COLOR.PINK,
        fontWeight: "100"
        // flex: 1,
        // textAlign: "center",
        // alignSelf: "center"
      },
      headerLeft: (
        <Content style={{ paddingHorizontal: 10 }}>
          <Thumbnail small source={{ uri: profile_pic }} />
        </Content>
      )
    };
  };
  handlePress = async() => {
    const remaining_time = await getItem("remaining_time");
    this.props.navigation.navigate("TestPage", {
      ...this.props.questions,
      ...this.props.navigation.state.params,
      remaining_time
    });
  };
  render() {
    const name = this.props.navigation.getParam("name");
    const { questions } = this.props;    
    return (
      <Container style={styles.container}>
        <Content padder>
          <Card style={styles.blockView}>
            <CardItem>
              <Text style={styles.headerText}>Instructions</Text>
            </CardItem>
            <HorizontalLine />
            {questions !== null ? (
              <Fragment>
                {questions.data !== undefined ? (
                  <Fragment>
                    <CardItem>
                      <HTMLView
                        stylesheet={webViewStyle}
                        value={`<span style={webViewStyle.styledText}>${questions.data.instructions}</span>`}
                      />
                    </CardItem>
                    <CustomButton
                      textColor={{ color:COLOR.LGONE }}
                      style={{ backgroundColor:COLOR.MUSTARD }}
                      text="Continue"
                      onPress={this.handlePress}
                    />
                  </Fragment>
                ) : (
                  <Fragment>
                    <CardItem>
                      <Text style={styles.text}>
                        Hi {name}, {JOB_APPLYING}
                      </Text>
                    </CardItem>
                    <CustomButton
                      textColor={{ color: COLOR.LGONE }}
                      style={{ backgroundColor: COLOR.MUSTARD }}
                      text="Click Here"
                      onPress={() =>
                        this.props.navigation.navigate("HomePage",{
                          fromBitlyLink: true
                        })
                      }
                    />
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <Spinner color={COLOR.MUSTARD} />
            )}
          </Card>
        </Content>
      </Container>
    );
  }
}
const webViewStyle = StyleSheet.create({
  span:{
    color: "black",
    opacity: 0.5,
    fontSize:13,
    textAlign:'justify',
    // width:'80%',
    // backgroundColor:'red',
    fontFamily:'Montserrat-Regular'
  }
});

const mapStateToProps = ({ questions,candidateInfo }) => ({ questions,candidateInfo });

export default connect(
  mapStateToProps,
  { getQuestions,getCandidateRoundDetails }
)(Instructions);
