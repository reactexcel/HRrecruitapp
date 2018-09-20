import React, { Component, Fragment } from "react";
import {
  View,
  Alert,
  Image,
  Linking,
  Platform,
  TouchableHighlight,
  BackHandler,
  Dimensions
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
  Spinner
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

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkOpening: false,
      candidateJob: null,
      profile_pic: null,
      userName: null,
      mobile_no: null,
      textColor: false
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
      this.setState({
        candidateJob,
        profile_pic,
        userName,
        mobile_no,
        linkOpening: false
      });
    } else {
      this.setState({ linkOpening: false });
    }
  };

  async handleViewClick(data) {
    const { appliedJob } = this.props;
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
        profileDetails
      });
    } else {
      this.props.navigation.navigate(data, { title: "Job Openings" });
    }
  }
  componentDidMount = async () => {
    const mongo_id = await getItem("mongo_id");
    await this.setCandidateProfile();
    const appIntro = await getItem("appintro");
    if (appIntro !== undefined && appIntro.shown) {
      BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
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
                ]}
              >
                {data.name}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    });
    return (
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
              <CustomButton
                onPress={() => {
                  console.log();
                }}
                btnStyle={styles.btn}
                btnTextStyle={styles.joinBtnStyles}
                text={"JOIN NOW"}
                type={"rounded"}
              />
            </View>
            {renderCustomView}
          </View>
        )}
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  appliedJob: state.appliedJob,
  interviewSignUp: state.interviewSignUp
});
export default connect(
  mapStateToProps,
  { getCandidateJobDetails, getCandidateDetails }
)(HomePage);