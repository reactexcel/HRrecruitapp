import React, { Component, Fragment } from "react";
import {
  Platform,
  TouchableOpacity,
  Linking,
  StatusBar,
  ScrollView,
  View,
  Animated
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLOR } from "../styles/color";
import ProfileView from "../components/ProfileView";
import ProfileDescription from "../components/ProfileDescription";
import { Icon } from "native-base";
import Modal from "react-native-modalbox";
import { Text, StyleSheet } from "react-native";
import { DEVICE_WIDTH } from "../helper/constant";
import { Form, Item, Input, Label } from "native-base";
import CustomButton from "../components/CustomButton";
import styles from "../styles/screens/FullDescription";
import { connect } from "react-redux";
import { getJobLists, candidateUploadImage ,getCandidateUpdateProfileDetails} from "../actions";
import { ProfileOnChange } from "../actions/actions";

import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";
// import SplashScreen from "react-native-splash-screen";
import RNFetchBlob from "rn-fetch-blob";
import { Popup } from 'react-native-map-link';
import { setItem, getItem } from "../helper/storage";
// var RNFS = require('react-native-fs');

class Profile extends Component {
  static navigationOptions = props => {
    const { navigation } = props;
    return {
      headerStyle: {
        elevation: 0,
        backgroundColor: "white"
      },
      title: "Profile",
      headerTitleStyle: {
        color: COLOR.TEXTCOLOR,
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
        fontFamily: "Montserrat-SemiBold"
      },
      headerTintColor: COLOR.PINK,
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam("increaseCount")}>
          <Icon
            name="pencil"
            type="MaterialCommunityIcons"
            style={{ color: COLOR.PINK, marginRight: 10, fontSize: 25 }}
          />
        </TouchableOpacity>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 0,
      isEditing: false,
      jobTitle: "",
      job_profile: "",
      profileImage: "",
      isName: false,
      isMobile: false,
      isJob: false,
      jobList: [],
      updateDetails: "",
      editing: true,
      sender_email: "",
      joblist: "",
      imageSource:null,
      resumeData:[],
      profile_picture:'',
      uploading :false,
      catch:false,
      updateMessage:false,
      fadeAnim: new Animated.Value(0),
    };
  }
  componentDidMount = async () => {
    this.props.navigation.setParams({ increaseCount: this.onEditing});
    const profileDetails = this.props.navigation.getParam("profileDetails");
  this.setState({profile_picture:this.props.navigation.state.params.latestImage})
    await this.props.getJobLists();
    const { data, error } = this.props.joblist;
    if (data) {
      this.setState({ joblist: data });
    }
  };

  jobOpening=()=>{
    this.props.navigation.navigate('JobList',{ title: "Job Openings",isCandidate:true })
  }

  ImageUpdatedPopUp=()=>{
    console.log('updated message');
    
    // Animated.timing(  
    //   this.state.fadeAnim,           
    //   {
    //     toValue: 1,             
    //     duration: 1000,
    //   }
    // ).start();  
  }
  onPhotoUpload = () => {
    let resumeData = this.state.resumeData;
    if (Platform.OS !== "ios") {
      //Android Only
      DocumentPicker.show(
        {
          filetype: [DocumentPickerUtil.images()]
        },
        async(error, res) => {
          // SplashScreen.hide();
          if (res) {
            let check = true;
            if (check) {
              let type = res.type.split("/");
              const data = await RNFetchBlob.fs.readFile(res.uri, "base64")
                let base64 = require('base-64');
                let decodedData = base64.decode(data);
                let bytes = decodedData.length;
                let fileSizeInMB=(bytes / 1000000)
                if(fileSizeInMB > .8 ){
                  alert("Image size can't exceed 800KB");
                }
                else if(fileSizeInMB <.03){
                  alert("Image size can't be less than 30KB")
                }
                else{ 
                  resumeData.push({
                    fileName: res.fileName,
                    file: data,
                    mongo_id:this.props.navigation.state.params.mongo_id
                  });
                  this.setState({imageSource:res.uri,uploading:true,catch:true,profile_picture:undefined})
                  this.props.candidateUploadImage(resumeData)
              }
            }
          }
        }
      );
    }else{
      // if (Platform.OS !== "ios") {
        //Android Only
        // DocumentPicker.show(
        //   {
        //     filetype: [DocumentPickerUtil.images()]
        //   },
        //   async(error, res) => {
        //     // SplashScreen.hide();
        //     if (res) {
        //       let check = true;
        //       if (check) {
        //         let type = res.type.split("/");
        //         const data = await RNFS.readFile(res.uri, "base64")
        //           let base64 = require('base-64');
        //           let decodedData = base64.decode(data);
        //           let bytes = decodedData.length;
        //           let fileSizeInMB=(bytes / 1000000)
        //           if(fileSizeInMB > .8 ){
        //             alert("Image size can't exceed 800KB");
        //           }
        //           else if(fileSizeInMB <.03){
        //             alert("Image size can't be less than 30KB")
        //           }
        //           else{ 
        //             resumeData.push({
        //               fileName: res.fileName,
        //               file: data,
        //               mongo_id:this.props.navigation.state.params.mongo_id
        //             });
        //             this.setState({imageSource:res.uri,uploading:true,catch:true,profile_picture:undefined})
        //             this.props.candidateUploadImage(resumeData)
        //         }
        //       }
        //     }
        //   }
        // );
      // }
    }
  };
  handleLocate = () => {
    // let url = "";
    // if (Platform.OS === "ios") {
    //   url = `http://maps.apple.com/maps?q=${28.5965789},${77.3287437}`;
    // } else if (Platform.OS === "android") {
    //   url = `geo:${28.5965789},${77.3287437}`;
    // }
    // Linking.openURL(url);
    this.setState({ isLocation: true })
  };
  closeLocationModal = () => {
    this.setState({ isLocation: false })
  }
  aboutUs=()=>{
    this.props.navigation.navigate('AboutUs')
  }
  forEditing=()=>{
    const appliedJob = this.props.navigation.getParam("appliedJob");
    this.setState({
      isEditing: true,
      job_profile: appliedJob.job_profile,
      profileImage: ""
    });
  };
  onChange = value => {
    this.setState({ job_profile: value });
  };
  onEditing = async () => {
    const profileDetails = this.props.navigation.getParam("profileDetails");
    const appliedJob = this.props.navigation.getParam("appliedJob");
    const candidateJob =await getItem("mongo_id");
    // console.log(candidateJob);
    this.state.joblist.forEach((item, i) => {
      if (item.title == appliedJob.job_profile) {
        this.props.navigation.navigate("AddCandidate", {
          currentJob: this.state.joblist,
          jobDetail: item,
          profileDetails: profileDetails,
          appliedJob: appliedJob,
          candidateDataToUpdate:candidateJob,
          isEditing: true,
          mongo_id:this.props.navigation.state.params.mongo_id,
          updatedData:true,
          addCandidate:false,
          isCandidate:false
        });
      }
    });
  };
