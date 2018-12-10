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
  ActivityIndicator
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
import { connect } from "react-redux";
import styles from "../styles/screens/HomePage";
import { COLOR } from "../styles/color";
import CustomButton from "../components/CustomButton";
import Logo from "../components/Logo";
import { pageDetails, candidatePageDetails } from "../helper/json";
import { setItem, getItem } from "../helper/storage";
import { getCandidateJobDetails, getCandidateDetails,getCandidateUpdateProfileDetails } from "../actions";
import LinearGradient from "react-native-linear-gradient";
import SplashScreen from "react-native-splash-screen";
import FCM from "react-native-fcm";
import {ProfileOnChange,UploadProfile} from '../actions/actions'

import Permissions from 'react-native-permissions';
var { height, width } = Dimensions.get("window");
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
      isNotify:true,
      backgroundColor:false
      // index:''
    };
    this.handleViewClick = this.handleViewClick.bind(this);
  }
  static navigationOptions = {
    header: null
  };

  // static getDerivedStateFromProps(nextProps) {
  //   const { error, success, msg, message } = nextProps.interviewSignUp;
  //   if (error !== undefined && error === 1 && message !== undefined) {
  //     alert(message);
  //   }return null;
  //   if (success !== undefined && !success) {
  //     notify("Something went wrong");
  //   }return null;
  //   if (msg !== undefined) {
  //     alert(msg);
  //   }
  //   return null;
  // }
  setCandidateProfile = async () => {
    const mongo_id = await getItem("mongo_id");
    
    if(mongo_id){
      this.setState({profile_picture:mongo_id.candidate.data.profilePicture,mongo_id:mongo_id.candidate.data._id
      })
    }
  await this.props.getCandidateUpdateProfileDetails(this.state.mongo_id)
    const candidateJob = await getItem("mongo_id");
    if (candidateJob) {
      this.props.UploadProfile(candidateJob)
      this.setState({mongo_id:candidateJob.candidate.data._id})
        let email = candidateJob.candidate.data.sender_mail;
        let profile_pic = `https://pikmail.herokuapp.com/${email}?size=60`;
        let mobile_no = candidateJob.candidate.data.mobile_no;
        let userName = candidateJob.candidate.data.from;
        await this.props.getCandidateJobDetails(candidateJob.candidate.data._id);
        this.setState({
          candidateJob,
          profile_pic,
          userName,
          mobile_no,
          linkOpening: false,
          notification: "",
          sender_mail:candidateJob.candidate.data.sender_mail,
        });
      }
    else {
      this.setState({ linkOpening: false });
    }
}
  async handleViewClick(data) {
    const { appliedJob } = this.props;
    console.log(appliedJob,'appliedjob');
    
    if (data == "JobList" && this.state.candidateJob) {
      this.props.navigation.navigate(data, {
        appliedJob: appliedJob,
        title: "Your Applied Jobs"
      });
    } else if (data == "Profile") {
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
    } else {
      this.props.navigation.navigate(data, { title: "Job Openings" ,isCandidate:false});
    }
  }
  askStoragePermission = async () =>{
    await Permissions.request('storage').then(response => {
      console.log(response);
      
    })
  }
  componentDidMount = async () => {
    this.props.navigation.addListener("didFocus", () =>this.setCandidateProfile()/* .then(()=>{ */
    )
    Permissions.checkMultiple(['location']).then(response => {
      if(response.storage != 'authorized'){
        this.askStoragePermission()
      }
    })
  await this.setCandidateProfile();
  const appIntro = await getItem("appintro");
  if (appIntro !== undefined && appIntro.shown) {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
    const notif = await FCM.getInitialNotification().then(notif => {
      return notif;
    });
    const candidateJob = await getItem("mongo_id");
    const mongo_id = await getItem("mongo_id");
    this.setState({ notification: notif.from });
    if (this.state.notification !== undefined) {
        if (this.state.candidateJob !== null) {
          const { appliedJob } = this.props;
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
          this.setState({ notification: "", opacity: 0,isNotify:false });
        }
    }else{
      this.setState({isNotify:false})
    }
 
  };
  componentDidUpdate = async () => {
    const applied = this.props.navigation.getParam("applied");
    if (applied ) {
      await this.setCandidateProfile();
      this.props.navigation.setParams({ applied: false});
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
                style={[{width:'100%',height:'100%',}, k == 2 ? {marginLeft:-17} : null ,k==1 ? {marginLeft:-5} :null  ]}
                source={textColor && index == k ? data.image[1] : data.image[0]}
              />
            </View>
            <View style={[styles.textView,{zIndex:1,position:'relative',top:'2%'},k == 0 && data.name=='PROFILE' ? {left:'75%'}:null,k == 0 ? {left:'55%'}:null,k == 1 ? {left:'75%'}:null,k == 2 ? {left:'60%'}:null]}>
              <Text
                style={[
                  styles.text,
                  {alignSelf:'center'},
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
        <View
          style={{ zIndex: 1, position: "absolute", top: "50%", left: "45%" }}
        >
          <ActivityIndicator
            animating={true}
            style={{ opacity: this.state.opacity }}
            size="large"
            color={COLOR.MUSTARD}
          />
        </View>
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
  console.log(state);
  
  return {
  state_data: state,
  appliedJob: state.appliedJob,
  interviewSignUp: state.interviewSignUp,
  candidateProfileUpdateDetails:state.candidateProfileUpdateDetails
  }};

export default connect(
  mapStateToProps,
  { getCandidateJobDetails, getCandidateDetails, ProfileOnChange,UploadProfile,getCandidateUpdateProfileDetails}
)(HomePage);
