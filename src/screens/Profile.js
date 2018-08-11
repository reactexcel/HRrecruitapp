import React, { Component, Fragment } from "react";
import { Platform, Linking, StatusBar, ScrollView, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLOR } from "../styles/color";
import ProfileView from "../components/ProfileView";
import ProfileDescription from "../components/ProfileDescription";
import { Icon } from "native-base";
import { connect } from "react-redux";
import { getCandidateJobDetails } from "../actions";

class Profile extends Component {
  static navigationOptions = {
    headerStyle: {
      elevation: 0,
      backgroundColor: "white"
    },
    title: "Profile",
    headerTitleStyle: {
      color: "black",
      textAlign: "center",
      alignSelf: "center",
      flex: 1,
      fontFamily: "Montserrat-SemiBold"
    },
    headerTintColor: COLOR.PINK,
    headerRight: (
      <Icon
        name="pencil"
        type="MaterialCommunityIcons"
        style={{ color: COLOR.PINK, marginRight: 10, fontSize: 25 }}
      />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 0
    };
  }
  handleLocate = () => {
    let url = "";
    if (Platform.OS === "ios") {
      url = `http://maps.apple.com/maps?q=${28.5965789},${77.3287437}`;
    } else if (Platform.OS === "android") {
      url = `geo:${28.5965789},${77.3287437}`;
    }
    Linking.openURL(url);
  };
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
  async componentDidMount() {
    await this.setCandidateProfile();
  }
  render() {
    return (
      <ScrollView>
        <ProfileView />
        <LinearGradient
          colors={[COLOR.LGONE, COLOR.LGTWO]}
          style={{ flexBasis: "65%" }}
        >
          <ProfileDescription
            currentPosition={this.state.currentPosition}
            handleLocate={this.handleLocate}
          />
        </LinearGradient>
      </ScrollView>
    );
  }
}

export default connect(
  null,
  { getCandidateJobDetails }
)(Profile);
