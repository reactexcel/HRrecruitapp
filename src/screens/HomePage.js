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
import { getCandidateJobDetails, getCandidateDetails,getCandidateUpdateProfileDetails, getJobLists } from "../actions";
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
      animation: false,
      opacity: 0,
      sender_mail:'',
      mongo_id:'',
      profile_picture:'',
      latestImage:null,
      isNotify:false,
      backgroundColor:false,
      deepLink: false,
      sharing: false,
      fb_id: null,
      params:"",
      isError:false,
      isNotification:false,
      didPreviouslyLaunch:false,
      sharedJobLink:false,
      isConnected:false
    };
    this.handleViewClick = this.handleViewClick.bind(this);
  }
  static navigationOptions = {
    header: null
  };

 handleSetProfile= async(candidateJob)=>{
  let email = candidateJob.sender_mail;
  let profile_pic = candidateJob.hasOwnProperty("profilePicture") ? 
                    candidateJob.profilePicture : `https://pikmail.herokuapp.com/${email}?size=60`;
  let mobile_no = candidateJob.mobile_no;
  let userName = candidateJob.from;
  this.setState({
    candidateJob,
    profile_pic,
    userName,
    mobile_no,
    linkOpening: false,
    notification: "",
    sender_mail:candidateJob.sender_mail,
    mongo_id:candidateJob._id
  });
 }

  async handleViewClick(data) {
    const {isConnected} = this.state;
    const { appliedJob } = this.props;
    if (data == "JobList" && this.state.candidateJob) {
      this.props.navigation.navigate(data, {
        appliedJob: appliedJob,
        title: "Your Applied Jobs"
      });
    } else if (data == "Profile") {
        if(isConnected){
          if(appliedJob.success){
            const {
              linkOpening,
              textColor,
              candidateJob,
              ...profileDetails
            } = this.state;
            this.props.navigation.navigate("Profile", {
              appliedJob,
              profileDetails,
              sender_mail:this.state.sender_mail,
              mongo_id:this.state.mongo_id,
              profile_picture:this.state.profile_picture,
              latestImage:this.props.candidateProfileUpdateDetails.profilePicture
            });
          }else{
            AlertMessage("Please wait! we are getting your profile.", "toast")
          }
        }else{
          AlertMessage("Please! connect to the internet first to fetch your profile.", "toast")
        }
    } else if(data !== "Profile") {
      this.props.navigation.navigate(data, { title: "Job Openings" ,isCandidate:false});
    }
  }

  askStoragePermission = async () =>{
    await Permissions.request('storage').then(response => {
    })
  }

  componentDidMount = async () => {
   const solution = await getItem("solution");
   const  remaining = await getItem("remaining_time");
   console.log(solution, remaining,'remainingremainingremaining');
   
    AppState.addEventListener("change", this._handleAppStateChange);
    const candidateJob = await getItem("mongo_id");    
    if(candidateJob && Object.keys(candidateJob).length){
      this.handleSetProfile(candidateJob.candidate.data)
    }

    let willFocused = false
    this.props.navigation.addListener("willFocus",async () =>{
      if(willFocused){
        const candidateJob = await getItem("mongo_id");
        const {appliedJob} = this.props;
        if(candidateJob && Object.keys(candidateJob).length && !appliedJob.success){
          await this.props.getCandidateJobDetails(candidateJob.candidate.data._id);
        }
        if(candidateJob && Object.keys(candidateJob).length){
          this.handleSetProfile(candidateJob.candidate.data)
        }
      }
    })
    this.props.navigation.addListener("didBlur",async () =>{
      willFocused = true
      bitlyLink = false
    })
    NetInfo.fetch().then(async state => {
      this.setState({isConnected:state.isConnected})
      if(state.isConnected){
        SplashScreen.hide()
        if(candidateJob && Object.keys(candidateJob).length){
          await this.props.getCandidateJobDetails(candidateJob.candidate.data._id);
        }
        branch.subscribe(async ({ params }) => {
          if (params.errors && params.errors !== undefined) {
            this.branchError(params.errors)
          }
          else if(params.$share_data !== undefined ){
            this.setState({params,sharedJobLink:true})
            await this.props.getJobLists()
          }else if(params.$deeplink_path !== undefined){
            this._checkDeepLink(params)
          }else{
            const notificationOpen =await firebase.notifications().getInitialNotification();
            if(notificationOpen !==null &&  notificationOpen !==undefined){
                this.setState({isNotification:true});
              }
              else{
                Permissions.checkMultiple(['location']).then(response => {
                  if(response.storage != 'authorized'){
                    this.askStoragePermission()
                  }
                })
              }
          }
        })
      }
      else{
        SplashScreen.hide()
        AlertMessage('Please! connect to the internet first', "alert")
      }
    })
  };

  _handleAppStateChange = async nextAppState => {
    if (nextAppState == "active") {
      SplashScreen.hide();
    }
  };

  branchError=(error)=>{
    AlertMessage(`Error from Branch: " + ${error}`,'alert');
  }

  async componentDidUpdate (props) {
    const applied = this.props.navigation.getParam("applied");
    const fromBitlyLink  = this.props.navigation.getParam("fromBitlyLink")
    const {joblist,interviewSignUp, appliedJob}=this.props;
    const {params, isError, isNotification} = this.state;
    if (applied && !bitlyLink) {
      bitlyLink =true
      this.props.navigation.setParams({ applied: false});
      const candidateJob = await getItem("mongo_id");
       this.handleSetProfile(candidateJob.candidate.data);
    }
    if (fromBitlyLink && !bitlyLink ) {
      bitlyLink =true
      this.props.navigation.setParams({ fromBitlyLink: false});
    }
    if(joblist.isSuccess !== props.joblist.isSuccess){
      if(joblist.isSuccess && this.state.sharedJobLink){
        this.setState({sharedJobLink:false})
        joblist.data.forEach((item, i) => {
          if (item.id == params.$share_data) {
            this.props.navigation.navigate("FullDescription", {
              subject: item.subject,
              job_description: item.job_description,
              keyword: item.keyword,
              candidate_profile: item.candidate_profile,
              jobDetail: item,
              currentJob: this.props.joblist
            });
          }
        });
      }
    }
    if(appliedJob.success && isNotification){
      this.setState({isNotification:false})
        const {
          linkOpening,
          textColor,
          candidateJob,
          ...profileDetails
        } = this.state;
        this.props.navigation.navigate("Profile", {
          appliedJob,
          profileDetails
        });
    }
    if(appliedJob.isError !== props.appliedJob.isError){
      if(appliedJob.isError){
      AlertMessage("Something went wrong", "toast")
      }
    }
    if(interviewSignUp.isError !== props.interviewSignUp.isError){
      const { error, success, msg, message } = interviewSignUp;
    if (error ==1) {
      AlertMessage((msg || message), 'alert')
    }
  }
  if(interviewSignUp.isSuccess !== props.interviewSignUp.isSuccess){ 
    const {status} = interviewSignUp ;  
    if (status==1){
      this._linkCheck()
    }
  }
}

