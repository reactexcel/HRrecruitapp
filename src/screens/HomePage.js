import React, { Component, Fragment } from "react";
import {
  View,
  Alert,
  Image,
  Linking,
  Platform,
  TouchableHighlight,
  BackHandler,
  Dimensions,
  ActivityIndicator,
  Animated,
  AppState,
  Easing,
} from "react-native";
import {
  Container,
  Text,
  ListItem,
  Thumbnail,
  Body,
  Right,
  Left,
  Icon,
  List,
  Spinner,
  TabHeading
} from "native-base";
import NetInfo from "@react-native-community/netinfo"
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import styles from "../styles/screens/HomePage";
import styless from '../styles/index';
import _styles from '../styles/screens/InterviewLogin';
import { COLOR } from "../styles/color";
import CustomButton from "../components/CustomButton";
import Logo from "../components/Logo";
import { pageDetails, candidatePageDetails } from "../helper/json";
import { setItem, getItem } from "../helper/storage";
import { getCandidateJobDetails,
         getCandidateDetails,
         getCandidateUpdateProfileDetails,
        getJobLists ,
        connectionState
      } from "../actions";
import LinearGradient from "react-native-linear-gradient";
import SplashScreen from "react-native-splash-screen";
import branch from "react-native-branch";
import firebase from 'react-native-firebase';
import {ProfileOnChange,UploadProfile} from '../actions/actions'
// import  { RemoteMessage } from 'react-native-firebase';
import Permissions from 'react-native-permissions';
import Modal from 'react-native-modalbox'
import {Input,Item,Button} from 'native-base';
import AlertMessage from "../helper/toastAlert";
import CountDown from 'react-native-countdown-component';
var { height, width } = Dimensions.get("window");

let bitlyLink = false
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkOpening: false,
      candidateJob: null,
      profile_pic: null,
      userName: null,   
      mobile_no: null,
      textColor: false,
      sender_mail:'',
      mongo_id:'',
      profile_picture:'',
      latestImage:null,
      isNotify:false,
      backgroundColor:false,
      deepLink: false,
      fb_id: null,
      params:"",
      isError:false,
      isNotification:false,
      didPreviouslyLaunch:false,
      sharedJobLink:false,
    };
    this.handleViewClick = this.handleViewClick.bind(this);
    SplashScreen.hide()
  }
  static navigationOptions = {
    header: null
  };


  async handleViewClick(data) {
    const { appliedJob, network } = this.props;
    if (data == "JobList" && this.state.candidateJob) {
      this.props.navigation.navigate(data, {
        appliedJob: appliedJob,
        title: "Your Applied Jobs"
      });
    } else if(data !== "Profile") {
      this.props.navigation.navigate(data, { title: "Job Openings" ,isCandidate:false});
    }
  }


  componentDidMount = async () => {   
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    NetInfo.isConnected.addEventListener("connectionChange",this.handleNetworks);
  };

  handleNetworks = async isConnected => {
    this.props.connectionState(isConnected);
  };



  async componentDidUpdate (props) {
    const { network } = this.props;
  if(network.isConnected !== props.network.isConnected){
       if(network.isConnected){
        AlertMessage("Internet connection is back.","toast")
      }else{
        AlertMessage("Opps! No internet connection.", "toast")
      }
   }
}


  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    NetInfo.isConnected.removeEventListener("connectionChange",this.handleNetworks);
  }
  handleBackPress = () => {
    BackHandler.exitApp(); // works best when the goBack is async
  };
  onPressIn = k => {
    this.setState({ textColor: true, index: k ,backgroundColor:true});
  };
  onPressOut = () => {
    this.setState({ textColor: false,backgroundColor:false });
  };
  render() {
    const {appliedJob, joblist, interviewSignUp} = this.props;
    let { linkOpening, profile_pic, userName, textColor, index ,backgroundColor} = this.state;
  
    let profilepic = profile_pic
      ? { uri: profile_pic }
      : require("../images/profilepic.png");
    let userNames = userName ? userName : "";
    const details = this.state.candidateJob 
      ? candidatePageDetails
      : pageDetails;
    let renderCustomView = details.map((data, k) => {
      return (
        <TouchableHighlight
          onPressIn={() => {
            this.onPressIn(k);
          }}
          onPressOut={() => {
            this.onPressOut();
          }}
          underlayColor=/* {COLOR.LGONE} */ "#1f264d"
          key={k}
          onPress={() => {
            this.handleViewClick(data.route);
          }}
          style={[styles.listContainer,{backgroundColor:'#fefefe',}]}
        >
          <View style={[styles.listSubContainer,{zIndex:-1}]}>
            <View style={{width:height * 0.1350,height: height * 0.1350,zIndex:1,position:'absolute',left:0,top:'12.2%',/* borderWidth:1,borderColor:'red' */}}>
              <Image
                resizeMode='contain'
                style={[{width:'100%',height:'100%',}, k == 0 ? {marginLeft:-17} : null ,k==2 ? {marginLeft:-5} :null  ]}
                source={textColor && index == k ? data.image[1] : data.image[0]}
              />
            </View>
            <View style={[styles.textView,{zIndex:1,position:'relative',top:'2%'},k == 1 && data.name==='PROFILE' ? {left:'75%'}:null,k == 1 ? {left:'55%'}:null,k == 2 ? {left:'75%'}:null,k == 0 ? {left:'60%'}:null]}>
              <Text
                style={[
                  styles.text,
                  {alignSelf:'center',/* fontSize:this.state.fontSize */},
                  textColor && index == k ? { color: COLOR.WHITE } : {}
                ,]}
              >
                {data.name}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    });
    return (
      <View style={{ flex: 1 }}>
      
        {/* {(appliedJob.isLoading || joblist.isLoading || interviewSignUp.isLoading ) && <View
          style={{ zIndex: 1, position: "absolute", top: "50%", left: "45%" }}
        >
          <ActivityIndicator
            size="large"
            color={COLOR.MUSTARD}
          />
        </View>} */}
         {/* {this.state.isNotify && 
         <View style={{zIndex:1,position:'absolute',top:'31%',left:'45%'}}>
      <Spinner color={COLOR.MUSTARD} />
    </View> } */}
        <LinearGradient
          colors={[COLOR.LGONE, COLOR.LGTWO]}
          style={styles.container}
        >
          {linkOpening ? (
            <View style={styles.spinnerView}>
              <Spinner color={COLOR.Spinner} />
            </View>
          ) : (
            <View style={styles.subContainer}>
              <View style={styles.logoCnt}>
                <View style={styles.logoView}>
                  <Logo />
                </View>
              </View>
              <View style={styles.btnContainer}>
              </View>
              {renderCustomView}
            </View>
          )}
        </LinearGradient>
      </View>
    );
  }
}

const mapStateToProps = state => {  
  return {
  state_data: state,
  appliedJob: state.appliedJob,
  joblist: state.joblist,
  interviewSignUp: state.interviewSignUp,
  candidateProfileUpdateDetails:state.candidateProfileUpdateDetails,
  network:state.network,
  }};
export default connect(
  mapStateToProps,
  { getCandidateJobDetails,
    getCandidateDetails,getJobLists,
    ProfileOnChange,UploadProfile,
    getCandidateUpdateProfileDetails,
    connectionState,
  }
)(HomePage);
