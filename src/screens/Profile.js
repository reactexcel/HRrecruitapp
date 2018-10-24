import React, { Component, Fragment } from "react";
import { Platform, Linking, StatusBar, ScrollView, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLOR } from "../styles/color";
import ProfileView from "../components/ProfileView";
import ProfileDescription from "../components/ProfileDescription";
import { Icon } from "native-base";

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
      // onPress={()=>this.onclikc()}
        name="pencil"
        type="MaterialCommunityIcons"
        style={{ color: COLOR.PINK, marginRight: 10, fontSize: 25 }}
      />
    )
  };
  
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 0,
      isEditing:false,
      jobTitle:''
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
  aboutUs=()=>{
    this.props.navigation.navigate('AboutUs')
  }
  onclikc=()=>{
    alert('vkjvjv')
  }

  render() {
    
    const profileDetails = this.props.navigation.getParam("profileDetails");
    const appliedJob = this.props.navigation.getParam("appliedJob");
    console.log(appliedJob.job_profile);
    return (
      <ScrollView
      overScrollMode='never'
      >
        <ProfileView profileDetails={profileDetails} />
        <LinearGradient
          colors={[COLOR.LGONE, COLOR.LGTWO]}
          style={{ flexBasis: "65%" }}
        >
          <ProfileDescription
          aboutus={this.aboutUs}
            appliedJob={appliedJob}
            currentPosition={this.state.currentPosition}
            handleLocate={this.handleLocate}
            isEditing={this.state.isEditing}
          />
        </LinearGradient>
      </ScrollView>
    );
  }
}

export default Profile;
