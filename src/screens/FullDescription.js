import React, { Component } from "react";
import { Text, StyleSheet, View ,TouchableOpacity} from "react-native";
import { COLOR } from "../styles/color";
import EmptyView from "../components/EmptyView";
import JobSalaryDetails from "../components/JobSalaryDetails";
import { /* Button, */ Container, Content, Icon } from "native-base";
import {
  ABOUT_US,
  JOB_DESCRIPTION,
  CANDIDATE_PROFILE,
  JOBDES_TITLE,
  DESIRE_PRO,
  EDU_TITLE,
  KEY_SKILL,
  COM_PRO,
  EXCELLECE_TECH,
  LOG_TO_APPLY,
  SHARE_IT,
  EDUCATION_DES,
  RECRUIT_NAME
} from "../helper/constant";
import styles from "../styles/screens/FullDescription";
import Share, { ShareSheet, Button } from "react-native-share";
import { SHAREURL } from "../config/dev";
import LoginAndShareButton from "../components/CustomButton";
import CustomButton from "../components/CustomButton";
class FullDescription extends Component {
  static navigationOptions = {
    headerStyle: {
      elevation: 0,
      backgroundColor: "white"
    },
    title: "Full Description",
    headerTitleStyle: {
      color: "#253055",
      textAlign: "center",
      alignSelf: "center",
      flex: 1,
      fontFamily: "Montserrat-SemiBold"
    },
    headerTintColor: COLOR.PINK,
    headerRight: <View />
  };
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
  onShareClick = item => {
    let shareDetails = {};
    shareDetails["subject"] = item.subject;
    shareDetails["message"] = item.job_description;
    shareDetails["title"] = item.title;
    shareDetails["url"] = `https://hrrecruit.app.link/9gvVNNaqIN?$share_data=${item.id}`
    this.setState({ visible: true, shareOptions: shareDetails });
  };
  onCancel() {
    this.setState({ visible: false });
  }
  render() {
    // console.log(this.props,'>>>>>>>>>>>>>>>.');
    const {
      shareOptions,
    } = this.state;
    let currentJob =this.props.navigation.state.params.currentJob
    let jobDetail=this.props.navigation.state.params.jobDetail
    console.log(jobDetail,'jobdetails');
    
    const job_title = this.props.navigation.getParam("subject");
    const job_desription = this.props.navigation.getParam("job_description");
    const candidate_profile = this.props.navigation.getParam(
      "candidate_profile"
    );
   let keyword;
   if(this.props.navigation.getParam("keyword") !==null){
     keyword=this.props.navigation.getParam("keyword").split(",")
     if(keyword.length ==1){
       keyword=[]
     }else{
      keyword=this.props.navigation.getParam("keyword").split(",")
     }
   }else{
     keyword=[]
   }

  //  this.props.navigation.getParam("keyword") !==null ? keyword = this.props.navigation.getParam("keyword").split(",") : keyword = []
   return (
      <Container style={styles.container}>
        <Content showsVerticalScrollIndicator={false}>
          <JobSalaryDetails>
            <Text style={styles.jobTitle}>{job_title}</Text>
          </JobSalaryDetails>
          <EmptyView />
          <Text style={styles.headerTextStyle}>{JOBDES_TITLE}</Text>
          <Text style={styles.descriptionText}>{job_desription}</Text>
          <EmptyView />
          <Text style={styles.descriptionText}>{JOB_DESCRIPTION}</Text>
          <EmptyView />
       {keyword.length !==0 && <Text style={styles.headerTextStyle}>{KEY_SKILL}</Text>}
          <View style={styles.keySkillsView}>
           {keyword.map((text, id) => {
              return (
                <CustomButton
            type="keySkillButton"
            btnStyle={styles.keySkillsButton}
            btnTextStyle={styles.keySkillsButtonText}
            text={text}
            key={id}
          />
                // <Button rounded style={styles.keySkillsButton} key={id}>
                //   <Text style={styles.keySkillsButtonText}>{text}</Text>
                // </Button>
              )})}
          </View>

          <EmptyView />
          {candidate_profile !== null && <Text style={styles.headerTextStyle}>{DESIRE_PRO}</Text>}
          {candidate_profile !== "" ? (
            <Text style={styles.descriptionText}>{candidate_profile} </Text>
          ) : (
            <Text style={styles.descriptionText}>{CANDIDATE_PROFILE}</Text>
          )}

          <EmptyView />
          <Text style={styles.headerTextStyle}>{EDU_TITLE}</Text>
          <Text style={styles.descriptionText}>{EDUCATION_DES}</Text>

          <EmptyView />
          <Text style={styles.headerTextStyle}>{COM_PRO}</Text>
          <EmptyView />
          <Text style={styles.descriptionText}>
            {EXCELLECE_TECH}
            {ABOUT_US}
          </Text>
          <EmptyView />
          <Text style={styles.descriptionText}>{RECRUIT_NAME}</Text>
          <View style={styles.btnView}>
          {/* <TouchableOpacity onPress={()=>this.onShareClick(jobDetail)}>
          <Text>vsdlsdsdd</Text>
          </TouchableOpacity> */}
      
       <CustomButton
            onPress={()=>this.props.navigation.navigate('AddCandidate', { jobDetail: jobDetail,
              currentJob: currentJob,isEditing:false,addCandidate:true})}
            type="login_to_apply"
            btnStyle={styles.btnStyle}
            btnTextStyle={[styles.btnText, styles.loginTextStyle]}
            text={LOG_TO_APPLY}
          />
          <View style={styles.marginView}/>
          <CustomButton
            onPress={()=>this.onShareClick(jobDetail)}
            type="to_share"
            btnStyle={styles.btnStyle}
            btnTextStyle={[styles.btnText, styles.shareTextStyle]}
            text={SHARE_IT}
            IconStyle={styles.shareIconStyle}
          />
          </View>
        </Content>
        <ShareSheet
          visible={this.state.visible}
          onCancel={this.onCancel.bind(this)}
          style={{zIndex:1}}
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

export default FullDescription;
