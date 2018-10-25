import React, { Component, Fragment } from "react";
import {
  View,
  Alert,
  Image,
  Linking,
  Platform,
  TouchableOpacity,
  FlatList,
  Clipboard,
  ToastAndroid,
  AlertIOS
} from "react-native";
import {
  Container,
  Text,
  Card,
  Content,
  Body,
  CardItem,
  Icon,
  Spinner
} from "native-base";
import { connect } from "react-redux";
import styles from "../styles";
import _styles from "../styles/screens/JobList";
import { COLOR } from "../styles/color";
import { getJobLists } from "../actions";
import CustomButton from "../components/CustomButton";
import HorizontalLine from "../components/HorizontalLine";
import AboutUsText from "../components/AboutUsText";
import Share, { ShareSheet, Button } from "react-native-share";
import { SHAREURL } from "../config/dev";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import JobSalaryDetails from "../components/JobSalaryDetails";

class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList: [],
      visible: false,
      shareOptions: {},
      appliedJobDetails: null,
      isLoading: true,
      userLogin: false
    };
  }
  componentDidMount = async () => {
    const { params } = this.props.navigation.state;
    if (params.appliedJob !== undefined) {
      this.setState({
        appliedJobDetails: params.appliedJob,
        isLoading: false,
        userLogin: true
      });
    } else {
      await this.props.getJobLists();
      const { data, error } = this.props.joblist;
      if (data) {
        this.setState({ joblist: data, isLoading: false });
      }
    }
  };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.title,
      headerStyle: {
        elevation: 0,
        backgroundColor: "white"
      },
      headerTitleStyle: {
        fontFamily: "Montserrat-Bold",
        color: "black",
        flex: 1,
        textAlign: "center",
        alignSelf: "center"
      },
      headerTintColor: COLOR.PINK,
      headerRight: <View />
    };
  };
  onApplyJob = item => {
    // console.log(item,this.state.jobList,'cccccccccccccccccccccc');
    // console.log(item,this.state.jobList,'{{{{{{{{{{{{{{{{{[');
    this.props.navigation.navigate("AddCandidate", {
      jobDetail: item,
      currentJob: this.state.joblist
    });
  };
  onCancel() {
    this.setState({ visible: false });
  }

  onShareClick = item => {
    let shareDetails = {};
    shareDetails["title"] = item.title;
    shareDetails["subject"] = item.subject;
    shareDetails["message"] = item.job_description;
    shareDetails["url"] = SHAREURL;
    this.setState({ visible: true, shareOptions: shareDetails });
  };
  renderCardItem = ({ item }) => {
    return (
      <Card style={styles.mainCard} padder>
        <CardItem style={[styles.cardItem,styles.mainCard]}>
          <JobSalaryDetails>
            <Text style={styles.viewText}>{item.subject}</Text>
          </JobSalaryDetails>
          <CustomButton
            onPress={() => {
              this.onApplyJob(item);
            }}
            type="rounded"
            btnStyle={styles.applyBtn}
            btnTextStyle={styles.applyBtnText}
            text="APPLY"
          />
        </CardItem>
        <CardItem>
          <Body>
            <Text style={[styles.text, _styles.jobDescriptionText]}>
              {item.job_description ? item.job_description : ""}
            </Text>
          </Body>
        </CardItem>
        <CustomButton
          btnStyle={styles.buttonPadder}
          btnTextStyle={_styles.fullDescriptionText}
          type="rounded"
          text="Full Description"
          onPress={() => {
            this.props.navigation.navigate("FullDescription", {
              subject: item.subject,
              job_description: item.job_description,
              keyword: item.keyword,
              candidate_profile: item.candidate_profile,
              jobDetail: item,
              currentJob: this.state.joblist,
            });
          }}
        />
      </Card>
    );
  };
  render() {
    console.log(this.props,'////////////////////////////');
    
    const {
      joblist,
      shareOptions,
      isLoading,
      appliedJobDetails,
      userLogin
    } = this.state;
    return (
      <Container>
        {!isLoading ? (
          <View style={_styles.container}>
            <View />
            {!isLoading && joblist && joblist.length >= 1 ? (
              <Fragment>
                <Content>
                  <AboutUsText />
                  <LinearGradient
                    colors={[COLOR.LGONE, COLOR.LGTWO]}
                    style={styles.linearGradientView}
                  >
                    <View style={_styles.jobCardView}>
                      <FlatList
                        data={joblist}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={this.renderCardItem}
                      />
                    </View>
                  </LinearGradient>
                </Content>
              </Fragment>
            ) : null}
            {!isLoading && userLogin ? (
              <Content padder>
                <Card>
                  <CardItem style={_styles.appliedJobStyle}>
                    <Text>{appliedJobDetails.job_profile}</Text>
                  </CardItem>
                  <HorizontalLine />
                  <CardItem>
                    <Body>
                      <Text style={[styles.text, _styles.jobDescriptionText]}>
                        {appliedJobDetails.job_description
                          ? appliedJobDetails.job_description
                          : ""}
                      </Text>
                    </Body>
                  </CardItem>
                </Card>
              </Content>
            ) : null}
          </View>
        ) : (
          <View style={_styles.spinnerView}>
            <Spinner color={COLOR.Spinner} />
          </View>
        )}
        <ShareSheet
          visible={this.state.visible}
          onCancel={this.onCancel.bind(this)}
        >
          <Button
            iconSrc={require("../images/twitter.png")}
            onPress={() => {
              this.onCancel();
              setTimeout(() => {
                Share.shareSingle(
                  Object.assign(shareOptions, {
                    social: "twitter"
                  })
                );
              }, 300);
            }}
          >
            Twitter
          </Button>
          <Button
            iconSrc={require("../images/facebook.png")}
            onPress={() => {
              this.onCancel();
              setTimeout(() => {
                Share.shareSingle(
                  Object.assign(shareOptions, {
                    social: "facebook"
                  })
                );
              }, 300);
            }}
          >
            Facebook
          </Button>
          <Button
            iconSrc={require("../images/whatapp.png")}
            onPress={() => {
              this.onCancel();
              setTimeout(() => {
                Share.shareSingle(
                  Object.assign(shareOptions, {
                    social: "whatsapp"
                  })
                );
              }, 300);
            }}
          >
            Whatsapp
          </Button>
          <Button
            iconSrc={require("../images/googleplus.png")}
            onPress={() => {
              this.onCancel();
              setTimeout(() => {
                Share.shareSingle(
                  Object.assign(shareOptions, {
                    social: "googleplus"
                  })
                );
              }, 300);
            }}
          >
            Google +
          </Button>
          <Button
            iconSrc={require("../images/mail.png")}
            onPress={() => {
              this.onCancel();
              setTimeout(() => {
                Share.shareSingle(
                  Object.assign(shareOptions, {
                    social: "email"
                  })
                );
              }, 300);
            }}
          >
            Email
          </Button>
          <Button
            iconSrc={require("../images/link.png")}
            onPress={() => {
              this.onCancel();
              setTimeout(() => {
                if (typeof shareOptions["url"] !== undefined) {
                  Clipboard.setString(shareOptions["url"]);
                  if (Platform.OS === "android") {
                    ToastAndroid.show("Link Copied", ToastAndroid.SHORT);
                  } else if (Platform.OS === "ios") {
                    AlertIOS.alert("Link Copied");
                  }
                }
              }, 300);
            }}
          >
            Copy Link
          </Button>
          <Button
            iconSrc={require("../images/more.png")}
            onPress={() => {
              this.onCancel();
              setTimeout(() => {
                Share.open(shareOptions);
              }, 300);
            }}
          >
            More
          </Button>
        </ShareSheet>
      </Container>
    );
  }
}

const mapStateToProps = ({ joblist }) => ({ joblist });
export default connect(
  mapStateToProps,
  { getJobLists }
)(JobList);
