import React, { Component, Fragment } from "react";
import { Platform,TouchableOpacity, Linking, StatusBar, ScrollView, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLOR } from "../styles/color";
import ProfileView from "../components/ProfileView";
import ProfileDescription from "../components/ProfileDescription";
import { Icon } from "native-base";
import Modal from "react-native-modalbox";
import {Text,StyleSheet} from 'react-native'
import { DEVICE_WIDTH } from '../helper/constant'
import {Form,Item,Input,Label} from 'native-base'
import CustomButton from '../components/CustomButton'
import styles from '../styles/screens/FullDescription'
import { connect } from "react-redux";
import { getJobLists } from "../actions";

class Profile extends Component {
  
  static navigationOptions =(props)=>{
    const { navigation } = props;
    return{
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
    headerRight:(
      // <TouchableOpacity onPress={navigation.getParam('increaseCount')}>
      <Icon
      
        name="pencil"
        type="MaterialCommunityIcons"
        style={{ color: COLOR.PINK, marginRight: 10, fontSize: 25 }}
      />
      // </TouchableOpacity>
      /* <Icon
      onPress={navigation.getParam('increaseCount')}
        name="add-circle"
        type="MaterialIcons"
        style={{ color: COLOR.PINK, marginRight: 10, fontSize: 25 }}
      /> */
      
    )
  }
  };
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 0,
      isEditing:false,
      jobTitle:'',
      job_profile:'',
      profileImage:'',
      isName:false,
      isMobile:false,
      isJob:false,
      jobList: [],
      updateDetails:'',
      editing:true,
      sender_email:''
    };
  }
  // componentDidMount() {
  //   this.props.navigation.setParams({ increaseCount: this.onEditing });
  // }
  // componentDidMount = async () => {
  //      this.props.navigation.setParams({ increaseCount: this.onEditing });
  //     await this.props.getJobLists();
  //     const { data, error } = this.props.joblist;
  //     if (data) {
  //       console.log(data[0].title,'888888888888888888888');
        
  //       this.setState({ joblist: data });
  //     }
  // };
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
  forEditing=()=>{
    const appliedJob = this.props.navigation.getParam("appliedJob");
    this.setState({isEditing:true,job_profile:appliedJob.job_profile,profileImage:''})
  }
  onChange=(value)=>{
      this.setState({job_profile:value})
  }
  // onEditing=()=>{
  //   const profileDetails = this.props.navigation.getParam("profileDetails");
  //   const appliedJob = this.props.navigation.getParam("appliedJob");
  //   this.state.joblist.forEach((item, i) => {
  //     if(item.title == appliedJob.job_profile){
  //      this.props.navigation.navigate('AddCandidate',{currentJob: this.state.joblist,
  //        jobDetail: item,
  //        profileDetails:profileDetails,
  //        appliedJob:appliedJob,
  //        editing:this.state.editing,
  //        sender_email:this.props.navigation.state.params.sender_mail
  //       })
  //     }        
  //   }); 
  // }

  render() {
    const profileDetails = this.props.navigation.getParam("profileDetails");
    const appliedJob = this.props.navigation.getParam("appliedJob");
    return (
      <ScrollView
      overScrollMode='never'
      >
        <ProfileView profileDetails={profileDetails} />
        <LinearGradient
          colors={[COLOR.LGONE,COLOR.LGONE /* COLOR.LGTWO */]}
          style={{ flexBasis: "65%" }}
        >
          <ProfileDescription
          aboutus={this.aboutUs}
            appliedJob={appliedJob}
            currentPosition={this.state.currentPosition}
            handleLocate={this.handleLocate}
            isEditing={this.state.isEditing}
            job_profile={this.state.job_profile}
            onChange={(value)=>this.onChange(value)}
          />
        </LinearGradient>
        <Modal
        isDisabled={false}
        coverScreen={true}
        backdropPressToClose={true}
        swipeToClose={false}
        style={styless.modal}
        isOpen={this.state.isEditing}
        position={"center"}>
        <View style={{width:'100%',height:'100%',backgroundColor:[COLOR.LGONE,COLOR.LGONE]}} >
        <View style={{alignItems:'center',justifyContent:'center',marginTop:20,marginBottom:20}}>
          <Text style={{fontSize:15,color:'white',fontFamily: "Montserrat-Medium"}}>EDIT YOUR PROFILE</Text>
        </View>
        <View style={{marginRight:20}}>
        <Form>
          <Item style={{borderColor:this.state.isName ==true ? COLOR.MUSTARD :COLOR.LGTWO}} floatingLabel>
          <Label style={{color: COLOR.TURQUOISE,fontSize: 18,
    fontFamily: "Montserrat-Medium"}} >NAME</Label>
            <Input style={{color:'white'}}  value={profileDetails.userName} onFocus={()=>this.setState({isName:true})} onBlur={()=>this.setState({isName:false})}/>
          </Item>
          <View style={{height:15,width:'100%'}} />
          <Item style={{borderColor:this.state.isMobile ==true ? COLOR.MUSTARD :COLOR.LGTWO}} floatingLabel>
          <Label style={{color:COLOR.TURQUOISE,fontSize: 18,
    fontFamily: "Montserrat-Medium"}}>MOBILE NUMBER</Label>
            <Input onFocus={()=>this.setState({isMobile:true})} style={{color:'white'}}  value={profileDetails.mobile_no} onBlur={()=>this.setState({isMobile:false})} />
          </Item>
          <View style={{height:15,width:'100%'}} />
          <Item style={{borderColor:this.state.isJob ==true ? COLOR.MUSTARD :COLOR.LGTWO}} floatingLabel>
          <Label style={{color:COLOR.TURQUOISE,fontSize: 18,
    fontFamily: "Montserrat-Medium"}}>JOB TITLE</Label>
            <Input onFocus={()=>this.setState({isJob:true})} style={{color:'white'}}  value={appliedJob.job_profile} onBlur={()=>this.setState({isJob:false})} />
          </Item>
        </Form>
        </View>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginTop:35,marginLeft:20,marginRight:20}}>
        <CustomButton
            // onPress={()=>this.setState({isEditing:false})}
            type="login_to_apply"
            btnStyle={[styles.btnStyle, styles.loginBtnStyle,{backgroundColor:COLOR.TURQUOISE}]}
            btnTextStyle={[styles.btnText, styles.loginTextStyle]}
            text='Submit'
          />
          <CustomButton
            onPress={()=>this.setState({isEditing:false})}
            type="login_to_apply"
            btnStyle={[styles.btnStyle, styles.loginBtnStyle,{backgroundColor:COLOR.TURQUOISE}]}
            btnTextStyle={[styles.btnText, styles.loginTextStyle]}
            text='Cancel'
          />
          </View>
        </View>
        </Modal>
      </ScrollView>
    );
  }
}
const mapStateToProps = ({ joblist }) => ({ joblist });
// export default Profile;
export default connect(
  mapStateToProps,
  { getJobLists }
)(Profile);
const styless=StyleSheet.create({
  modal:{
    height: 400,
    width: DEVICE_WIDTH * 0.96,
    borderRadius:12,
    backgroundColor:COLOR.LGONE,
    borderRadius:10
  }
})