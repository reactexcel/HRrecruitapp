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
import toastAlert from "../helper/toastAlert";
import LinearGradient from "react-native-linear-gradient";
import { COLOR } from "../styles/color";
import ProfileView from "../components/ProfileView";
import ProfileDescription from "../components/ProfileDescription";
import NetInfo from "@react-native-community/netinfo";
import { Icon } from "native-base";
import Modal from "react-native-modalbox";
import { Text, StyleSheet } from "react-native";
import { DEVICE_WIDTH } from "../helper/constant";
import { Form, Item, Input, Label } from "native-base";
import CustomButton from "../components/CustomButton";
import styles from "../styles/screens/FullDescription";
import { connect } from "react-redux";
import { getJobLists,
        candidateUploadImage,
        getCandidateUpdateProfileDetails,
        connectionState
      } from "../actions";
import { ProfileOnChange } from "../actions/actions";

import  DocumentPicker from "react-native-document-picker";
import RNFetchBlob from "rn-fetch-blob";
import { Popup } from 'react-native-map-link';
import { setItem, getItem } from "../helper/storage";
import SplashScreen from "react-native-splash-screen";
let componentRendered = false
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
    NetInfo.isConnected.addEventListener("connectionChange",this.handleNetworks);
    this.props.navigation.setParams({ increaseCount: this.onEditing});
    const profileDetails = this.props.navigation.getParam("profileDetails");
    this.setState({profile_picture:this.props.navigation.state.params.latestImage})
    const { data, error, isSuccess } = this.props.joblist;
    const {isConnected} = this.props.network
    if (data) {
      this.setState({ joblist: data });
    }
    if(isConnected && !isSuccess){
        await this.props.getJobLists();
      }
  };

  handleNetworks = async isConnected => {
    this.props.connectionState(isConnected)
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleNetworks
    );
  }

  jobOpening=()=>{
    this.props.navigation.navigate('JobList',{ title: "Job Openings",isCandidate:true })
  }

 async componentDidUpdate(props){
    const {UploadProfilePic, candidateProfileUpdateDetails, joblist, network} = this.props;
    if(UploadProfilePic.isSuccess !== props.UploadProfilePic.isSuccess){
      const user_mongo_id = this.props.navigation.state.params.mongo_id
      this.props.getCandidateUpdateProfileDetails(user_mongo_id)
      toastAlert("Successfully Uploaded", "toast")
    }

    if(UploadProfilePic.isError !== props.UploadProfilePic.isError){
      toastAlert("Something went wrong please try gain!", "toast")
    }

    if(candidateProfileUpdateDetails.isSuccess !== props.candidateProfileUpdateDetails.isSuccess){
      setItem("mongo_id", JSON.stringify({ candidate:{ data:candidateProfileUpdateDetails} }));
    }

    if(joblist.isSuccess !== props.joblist.isSuccess){
      if(joblist.isSuccess){
        this.setState({ joblist: joblist.data });
      }
    }

    if(network.isConnected !== props.network.isConnected){
      if(network.isConnected){
        AlertMessage("Internet connection is back.","toast");
        const {joblist} = this.props;
        if(!joblist.isSuccess && !joblist.isLoading){
          await this.props.getJobLists();
        }
      }else{
          AlertMessage("Internet connection is lost.", "toast")
        }
    }
  }

  onPhotoUpload =async () => {
    let resumeData = this.state.resumeData;
    try {
        const profilePic = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
        });
        if (profilePic) {
          SplashScreen.hide()
          let res = profilePic[0]
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
      catch(e){

    }
  };
  handleLocate = () => {
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
    const {network:{isConnected}, joblist} = this.props;
    if(joblist.isSuccess){
      const profileDetails = this.props.navigation.getParam("profileDetails");
      const appliedJob = this.props.navigation.getParam("appliedJob");
      const candidateJob =await getItem("mongo_id");
      for(i=0; i<this.state.joblist.length; i++) {
        if (this.state.joblist[i].title == appliedJob.job_profile) {
          this.props.navigation.navigate("AddCandidate", {
            currentJob: this.state.joblist,
            jobDetail: this.state.joblist[i],
            profileDetails: profileDetails,
            appliedJob: appliedJob,
            candidateDataToUpdate:candidateJob,
            isEditing: true,
            mongo_id:this.props.navigation.state.params.mongo_id,
            updatedData:true,
            addCandidate:false,
            isCandidate:false
          });
          break;
        }
      };
    }else {
      if(!isConnected){
        toastAlert("Connect to the internet to update your profile.", "toast")
      }else if(isConnected && joblist.isLoading) {
        toastAlert("Wait, we are fetchting your details.", "toast")
      }
    }
  };

  render() {
    const profileDetails = this.props.navigation.getParam("profileDetails");
    const appliedJob = this.props.navigation.getParam("appliedJob");
    const {joblist} = this.props;
    return (
      <ScrollView overScrollMode="never">
        <ProfileView
          onPress={() => this.onPhotoUpload()}
          profileDetails={profileDetails}
          imageSource={this.state.imageSource}
          profile_picture={this.state.profile_picture}
          uploading={this.state.uploading}
          uploadStatus={this.props.UploadProfilePic.data}
          latestImage={this.state.latestImage}
          updateMessage={this.state.updateMessage}
          loader={joblist.isLoading}
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
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {
    joblist: state.joblist,
    state:state,
    candidateDataToUpdate: state.UpdateProfile,
    candidateProfileUpdateDetails:state.candidateProfileUpdateDetails,
    UploadProfilePic:state.UploadProfilePic,
    network:state.network,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getJobLists: value => dispatch(getJobLists(value)),
    ProfileOnChange: v => dispatch(ProfileOnChange(v)),
    candidateUploadImage: data => dispatch(candidateUploadImage(data)),
    getCandidateUpdateProfileDetails:(id)=>dispatch(getCandidateUpdateProfileDetails(id)),
    getCandidateJobDetails :()=>dispatch(getCandidateJobDetails()),
    connectionState:(status)=>dispatch(connectionState(status)),
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