_checkDeepLink = async (params) => {
  let fb_id = params.$deeplink_path;
      this.setState({ deepLink: true,fb_id });
      await this.props.getCandidateDetails(fb_id);
};

_linkCheck = async () => {
  const { deepLink, sharing, fb_id } = this.state;
  if (deepLink) {
    const { data, message, error, status } = this.props.interviewSignUp;
    setItem("mongo_id", JSON.stringify({ candidate: { data: data } }));
    this.props.navigation.navigate("Instructions", {
      fb_id: fb_id,
      profile_pic: `https://pikmail.herokuapp.com/${
        data.sender_mail
      }?size=60`,
      name: data.from,
      email: data.sender_mail
    });
  }
};

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
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
            <View style={[styles.textView,{zIndex:1,position:'relative',top:'2%',/* backgroundColor:"red",opacity:this.state.opacityy */},k == 1 && data.name==='PROFILE' ? {left:'75%'}:null,k == 1 ? {left:'55%'}:null,k == 2 ? {left:'75%'}:null,k == 0 ? {left:'60%'}:null]}>
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
      
        {(appliedJob.isLoading || joblist.isLoading || interviewSignUp.isLoading ) && <View
          style={{ zIndex: 1, position: "absolute", top: "50%", left: "45%" }}
        >
          <ActivityIndicator
            size="large"
            color={COLOR.MUSTARD}
          />
        </View>}
         {this.state.isNotify && 
         <View style={{zIndex:1,position:'absolute',top:'31%',left:'45%'}}>
      <Spinner color={COLOR.MUSTARD} />
    </View> }
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
  candidateProfileUpdateDetails:state.candidateProfileUpdateDetails
  }};

export default connect(
  mapStateToProps,
  { getCandidateJobDetails, getCandidateDetails,getJobLists, ProfileOnChange,UploadProfile,getCandidateUpdateProfileDetails}
)(HomePage);
