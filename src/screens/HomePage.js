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
import { getCandidateJobDetails, getCandidateDetails } from "../actions";
import LinearGradient from "react-native-linear-gradient";
import SplashScreen from "react-native-splash-screen";
import FCM from "react-native-fcm";
import Permissions from 'react-native-permissions';

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
      sender_mail:''
    };
    this.handleViewClick = this.handleViewClick.bind(this);
  }
  static navigationOptions = {
    header: null
  };

  static getDerivedStateFromProps(nextProps) {
    const { error, success, msg, message } = nextProps.interviewSignUp;
    if (error !== undefined && error === 1 && message !== message) {
      alert(message);
    }
    if (success !== undefined && !success) {
      notify("Something went wrong");
    }
    if (msg !== undefined) {
      alert(msg);
    }
    return null;
  }
  setCandidateProfile = async () => {
    const candidateJob = await getItem("mongo_id");
    
    if (candidateJob) {
      let email = candidateJob.candidate.data.sender_mail;
      let profile_pic = `https://pikmail.herokuapp.com/${email}?size=60`;
      let mobile_no = candidateJob.candidate.data.mobile_no;
      let userName = candidateJob.candidate.data.from;
      await this.props.getCandidateJobDetails(candidateJob.candidate.data._id);
      console.log(candidateJob.data,'%%%%%%%%%%%%%%%%%%%');
      this.setState({
        candidateJob,
        profile_pic,
        userName,
        mobile_no,
        linkOpening: false,
        notification: "",
        sender_mail:candidateJob.candidate.data.sender_mail
      });
    } else {
      this.setState({ linkOpening: false });
    }
  };
  async handleViewClick(data) {
    const { appliedJob } = this.props;
    console.log(appliedJob,'tttttttttttttttttttt');
    
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
        sender_mail:this.state.sender_mail
      });
    } else {
      this.props.navigation.navigate(data, { title: "Job Openings" });
    }
  }
  askStoragePermission = async () =>{
    await Permissions.request('storage').then(response => {
      console.log(response,'per storage')
    })
  }
  componentDidMount = async () => {
    Permissions.checkMultiple(['location']).then(response => {
      //response is an object mapping type to permission
      console.log(response,'check')
      if(response.storage != 'authorized'){
        this.askStoragePermission()
      }
    })
    const mongo_id = await getItem("mongo_id");
    console.log(mongo_id,"oooooooooooooooooooo");
    
    await this.setCandidateProfile();
    const appIntro = await getItem("appintro");
    if (appIntro !== undefined && appIntro.shown) {
      BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }
    const notif = await FCM.getInitialNotification().then(notif => {
      return notif;
    });
    this.setState({ notification: notif.from });
    if (this.state.notification !== undefined) {
      this.setState({ opacity: 1 });
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
        this.setState({ notification: "", opacity: 0 });
      }
    }
  };
  componentDidUpdate = async () => {
    const applied = this.props.navigation.getParam("applied");
    if (applied) {
      await this.setCandidateProfile();
      this.props.navigation.setParams({ applied: false });
    }
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {
    BackHandler.exitApp(); // works best when the goBack is async
  };
  onPressIn = k => {
    this.setState({ textColor: true, index: k });
  };
  onPressOut = () => {
    this.setState({ textColor: false });
  };
  render() {
    console.log(this.props.state_data,'**************************');
    
    let { linkOpening, profile_pic, userName, textColor, index } = this.state;
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
          underlayColor={COLOR.LGONE}
          key={k}
          onPress={() => {
            this.handleViewClick(data.route);
          }}
          style={[styles.listContainer]}
        >
          <View style={styles.listSubContainer}>
            <View>
              <Image
                resizeMode="contain"
                style={[styles.image, k == 2 ? { marginLeft: -15 } : {}]}
                source={textColor && index == k ? data.image[1] : data.image[0]}
              />
            </View>
            <View style={styles.textView}>
              <Text
                style={[
                  styles.text,
                  textColor && index == k ? { color: COLOR.WHITE } : {}
                ,{marginRight:data.name=='PROFILE' ? 40:null}]}
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
                {/* <CustomButton
                  onPress={() => {}}
                  btnStyle={styles.btn}
                  btnTextStyle={styles.joinBtnStyles}
                  text={"JOIN NOW"}
                  type={"rounded"}
                /> */}
              </View>
              {renderCustomView}
            </View>
          )}
        </LinearGradient>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  state_data: state,
  appliedJob: state.appliedJob,
  interviewSignUp: state.interviewSignUp,
  // state_data: state
});
export default connect(
  mapStateToProps,
  { getCandidateJobDetails, getCandidateDetails }
)(HomePage);
