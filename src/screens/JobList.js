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
import { COLOR } from "../styles/color";
import { getJobLists } from "../actions";
import CustomButton from "../components/CustomButton";
import HorizontalLine from "../components/HorizontalLine";
import JobOpeningAboutUs from "../components/JobOpeningAboutUs";
import Share, { ShareSheet, Button } from "react-native-share";
import { SHAREURL } from "../config/dev";
import LinearGradient from "react-native-linear-gradient";

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
    this.props.navigation.navigate("AddCandidate", {
      jobDetail: item,
      currentJob: this.state.joblist
    });
  };
  onCancel() {
    console.log("CANCEL");
    this.setState({ visible: false });
  }

  onShareClick = item => {
    let shareDetails = {};
    console.log(item, "item", shareDetails);
    shareDetails["title"] = item.title;
    shareDetails["subject"] = item.subject;
    shareDetails["message"] = item.job_description;
    shareDetails["url"] = SHAREURL;
    this.setState({ visible: true, shareOptions: shareDetails });
  };
  renderCardItem = ({ item }) => (
    <Card padder>
      <CardItem style={{ justifyContent: "space-between" }}>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 13 }}>{item.subject}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>0-1 years</Text>
            <Text>Noida</Text>
            <Text>1,25,000 - 2,00,000 PA</Text>
          </View>
        </View>
        <Button
          onPress={() => {
            console.log();
          }}
          style={{ marginRight: -10 }}
          transparent
          primary
        >
          <Text>APPLIED</Text>
        </Button>
      </CardItem>
      <HorizontalLine />
      <CardItem>
        <Body>
          <Text style={[styles.text, { textAlign: "auto" }]}>
            {item.job_description ? item.job_description : ""}
          </Text>
        </Body>
      </CardItem>
      <CustomButton
        btnStyle={styles.buttonPadder}
        text="Apply for Job"
        onPress={() => {
          this.onApplyJob(item);
        }}
      />
    </Card>
  );
  render() {
    const {
      joblist,
      shareOptions,
      isLoading,
      appliedJobDetails,
      userLogin
    } = this.state;
    return (
      <Container>
        <JobOpeningAboutUs />
        {!isLoading ? (
          <View style={{ flex: 1 }}>
            <View />
            {!isLoading && joblist && joblist.length >= 1 ? (
              <LinearGradient
                colors={[COLOR.LGONE, COLOR.LGTWO]}
                style={{ flex: 1 }}
              >
                <Content padder>
                  <FlatList
                    data={joblist}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={this.renderCardItem}
                  />
                </Content>
              </LinearGradient>
            ) : null}
            {!isLoading && userLogin ? (
              <Content padder>
                <Card>
                  <CardItem style={{ justifyContent: "space-between" }}>
                    <Text>{appliedJobDetails.job_profile}</Text>
                  </CardItem>
                  <HorizontalLine />
                  <CardItem>
                    <Body>
                      <Text style={[styles.text, { textAlign: "auto" }]}>
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
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
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
