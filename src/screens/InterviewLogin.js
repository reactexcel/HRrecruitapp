import React, { Component, Fragment } from "react";
import {
  BackHandler,
  Alert,
  View,
  Platform,
  PermissionsAndroid,
  StatusBar
} from "react-native";
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
  Header
} from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";
import Logo from "../components/Logo";
import styles from "../styles";
import _styles from "../styles/screens/InterviewLogin";
import { isLowercase, isEmail } from "validator";
import { COLOR } from "../styles/color";
import {
  signUp,
  connectionState,
  getCandidateDetails,
  getCandidateRoundDetails,
  getCandidateJobDetails,
  candidateValidationapi,
  interviewLoginClearData,
} from "../actions";
import { notify } from "../helper/notify";
import { SUCCESS_STATUS } from "../helper/constant";
// import { GOOGLE_ANALYTICS_TRACKER } from "../config/dev";
import { getItem } from "../helper/storage";
import branch from "react-native-branch";
import LinearGradient from "react-native-linear-gradient";

class InterviewLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
    spinner:false,
    alertMessage:false,
    activity:true,
    isError:false
    };
  }
  static navigationOptions = {
    headerStyle: {
      backgroundColor: COLOR.LGONE,
      elevation: 0
    },
    headerTintColor: COLOR.PINK
  };

   componentDidUpdate(nextProps) {
    const { error, success, msg, message } = this.props.interviewSignUp;
    const {isError}=this.state;
    if(this.props.interviewSignUp.jobNotAssign !== nextProps.interviewSignUp.jobNotAssign){
    if (error !== undefined && error === 1 && message !== undefined  ) {
      if(this.state.activity){
        this.setState({spinner:false,activity:false})
      }
      Alert.alert(
        "Info",
        message,
        [
          {
            text: "Ok",
            onPress: () => this.interviewLoginClearData()
          }
        ],
        { cancelable: false }
      );
    }
  }
    if (success !== undefined && !success  ) {
      if(this.state.activity){
        this.setState({spinner:false,activity:false})
      }
      notify("Something went wrong");
    }
    // if(this.props.interviewSignUp.isError !== nextProps.interviewSignUp.isError){
    //   if (msg !== undefined  ) {
    //     if(this.state.activity){
    //       this.setState({spinner:false,activity:false})
    //     }
    //     alert(msg);
  
    //   }
    // }
  }
  interviewLoginClearData=()=>{
    this.props.interviewLoginClearData("cleared data")
    this.props.navigation.navigate("HomePage")
  }
  async componentDidMount() {
    if(Platform.OS !=='ios'){
    StatusBar.setBackgroundColor(COLOR.LGONE);}
    const ans = await getItem("solution");
    const email = await getItem("email");
    const fb_id = await getItem("fb_id");
    if (ans !== undefined && email !== undefined && fb_id !== undefined) {
      NetInfo.isConnected.fetch().done(async isConnected => {
        if (isConnected) {
          await this.props.getCandidateDetails(fb_id.fb_id);
          const { data, message, error, status } = this.props.interviewSignUp;
          if (status == SUCCESS_STATUS) {
            this.setState({ linkOpening: false });
            this.props.navigation.navigate("Instructions", {
              fb_id: fb_id.fb_id,
              profile_pic: `https://pikmail.herokuapp.com/${
                data.sender_mail
              }?size=60`,
              name: data.from,
              email: data.sender_mail
            });
          } else if (error == 1) {
            this.setState({ linkOpening: false });
          }
        } else {
          Alert.alert(
            "Info",
            `Please connect to internet and then Re-Open the App`,
            [
              {
                text: "Ok",
                onPress:
                  Platform.OS === "ios" || email.email === "test_123@gmail.com"
                    ? () => {}
                    : () => BackHandler.exitApp()
              }
            ],
            { cancelable: false }
          );
        }
      });
    } else {
      branch.subscribe(async ({ errors, params }) => {
        if (errors) {
          alert("Error from Branch: " + errors);
          return;
        }
        if (params.$deeplink_path !== undefined) {
          let fb_id = params.$deeplink_path;
          await this.props.getCandidateDetails(fb_id);
          const { data, message, error, status } = this.props.interviewSignUp;
          if (status == SUCCESS_STATUS) {
            this.setState({ linkOpening: false });
            this.props.navigation.navigate("Instructions", {
              fb_id: fb_id,
              profile_pic: `https://pikmail.herokuapp.com/${
                data.sender_mail
              }?size=60`,
              name: data.from,
              email: data.sender_mail
            });
          } else if (error == 1) {
            this.setState({ linkOpening: false });
          }
        } else {
          this.setState({ linkOpening: false });
        }
      });
    }
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleNetworks
    );

    //Alert for round information

    if (fb_id !== undefined) {
      await this.props.getCandidateRoundDetails(fb_id.fb_id);
    }
    const round = await getItem("round");

    if (round !== undefined) {
      const email = await getItem("email");
      const {
        currentRound,
        appearedInFirstRound,
        appearedInSecondRound
      } = this.props.candidateInfo.data;
      if (appearedInFirstRound) {
        AsyncStorage.removeItem("solution");
        AsyncStorage.removeItem("remaining_time");
      }
      const roundType =
        currentRound === "First Round" ? "Objective" : "Subjective";
      if (currentRound === round.round) {
        Alert.alert(
          "Info",
          `You have submitted your ${roundType} paper. Please contact HR to proceed further.`,
          [
            {
              text: "Ok",
              onPress:
                Platform.OS === "ios" || email.email === "test_123@gmail.com"
                  ? () => {}

                  : () => this.props.navigation.goBack()
            }
          ],
          { cancelable: false }
        );
      } else if (currentRound !== round.round) {
        Alert.alert("Info", `You have been moved to ${roundType} round.`, [
          {
            text: "Ok",
            onPress: () => {}
          }
        ]);
      }
    }
  }

  handleNetworks = async isconnect => {
    await this.props.connectionState(isconnect);
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleNetworks
    );
  }

  handleSubmit = async () => {
    const errors = this.validate(this.state.email);
    if(Object.keys(errors).length === 0){
      NetInfo.isConnected.fetch().done(async isConnected => {
        if(isConnected){
    this.setState({spinner:true})
   await this.props.candidateValidationapi(this.state.email)}})}
    if(this.props.candidateValidation.data !==undefined && this.props.candidateValidation.data !==null && this.state.email !=="test_123@gmail.com"){
     await this.props.getCandidateJobDetails(this.props.candidateValidation.data._id)
     if(this.props.appliedJob.status !==undefined && this.props.appliedJob.status !==null){
     if(this.props.appliedJob.status=='Reject' || this.props.appliedJob.status=='Selected'){
       Alert.alert(
        "Thank You",
        "You are not allowed to take online test,Please check your job status!",
        [
          {
            text: "OK",
            onPress: () =>
            this.props.navigation.navigate("HomePage")
          }
        ]
      );
     }
    else if (Object.keys(errors).length === 0) {
      this.setState({spinner:false})
      NetInfo.isConnected.fetch().done(async isConnected => {
        if (isConnected) {
          // GOOGLE_ANALYTICS_TRACKER.trackEvent(
          //   "INTERVIEWLOGIN",
          //   this.state.email
          // );
          await this.props.signUp(this.state.email);
          const {
            interviewSignUp: { status, fb_id }
          } = this.props;
          if (status === 0) {
            // GOOGLE_ANALYTICS_TRACKER.trackEvent(
            //   this.state.email,
            //   status.toString()
            // );
            this.props.navigation.navigate("JobList", {
              title: "Job Openings"
            });
            
            this.setState({ email: "",spinner:false });
          } else if (status === SUCCESS_STATUS) {
            // GOOGLE_ANALYTICS_TRACKER.trackEvent(
            //   this.state.email,
            //   status.toString()
            // );
            // if (this.state.email === "test_123@gmail.com") {
              this.props.navigation.navigate("Instructions", {
                fb_id: fb_id,
                profile_pic: `https://pikmail.herokuapp.com/${
                  this.state.email
                }?size=60`,
                name: "Test",
                email: this.state.email
              });
              this.setState({ email: "" ,spinner:false});
              // return;
            // }
            // this.props.navigation.navigate("OTPpage");
            this.setState({ email: "",spinner:false });
          }
        } else {
          alert("Please connect to internet");
        }
      });
    }
     }else{
      Alert.alert(
        "Thank You",
        "You have not been assigned any Job Round,Please contact to HR",
        [
          {
            text: "OK",
            onPress: () =>
            this.interviewLoginClearData()
          }
        ]
      );
     }
    }
   else if (Object.keys(errors).length === 0) {
    this.setState({spinner:false})
      NetInfo.isConnected.fetch().done(async isConnected => {
        if (isConnected) {
          // GOOGLE_ANALYTICS_TRACKER.trackEvent(
          //   "INTERVIEWLOGIN",
          //   this.state.email
          // );
          await this.props.signUp(this.state.email);
          const {
            interviewSignUp: { status, fb_id }
          } = this.props;
          if (status === 0) {
            // GOOGLE_ANALYTICS_TRACKER.trackEvent(
            //   this.state.email,
            //   status.toString()
            // );
            this.props.navigation.navigate("JobList", {
              title: "Job Openings"
            });
            
            this.setState({ email: "",spinner:false });
          } else if (status === SUCCESS_STATUS) {
            // GOOGLE_ANALYTICS_TRACKER.trackEvent(
            //   this.state.email,
            //   status.toString()
            // );
            // if (this.state.email === "test_123@gmail.com") {
              this.props.navigation.navigate("Instructions", {
                fb_id: fb_id,
                profile_pic: `https://pikmail.herokuapp.com/${
                  this.state.email
                }?size=60`,
                name: "Test",
                email: this.state.email
              });
              this.setState({ email: "",spinner:false });
              // return;
            // }
            // this.props.navigation.navigate("OTPpage");
            // this.setState({ email: "",spinner:false });
          }
        } else {
          alert("Please connect to internet");
        }
      });
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
  // componentDidUpdate(){
  //   if(this.props.interviewSignUp.    ){

  //   }
  // }

  render() {
    console.log(this.props.candidateInfo,'candidateInfocandidateInfo');
    
    const {
      interviewSignUp: { registering, success }
    } = this.props;
    const{spinner} =this.state
    const { navigation } = this.props;
    const appliedBefore = navigation.getParam("appliedBefore", false);
    const appliedText = navigation.getParam("appliedText");
    return (
      <LinearGradient
        colors={[COLOR.LGONE, COLOR.LGTWO]}
        style={_styles.lgView}
      >
        <View style={styles.logoView}>
          <Logo />
        </View>
        <View style={_styles.textInputView}>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",alignContent:"center"}}>
          <Text style={{color:"#fff",fontSize:14,fontFamily:"Montserrat-SemiBold",textAlign:"center"}}>Put in your email address which you used while applying for job</Text>
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
              onChangeText={text => this.setState({ email: text })}
              autoCapitalize="none"
            />
          </Item>
        </View>
        <View style={_styles.btnView}>
          {/* registering || */ spinner ? (
            <Spinner color={COLOR.MUSTARD} />
          ) : (
            <Button
              onPress={this.handleSubmit}
              rounded
              style={_styles.btnStyle}
            >
              <Text style={_styles.textStyle}>Submit</Text>
            </Button>
          )}
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return{
  interviewSignUp: state.interviewSignUp,
  isConnected: state.network.isConnected,
  candidateInfo: state.candidateInfo,
  candidateValidation:state.candidateValidation,
  appliedJob:state.appliedJob
}};
export default connect(
  mapStateToProps,
  { signUp, connectionState, getCandidateDetails, getCandidateRoundDetails,getCandidateJobDetails,candidateValidationapi,interviewLoginClearData }
)(InterviewLogin);