// componentDidUpdate(){
//   if(this.props.state.UploadProfilePic.data !==undefined && this.state.uploaded ==false){
//     this.setState({uploaded:true})
//   }
// }
  render() {
    // console.log(this.state.uploading,'profile');
    
    const profileDetails = this.props.navigation.getParam("profileDetails");
    console.log(profileDetails,this.props,'profileDetails');
    const appliedJob = this.props.navigation.getParam("appliedJob");
    return (
      <ScrollView overScrollMode="never">
        <ProfileView
          onPress={() => this.onPhotoUpload()}
          profileDetails={profileDetails}
          imageSource={this.state.imageSource}
          profile_picture={this.state.profile_picture}
          uploading={this.state.uploading}
          uploadStatus={this.props.state.UploadProfilePic.data}
          latestImage={this.state.latestImage}
          updateMessage={this.state.updateMessage}
          // ImageUpdatedPopUp={()=>this.ImageUpdatedPopUp()}
          fadeAnim={this.state.fadeAnim}
        />
        <LinearGradient
          colors={[COLOR.LGONE, COLOR.LGONE /* COLOR.LGTWO */]}
          style={{ flexBasis: "65%" }}
        >
          <ProfileDescription
            aboutus={this.aboutUs}
            appliedJob={appliedJob}
            currentPosition={this.state.currentPosition}
            handleLocate={this.handleLocate}
            isEditing={this.state.isEditing}
            job_profile={this.state.job_profile}
            onChange={value => this.onChange(value)}
            jobOpening={()=>this.jobOpening()}
            profileDetails={profileDetails}
          />
          <Popup
          isVisible={this.state.isLocation}
          onCancelPressed={this.closeLocationModal}
          onAppPressed={this.closeLocationModal}
          onBackButtonPressed={this.closeLocationModal}
          options={{
            latitude: 28.5965789,
            longitude: 77.3287437,
            title: 'Excellene Technologies',
            dialogTitle: 'Excellence Technologies',
            dialogMessage: 'Search Our Location in Map',
            cancelText: 'Cancel'
          }}
        />
        </LinearGradient>
        {/* <Modal
          isDisabled={false}
          coverScreen={true}
          backdropPressToClose={true}
          swipeToClose={false}
          style={styless.modal}
          isOpen={this.state.isEditing}
          position={"center"}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor:[COLOR.LGONE,COLOR.LGONE]
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 20
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  fontFamily: "Montserrat-Medium"
                }}
              >
                EDIT YOUR PROFILE
              </Text>
            </View>
            <View style={{ marginRight: 20 }}>
              <Form>
                <Item
                  style={{
                    borderColor:
                      this.state.isName == true ? COLOR.MUSTARD : COLOR.LGTWO
                  }}
                  floatingLabel
                >
                  <Label
                    style={{
                      color: COLOR.TURQUOISE,
                      fontSize: 18,
                      fontFamily: "Montserrat-Medium"
                    }}
                  >
                    NAME
                  </Label>
                  <Input
                    style={{ color: "white" }}
                    value={profileDetails.userName}
                    onFocus={() => this.setState({ isName: true })}
                    onBlur={() => this.setState({ isName: false })}
                  />
                </Item>
                <View style={{ height: 15, width: "100%" }} />
                <Item
                  style={{
                    borderColor:
                      this.state.isMobile == true ? COLOR.MUSTARD : COLOR.LGTWO
                  }}
                  floatingLabel
                >
                  <Label
                    style={{
                      color: COLOR.TURQUOISE,
                      fontSize: 18,
                      fontFamily: "Montserrat-Medium"
                    }}
                  >
                    MOBILE NUMBER
                  </Label>
                  <Input
                    onFocus={() => this.setState({ isMobile: true })}
                    style={{ color: "white" }}
                    value={profileDetails.mobile_no}
                    onBlur={() => this.setState({ isMobile: false })}
                  />
                </Item>
                <View style={{ height: 15, width: "100%" }} />
                <Item
                  style={{
                    borderColor:
                      this.state.isJob == true ? COLOR.MUSTARD : COLOR.LGTWO
                  }}
                  floatingLabel
                >
                  <Label
                    style={{
                      color: COLOR.TURQUOISE,
                      fontSize: 18,
                      fontFamily: "Montserrat-Medium"
                    }}
                  >
                    JOB TITLE
                  </Label>
                  <Input
                    onFocus={() => this.setState({ isJob: true })}
                    style={{ color: "white" }}
                    value={appliedJob.job_profile}
                    onBlur={() => this.setState({ isJob: false })}
                  />
                </Item>
              </Form>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 35,
                marginLeft: 20,
                marginRight: 20
              }}
            >
              <CustomButton
                onPress={()=>this.setState({isEditing:false})}
                type="login_to_apply"
                btnStyle={[
                  styles.btnStyle,
                  styles.loginBtnStyle,
                  { backgroundColor: COLOR.TURQUOISE }
                ]}
                btnTextStyle={[styles.btnText, styles.loginTextStyle]}
                text="Submit"
              />
              <CustomButton
                onPress={() => this.setState({ isEditing: false })}
                type="login_to_apply"
                btnStyle={[
                  styles.btnStyle,
                  styles.loginBtnStyle,
                  { backgroundColor: COLOR.TURQUOISE }
                ]}
                btnTextStyle={[styles.btnText, styles.loginTextStyle]}
                text="Cancel"
              />
            </View>
          </View>
        </Modal> */}
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  // console.log(state, "ddddddddddddddd");
  return {
    joblist: state.joblist,
    state:state,
    candidateDataToUpdate: state.UpdateProfile,
    candidateProfileUpdateDetails:state.candidateProfileUpdateDetails
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getJobLists: value => dispatch(getJobLists(value)),
    ProfileOnChange: v => dispatch(ProfileOnChange(v)),
    candidateUploadImage: data => dispatch(candidateUploadImage(data)),
    getCandidateUpdateProfileDetails:(id)=>dispatch(getCandidateUpdateProfileDetails(id)),
    getCandidateJobDetails :()=>dispatch(getCandidateJobDetails())
  };
};
// export default Profile;
// const mapStateToProps=({joblist})=>({joblist})
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // { getJobLists }
)(Profile);
const styless = StyleSheet.create({
  modal: {
    height: 400,
    width: DEVICE_WIDTH * 0.96,
    borderRadius: 12,
    backgroundColor: COLOR.LGONE,
    borderRadius: 10
  }
});
