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
import styles from "../styles/HomePage";
import { COLOR } from "../styles/color";
import CustomButton from "../components/CustomButton";
import Logo from "../components/Logo";
import { pageDeatils } from "../helper/json";
import { setItem, getItem } from "../helper/storage";
import { getCandidateJobDetails, getCandidateDetails } from "../actions";
var { height, width } = Dimensions.get('window');
import LinearGradient from "react-native-linear-gradient";


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.setCandidateProfile();
    this.state = {
      linkOpening: false,
      candidateJob: null,
      profile_pic: null,
      userName: null
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
      let userName = candidateJob.candidate.data.from;
      await this.props.getCandidateJobDetails(candidateJob.candidate.data._id);
      this.setState({
        candidateJob,
        profile_pic,
        userName,
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
    } else if (data == "InterviewLogin") {
      this.props.navigation.navigate("InterviewLogin");
    } else {
      this.props.navigation.navigate(data, { title: "Job Opening" });
    }
  }
  componentDidMount = async () => {
    await this.setCandidateProfile();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const setUser = this.props.navigation.getParam("setUser");
    if (setUser) {
      await this.setCandidateProfile();
      this.props.navigation.setParams({ setUser: false });
    }
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {
    BackHandler.exitApp(); // works best when the goBack is async
  };
  render() {
    let { linkOpening, profile_pic, userName } = this.state;
    let profilepic = profile_pic
      ? { uri: profile_pic }
      : require("../images/profilepic.png");
    let userNames = userName ? userName : "";
    let renderCustomView = pageDeatils.map((data, k) => {
      return (
        <TouchableHighlight 
          key={k}
          onPress={() => {
            this.handleViewClick(data.route);
          }}
        >
        <View  style={[styles.listContainer, k == 2 ? { backgroundColor:'#2a365f'}:{}]}>
          <View style={styles.listSubContainer}>
            <View>
              <Image
                resizeMode="contain"
                style={[styles.image,k==2 ? {marginLeft:-15 }:{}]}
                source={data.image}
              />            
            </View>
            <View style={styles.textView}>
                <Text style={[styles.text, k == 2 ? { color: COLOR.WHITE }:{}]}>{data.name}</Text>
            </View>
          </View>
        </View>
        </TouchableHighlight>
      );
    });
    return (
      <LinearGradient colors={[COLOR.LGONE, COLOR.LGTWO]} style={styles.container}>
        {linkOpening ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
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
                  onPress={()=>{console.log()}}
                  btnStyle={styles.btn}
                  btnTextStyle={{ fontSize: 14, fontWeight: "100", color:'black'}}
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
