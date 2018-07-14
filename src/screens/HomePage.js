import React, { Component, Fragment } from "react";
import { View, Image } from "react-native";
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
import { getCandidateJobDetails } from "../actions";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecking: true,
      candidateJob: null,
      profile_pic: null,
      userName: null
    };
    this.handleViewClick = this.handleViewClick.bind(this);
  }
  static navigationOptions = {
    header: null
  };
  setCandidateProfile = async () => {
    console.log("working function")
    const candidateJob = await getItem("mongo_id");
    if (candidateJob) {
      let email = candidateJob.candidate.data.sender_mail;
      let profile_pic = `https://pikmail.herokuapp.com/${email}?size=60`;
      let userName = candidateJob.candidate.data.from;
      await this.props.getCandidateJobDetails(candidateJob.candidate.data._id);
      this.setState({ candidateJob, profile_pic, userName, isChecking: false });
    } else {
      this.setState({ isChecking: false });
    }
  };
  async handleViewClick(data) {
    const { appliedJob } = this.props;
    if (data == "JobList" && this.state.candidateJob) {
      this.props.navigation.navigate(data, {
        appliedJob: appliedJob,
        title: "Your Applied Jobs"
      });
    } else {
      this.props.navigation.navigate(data, { title: "Apply for Jobs" });
    }
  }
  componentDidMount = async () => {
    await this.setCandidateProfile();
    console.log("didmount")
  };
  componentDidUpdate = async (prevProps, prevState) => {
    console.log("working")
    console.log(prevState,"prevStatee");
    console.log(this.state,"state")
    console.log(this.props,"props");
    console.log(prevProps,"prevprops");
    console.log(this.state.userName === null ||
      prevState.userName !== this.state.userName,"condition")
      console.log(prevState.isChecking !== this.state.isChecking,"ischeck condition")
    const candidateJob = await getItem("mongo_id");
    console.log(candidateJob,"jguufvj")
    if (candidateJob) {
      let email = candidateJob.candidate.data.sender_mail;
      let profile_pic = `https://pikmail.herokuapp.com/${email}?size=60`;
      let userName = candidateJob.candidate.data.from;
      if (
        this.state.userName === null ||
        prevState.userName !== this.state.userName
      )
      await this.props.getCandidateJobDetails(candidateJob.candidate.data._id);
      console.log("running state")
        this.setState({
          candidateJob,
          profile_pic,
          userName,
          isChecking: false
        });
    } else {
      if (prevState.isChecking !== this.state.isChecking) {
        console.log("running isCHecking state")

        this.setState({ isChecking: false });
      }
    }
  };

  render() {
    console.log("render running")
    let { isChecking, profile_pic, userName } = this.state;
    let profilepic = profile_pic
      ? { uri: profile_pic }
      : require("../images/profilepic.png");
    let userNames = userName ? userName : "User Id";
    let renderCustomView = pageDeatils.map((data, k) => {
      return (
        <View key={k} style={styles.listContainer}>
          <List>
            <ListItem
              onPress={() => {
                this.handleViewClick(data.route);
              }}
              avatar
            >
              <Left>
                <Thumbnail source={data.image} />
              </Left>
              <Body style={{ borderBottomWidth: 0 }}>
                <Text>{data.name}</Text>
              </Body>
              <Right style={{ borderBottomWidth: 0, marginTop: 7 }}>
                <Icon active name={data.icon} />
              </Right>
            </ListItem>
          </List>
        </View>
      );
    });
    return (
      <Container style={styles.container}>
        {isChecking ? (
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
          <View>
            <Image
              resizeMode="contain"
              style={styles.bckgndImage}
              source={require("../images/navbg.png")}
            />
            <View style={styles.logoCnt}>
              <View style={styles.logoView}>
                <Logo />
              </View>
            </View>
            <View style={styles.avatar}>
              <Image style={styles.avatarImage} source={profilepic} />
            </View>
            <View style={styles.btnContainer}>
              <Text>{userNames}</Text>
            </View>
            {renderCustomView}
          </View>
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ appliedJob }) => ({ appliedJob });
export default connect(
  mapStateToProps,
  { getCandidateJobDetails }
)(HomePage);
