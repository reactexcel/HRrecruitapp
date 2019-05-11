import React, { Component } from "react";
import {
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  AppState,
  NetInfo
} from "react-native";
import { Container, Text, Button, Icon, Card } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Logo from "../components/Logo";
import CustomButton from "../components/CustomButton";
import styles from "../styles/screens/AppIntro";
import ProgressBar from "../components/ProgressBar";
import HomePage from "./HomePage";
var { height, width } = Dimensions.get("window");
import LinearGradient from "react-native-linear-gradient";
import { AppDetails } from "../helper/json";
import { getItem, setItem } from "../helper/storage";
import SplashScreen from "react-native-splash-screen";
import branch, { RegisterViewEvent } from "react-native-branch";
import { connect } from "react-redux";
import {
  getCandidateJobDetails,
  getCandidateDetails,
  getJobLists,
  getCandidateRoundDetails
} from "../actions";
import { SUCCESS_STATUS } from "../helper/constant";
import { COLOR } from "../styles/color";
import CardTrail from "../components/CardTrail";
// import FCM, { FCMEvent } from "react-native-fcm";
class AppIntro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deepLink: false,
      sharing: false,
      fb_id: null,
      didPreviouslyLaunch: false,
      linkOpening: false,
      candidateJob: null,
      profile_pic: null,
      userName: null,
      mobile_no: null,
      textColor: false,
      notification: "",
      index: 0
    };
  }
  static navigationOptions = {
    header: null
  };
  static getDerivedStateFromProps(nextProps) {
    const { error, success, msg, message } = nextProps.interviewSignUp;
    if (error !== undefined && error === 1 && message !== undefined) {
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

  _handleAppStateChange = async nextAppState => {
    this.setState({ didPreviouslyLaunch: nextAppState });
    // console.log(nextAppState,'appstate');
    const appIntro = await getItem("appintro");
    const candidateJob = await getItem("mongo_id");
    if (
      this.state.didPreviouslyLaunch === "background" &&
      ((appIntro !== undefined && appIntro.shown) || candidateJob)
    ) {
      this.props.navigation.replace("HomePage");
    }
    SplashScreen.hide();
  };
  componentDidMount = async () => {
    NetInfo.isConnected.fetch().then(async isConnected => {
      if (isConnected) {
        await this.props.getJobLists();
        await this._checkDeepLink();
      } else {
        const appIntro = await getItem("appintro");
        const candidateJob = await getItem("mongo_id");
        if (candidateJob || (appIntro !== undefined && appIntro.shown)) {
          this.props.navigation.replace("HomePage");
        }
        SplashScreen.hide();
        alert("Please! Connect to the internet first");
      }
    });
    AppState.addEventListener("change", this._handleAppStateChange);
  };

  _checkDeepLink = async () => {
    branch.subscribe(async ({ params }) => {
      console.log(params);
      
      if (
        this.props.joblist.data !== "" &&
        this.props.joblist.data !== undefined &&
        params.$share_data !== undefined &&
        this.props.joblist !== null
      ) {
        const appIntro = await getItem("appintro");
        const candidateJob = await getItem("mongo_id");
        if (candidateJob || (appIntro !== undefined && appIntro.shown)) {
          this.props.navigation.replace("HomePage");
        }
        this.props.joblist.data.forEach((item, i) => {
          if (item.id == params.$share_data) {
            this.props.navigation.navigate("FullDescription", {
              subject: item.subject,
              job_description: item.job_description,
              keyword: item.keyword,
              candidate_profile: item.candidate_profile,
              jobDetail: item,
              currentJob: this.props.joblist
            });
            // SplashScreen.hide();
          }
        });
      }
      if (params.errors && params.errors !== undefined) {
        alert("Error from Branch: " + errors);
        return;
      }
      if (params.$deeplink_path !== undefined) {
        let fb_id = params.$deeplink_path;
        await this.props.getCandidateDetails(fb_id);
        const { status } = this.props.interviewSignUp;
        if (status == 1) {
          this.setState({ deepLink: true, fb_id: fb_id });
        } else if (params.error == 1 && params.error !== undefined) {
          this.setState({ deepLink: false });
        }
      } else if (
        params.$deeplink_path == undefined &&
        params.$share_data == undefined
      ) {
        const appIntro = await getItem("appintro");
        const candidateJob = await getItem("mongo_id");
        if (candidateJob || (appIntro !== undefined && appIntro.shown)) {
          this.props.navigation.replace("HomePage");
          console.log('noonce');
          
        }
      } else if (params.$share_data !== undefined) {
        this.setState({ sharing: true });
      }
      //   });

      // }
      // else{
      // const appIntro = await getItem("appintro");
      //     const candidateJob = await getItem("mongo_id");
      //     if (candidateJob || (appIntro !== undefined && appIntro.shown)) {
      //       this.props.navigation.replace("HomePage");
      //     }
      // }
    });
    SplashScreen.hide();
  };
  _onNext = index => {
    let items = AppDetails;
    let moveToIndex = items.length - 1 <= index;
    if (!moveToIndex) {
      let moveIndex = index + 1;
      this.flatListRef.scrollToIndex({ animated: true, index: moveIndex });
    } else {
      this._linkCheck();
    }
  };
  _onSkip = () => {
    this._linkCheck();
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
    } else if (sharing) {
      this.props.navigation.navigate("JobList", { title: "Apply for Jobs" });
    } else {
      setItem("appintro", JSON.stringify({ shown: true }));
      this.props.navigation.navigate("HomePage");
    }
  };
  _renderItem = ({ item, index }) => {
    let imgMargin;
    switch (index) {
      case 0:
        imgMargin = -13;
        break;
      case 2:
        imgMargin = -32;
        break;
      default:
        imgMargin = -10;
        break;
    }
    let font_size = index === 0 || index === 3 ? 15 : 24;

    return (
      <Grid>
        <Col size={9} style={[styles.container]}>
          <LinearGradient
            colors={[COLOR.LGONE, COLOR.LGTWO]}
            style={[styles.container, styles.containerView]}
          >
            <CardTrail />
            <Card style={[styles.appIntroCardStyle]}>
              {/* <View style={{borderWidth:1}}> */}
              <Image
                resizeMode="contain"
                style={[
                  index === 0 ? styles.helloImage : styles.images,
                  {
                    marginLeft: imgMargin
                  }
                ]}
                source={item.image}
              />
              <View
                style={[
                  // { marginLeft: index === 0 ? "17%" : null,marginTop:index === 0 ? 0 :null },
                  index === 0
                    ? { position: "relative", left: "14%", top: 0 }
                    : {},
                  index === 1 ? styles.secondImageTextView : {},
                  index === 3 ? styles.fourthImageTextView : {}
                  // {borderWidth:1}
                ]}
              >
                <Text
                  style={[
                    {
                      fontSize: font_size
                    },
                    styles.rawText
                  ]}
                >
                  {item.rawText}
                </Text>
                <Text
                  style={[
                    {
                      fontSize: font_size
                    },
                    styles.boldText
                  ]}
                >
                  {item.boldText}
                </Text>
              </View>
              {/* </View> */}
            </Card>
          </LinearGradient>
        </Col>
        {/* <Row style={styles.bottomContainer}>
          <Text
            style={styles.skipText}
            onPress={() => {
              this._onSkip();
            }}
          >
            {index == 3 ? "" : "Skip"}
          </Text>
          <ProgressBar items={AppDetails} index={index} />
          <View
            onPress={() => {
              this._onNext(item, index);
            }}
            style={styles.nextView}
          >
            <TouchableOpacity
              onPress={() => {
                this._onNext(item, index);
              }}
              style={styles.btnBack}
            />
            <Icon
              onPress={() => {
                this._onNext(item, index);
              }}
              style={styles.nextIcon}
              name={iconName}
            />
          </View>
        </Row> */}
      </Grid>
    );
  };
  handleScroll(event) {
    let index = Math.ceil(event.nativeEvent.contentOffset.x / 300);
    if (index == 0 || index == 1) {
      this.setState({ index: 0 });
    } else if (index == 2) {
      this.setState({ index: 1 });
    } else if (index == 3) {
      this.setState({ index: 2 });
    } else if (index == 4) {
      this.setState({ index: 3 });
    }
  }
  render() {
    let iconName = this.state.index == 3 ? "checkmark" : "arrow-forward";
    return (
      <Container>
        <View
          style={{ zIndex: 1, width: "100%", position: "absolute", bottom: 20,paddingLeft:width*.4 }}
        >
          <Row style={styles.bottomContainer}>
            {/* <Text
              style={styles.skipText}
              onPress={() => {
                this._onSkip();
              }}
            >
              {this.state.index == 3 ? "" : "Skip"}
            </Text> */}
            <ProgressBar items={AppDetails} index={this.state.index} />
            <View
              onPress={() => {
                this._onNext(this.state.index);
              }}
              style={styles.nextView}
            >
              <TouchableOpacity
                onPress={() => {
                  this._onNext(this.state.index);
                }}
                style={styles.btnBack}
              />
              <Icon
                onPress={() => {
                  this._onNext(this.state.index);
                }}
                style={styles.nextIcon}
                name={iconName}
              />
            </View>
          </Row>
        </View>
        <FlatList
          pagingEnabled
          horizontal
          onScroll={e => this.handleScroll(e)}
          showsHorizontalScrollIndicator={false}
          ref={ref => {
            this.flatListRef = ref;
          }}
          data={AppDetails}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.rawText}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    appliedJob: state.appliedJob,
    interviewSignUp: state.interviewSignUp,
    joblist: state.joblist
  };
};
export default connect(
  mapStateToProps,
  {
    getCandidateJobDetails,
    getCandidateDetails,
    getJobLists,
    getCandidateRoundDetails
  }
)(AppIntro);
