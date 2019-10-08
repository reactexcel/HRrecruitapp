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
import AlertMessage from "../helper/toastAlert";

class InterviewLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
    spinner:false,
    alertMessage:false,
    activity:true,
    isError:false,
    isConnected:false,
    };
  }
  static navigationOptions = {
    headerStyle: {
      backgroundColor: COLOR.LGONE,
      elevation: 0
    },
    headerTintColor: COLOR.PINK
  };

   async componentDidUpdate(nextProps) {
    const { error, success, msg, message } = this.props.interviewSignUp;
    const {isError, email}=this.state;
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

    const {candidateValidation, appliedJob, interviewSignUp} = this.props;
    if(candidateValidation.isSuccess !== nextProps.candidateValidation.isSuccess){
      if(candidateValidation.isSuccess){
        if(candidateValidation.data ){
          await this.props.getCandidateJobDetails(candidateValidation.data._id)
        }else if(candidateValidation.data == null || candidateValidation.data == undefined){
          this.setState({email:""})
          AlertMessage("User not found", "toast")
          this.props.navigation.navigate("JobList", {
              title: "Job Openings"
          });
        }
      }
    }

    if(candidateValidation.isError !== nextProps.candidateValidation.isError){
      if(candidateValidation.isError){
        AlertMessage("Something went wrong.", "toast")
      }
    }

    if(appliedJob.success !== nextProps.appliedJob.success){
      if(appliedJob.success){
        if(appliedJob.status == null ){
          AlertMessage("You have not been assigned any Job Round,Please contact to HR","alert", this.handleBackToHome)
        }
        else if(appliedJob.status == 'Reject'){
          AlertMessage("Sorry! You have been rejected, Please check your job status.","alert", this.handleBackToHome)
         }
         else if(appliedJob.status=='Selected'){
          AlertMessage("Congratulations! You have been Selected, Please ask hr to further process.","alert", this.handleBackToHome)
         }
         else{
          await this.props.signUp(email);
         }
      }
    }

    if(interviewSignUp.isSuccess !== nextProps.interviewSignUp.isSuccess){
      if(interviewSignUp.isSuccess){
        const {fb_id, status} = interviewSignUp
        if(status ==1 ){
          this.props.navigation.navigate("Instructions", {
            fb_id: fb_id,
            profile_pic: `https://pikmail.herokuapp.com/${email}?size=60`,
            name: "Test",
            email
          });
        }
      }
    }

    if(interviewSignUp.isError !== nextProps.interviewSignUp.isError){
      const { error, success, msg, message } = interviewSignUp;
      if (error ==1) {
        AlertMessage((msg || message), 'alert', this.handleBackToHome)
      }
    }
  }

  handleBackToHome=()=>{
    this.props.navigation.navigate("HomePage")
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

        NetInfo.fetch().done(async state => {
          this.setState({isConnected:state.isConnected})
        });
        NetInfo.isConnected.addEventListener("connectionChange",this.handleNetworks);

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
    this.setState({isConnected:isconnect})
    await this.props.connectionState(isconnect);
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleNetworks
    );
  }

  handleSubmit = async () => {
    const {isConnected,email} = this.state;
    const errors = this.validate(email);
    if(isConnected){
      if(Object.keys(errors).length == 0){
        await this.props.candidateValidationapi(email)
      }
    }else{
      AlertMessage("Please! connect to the internet.", "alert")
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
    console.log(this.props.candidateInfo,this.props.interviewSignUp,'candidateValidationcandidateValidation');
    
    const {candidateValidation,
      appliedJob,
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
          {(candidateValidation.isLoading || appliedJob.isLoading) ? (
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
