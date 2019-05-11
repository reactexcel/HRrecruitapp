import React, { Component, Fragment } from "react";
import { View, Alert, Platform, PermissionsAndroid ,ScrollView,Animated} from "react-native";
import {
  Container,
  Content,
  Body,
  Text,
  Card,
  CardItem,
  Item,
  Input,
  Picker,
  Spinner,
  Button,
  Icon,
  Label,
  Form
} from "native-base";
import Permissions from 'react-native-permissions';
// import FCM,{FCMEvent} from 'react-native-fcm'
import DeviceInfo from 'react-native-device-info';
import { Col, Row, Grid } from "react-native-easy-grid";
import { reduxForm, Field } from "redux-form";
import { isEmail, isMobilePhone, isLowercase } from "validator";
import Logo from "../components/Logo";
import CustomButton from "../components/CustomButton";
import styles from "../styles";
import _styles from "../styles/screens/AddCandidate";
import { COLOR } from "../styles/color";
import { notify } from "../helper/notify";
import { connect } from "react-redux";
import { addCandidate,candidateValidationapi,candidateUploadImage,candidateUploadProfile,getCandidateUpdateProfileDetails,getCandidateJobDetails} from "../actions";
import { getJobLists } from "../actions";
import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";
import RNFetchBlob from "rn-fetch-blob";
var RNFS = require('react-native-fs');
import { setItem, getItem } from "../helper/storage";
import SplashScreen from "react-native-splash-screen";
import LinearGradient from "react-native-linear-gradient"; 
import firebase from 'react-native-firebase';
import {ProfileOnChange,UploadProfile} from '../actions/actions'
import {load as loadAccount} from '../reducers/initialStateReducer' 


class AddCandidate extends Component {
  contentHeight= 0
  scrollViewHeight= 0
  constructor() {
    super();
    this._animatedValue = new Animated.ValueXY();
    this._animatedValue.setValue({ x: 0, y: 0 });
    this.state = {
      converting: false,
      resumeData: [],
      currentType: "",
      resumeError: null,
      fcm_token_Id:null,
      deviceId:null,
      whenAddedResume:false,
      from:'',
      sender_mail:'',
      job_profile:'',
      name:'',
      isEditing:false,
      newValue:'',
      bottomBotton:'JOIN',
      SelectJOb:'',
      isJobEmpty:true,
      updating:false,
      Updated:true,
      userName: null,
      mobile_no: null,
      textColor: false,
      animation: false,
      linkOpening: false,
      candidateJob: null,
      profile_pic: null,
      profile_picture:'',
      jobId:'',
      mongo_id:'',
      updateData:false,
      addToProfilePage:true,
      freshDate:'',
      adding:false,
      haveData:false,
      resumeUpdate:'',
      isExisting:false,
      valiSpinner:false,
      forvali:false,
      isExistUser:true,
      emailVefication:true

  
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: COLOR.LGONE,
      elevation: 0
    },
    headerTintColor: COLOR.PINK
  };
  static getDerivedStateFromProps(nextProps) {
    const { msg } = nextProps.candidate;
    if (msg !== undefined) {
    }
    return null;
  } 
async  componentDidMount(){
  if(this.props.navigation.state.params.isEditing==true){
    this.setState({bottomBotton:'UPDATE'})
    this.props.change('from',this.props.navigation.state.params.candidateDataToUpdate.candidate.data.from);
        this.props.change("sender_mail",this.props.navigation.state.params.candidateDataToUpdate.candidate.data.sender_mail);
        this.props.change("mobile_no",this.props.navigation.state.params.candidateDataToUpdate.candidate.data.mobile_no);
        this.props.change("resume_file",[])
        this.setState({SelectJOb:this.props.appliedJob.job_profile,resumeUpdate:'no',jobId:this.props.navigation.state.params.jobDetail.id,
        forvali:true
        
      })
    }else{
      this.setState({resumeUpdate:'yes',forvali:false})
      const candidateJob = await getItem("mongo_id");
      if(this.props.navigation.state.params.isCandidate ==true && candidateJob ){
          Alert.alert(
            "Alert",
            "Not allowed,You are already in",
             [
            {
              text: "Ok",
              onPress: () =>this.props.navigation.goBack()
              
            }
          ]);
        }
      }
    // FCM.requestPermissions();
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken,'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL');
      this.setState({fcm_token_Id:fcmToken})
        // user has a device token
    }
    // FCM.getFCMToken().then(token => {
    //   this.setState({fcm_token_Id:token})
    //   this.setState({deviceId: DeviceInfo.getUniqueID()})
    // });
    // FCM.getInitialNotification().then(notif => {
    // });
  }
  sendRemote(notif) {
    FCM.presentLocalNotification({
      data: {
        type:"MEASURE_CHANGE",
        custom_notification: {
          body: "test body",
          title: "test title",
          color:"#00ACD4",
          priority:"high",
          icon:"ic_notif",
          group: "GROUP",
          id: "id",
          show_in_foreground: true
        }
      }
    });
  }

  setCandidateProfile = async () => {
    const candidateJob = await getItem("mongo_id");
    this.setState({freshDate:candidateJob})
    if (this.state.freshDate !=='') {
      this.setState({mongo_id:this.state.freshDate.candidate.data._id,profile_picture:this.state.freshDate.candidate.data.profilePicture})
        let email = this.state.freshDate.candidate.data.sender_mail;
        let profile_pic = `https://pikmail.herokuapp.com/${email}?size=60`;
        let mobile_no = this.state.freshDate.candidate.data.mobile_no;
        let userName = this.state.freshDate.candidate.data.from;
        let candidateJobb=this.state.freshDate
        await this.props.getCandidateJobDetails(this.state.freshDate.candidate.data._id);
        this.setState({
          candidateJobb,
          profile_pic,
          userName,
          mobile_no,
          linkOpening: false,
          notification: "",
          sender_mail:this.state.freshDate.candidate.data.sender_mail
        });
        const { appliedJob } = this.props;
        const {
          linkOpening,
          textColor,
          candidateJob,
          ...profileDetails
        } = this.state;
                this.setState({updating:false})
                Alert.alert(
                  "Thank You",
                  "Your profile has updated successfully!",
                  [
                    {
                      text: "OK",
                      onPress: () =>
                      this.props.navigation.navigate("Profile", {
                        appliedJob,
                        profileDetails,
                        sender_mail:this.state.sender_mail,
                        mongo_id:this.state.mongo_id,
                        profile_picture:this.state.profile_picture
                      })
                    }
                  ]
                );
      }
}
exitingCandidate = async () => {
  const candidateJob = await getItem("mongo_id");
  if (candidateJob !=='') {
    this.setState({mongo_id:candidateJob.candidate.data._id,profile_picture:candidateJob.candidate.data.profilePicture})
      let email = candidateJob.candidate.data.sender_mail;
      let profile_pic = `https://pikmail.herokuapp.com/${email}?size=60`;
      let mobile_no = candidateJob.candidate.data.mobile_no;
      let userName = candidateJob.candidate.data.from;
      await this.props.getCandidateJobDetails(candidateJob.candidate.data._id);
      this.setState({
        candidateJob,
        profile_pic,
        userName,
        mobile_no,
        linkOpening: false,
        notification: "",
        sender_mail:candidateJob.candidate.data.sender_mail
      },()=>{
        const { appliedJob } = this.props;
        const {
          linkOpening,
          textColor,
          candidateJob,
          ...profileDetails  
        } = this.state;
        this.props.navigation.navigate("Profile", {
          appliedJob,
          profileDetails,
          sender_mail:this.state.sender_mail,
          mongo_id:this.state.mongo_id,
          profile_picture:this.state.profile_picture
        });
        this.setState({valiSpinner:false})   
      });     
    }
}
  componentDidUpdate() {
    const { candidate} = this.props;
    if(this.props.candidateValidation.data !== undefined && this.props.candidateValidation.data !==null){
      if(this.state.isExisting){
        this.setdata()
        this.setState({isExisting:false})
      }}else if(this.props.candidateValidation.data === null){
        if(this.state.isExisting){
        this.setState({forvali:true,isExisting:false,valiSpinner:false,isExistUser:false,bottomBotton:'JOIN NOW',emailVefication:false})
      }      
        }
    if (candidate.data !== undefined && this.props.navigation.state.params.isEditing ==false && this.props.navigation.state.params.addCandidate ==true) {
      if (candidate.data.candidate_status === true ) {
        setItem("mongo_id", JSON.stringify({ candidate }));
        this.props.navigation.setParams({ addCandidate: false});
        if(this.state.haveData==true){
      this.setState({adding:false,haveData:false})
        }
        Alert.alert(
          "Thank You",
          "Wait for the confirmation of your registration from HR.",
          [
            {
              text: "OK",
              onPress: () =>
              this.props.navigation.navigate("HomePage", {
                applied: true
              })
            }
          ],
          { cancelable: false }
        );
      }
    }
      else if(this.state.updateData==true){
        if(candidate.data.candidate_status === true){
        setItem("mongo_id", JSON.stringify({ candidate }))
        this.setCandidateProfile();
         this.setState({updateData:false})
        }
      }

    const { success, msg } = this.props.candidate;
    if (success !== undefined && msg !== undefined) {
      if (success === false) {
        Alert.alert(
          "Alert",
          msg,
          [
            {
              text: "OK",
              onPress: () => this.props.navigation.navigate('HomePage')
            }
          ],
          { cancelable: false }
        );
      }
    }
  }
  renderField(props) {
    const { input, ...inputProps } = props;
    const {
      meta: { touched, error, active }
    } = props;
    const underLineColor = active ? COLOR.MUSTARD : COLOR.PURPLE
    const {updateValue} =props
    const {newValue,isEditing,name}=props
    return (
      <Fragment >
        <Item stackedLabel style={[_styles.inputTextView]}>
          <Label style={_styles.labelText}>{props.labelName}</Label>
          <Input
            style={styles.inputText}
            {...inputProps}
            onChangeText={ input.onChange
            }
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            value={input.value}
            placeholderTextColor={COLOR.WHITE}
            selectionColor={COLOR.LTONE}
            underlineColorAndroid={underLineColor}
            editable={props.emailVefication}
          />
        </Item>
        <View style={_styles.errorTextView}>
          {touched && error && <Text style={_styles.errorText}>{error}</Text>}
        </View>
      </Fragment>
    );
  }
  SelectJOb=(i,title,id)=>{
      this.setState({SelectJOb:title,isJobEmpty:true,jobId:id})
  }
  renderJobField(props) {
    const { input, ...inputProps, } = props;
    const {
      meta: { touched, error, active }
    } = props;
    let renderJobTitle = props.params.currentJob.map((title,i)=>{
      let check;
      let toSElect;
      if(props.isEditing !==true){
      if (title.title == props.params.jobDetail.title){
        check = true;
      }
    }else {
      check =false;
    }
      return (
        <CustomButton
          btnStyle={check || props.SelectJObTitle === title.title ? _styles.jobTitleBtn:_styles.defaultJobBtn}
          btnTextStyle={check || props.SelectJObTitle === title.title ? _styles.checkedBtnText : _styles.uncheckedBtnText} 
          key={i}
          onPress={props.isEditing !==true ? console.log('no action') :
           ()=>  props.SelectJOb(i,title.title,title.id)}
          text={title.title}
          type="rounded"
        />
      )
    })
    return (
      <Fragment>
        <View style={_styles.jobTitleView}>
          <Text numberOfLines={1} style={[_styles.text,_styles.jobTitleText]}>
            JOB TITLE
          </Text>
            { !props.isJobEmpty &&   <Text style={{color:'red',fontSize:12,fontFamily:'Montserrat-SemiBold',marginLeft:7}}> Please! Select Any Job</Text>}
        </View>
        <View style={_styles.jobTitleBtnView}>
          {renderJobTitle}
        </View>
      </Fragment>
    );
  }
  renderPicker({
    input: { onChange, value, ...inputProps },
    children,
    ...pickerProps
  }) {
    const {
      meta: { touched, error }
    } = pickerProps;
    return (
      <Fragment>
        <View style={_styles.picker}>
          <Picker
            selectedValue={value}
            onValueChange={value => {
              requestAnimationFrame(() => {
                onChange(value);
              });
            }}
            {...inputProps}
            {...pickerProps}
          >
            {children}
          </Picker>
        </View>
        <View style={_styles.errorTextView}>
          {touched && error && <Text style={_styles.errorText}>{error}</Text>}
        </View>
      </Fragment>
    );
  }
  renderButtonField(props) {
    const { onPress, resumeError, input, onClosePress } = props;
    if(props.forEditing ==true){

    }
    const resumeContainer = input.map((data, i) => {
      return (
          <View key={i} style={_styles.uploadSection}>
          <Text numberOfLines={1} style={_styles.fileName}>
            {data.fileName}
          </Text>
          <Button
            transparent
            onPress={() => {
              onClosePress(i);
            }}
            style={{ marginTop: 5 }}
          >
            <Icon style={_styles.closeIcon} name="close" />
          </Button>
        </View>
      );
    });
    return (
      <Fragment>
       {props.forEditing ==true && 
       <View style={{marginLeft:10,flex:1,flexDirection:'row'}}>
       <Text style={{color:COLOR.TURQUOISE,marginTop:7,fontFamily:'Montserrat-Medium',fontSize:10,marginRight:25,marginLeft:4,marginTop:16}} >WANT TO UPDATE YOUR RESUME  ?</Text>
   <CustomButton
          btnStyle={props.resumeUpdate=='yes' ? _styles.jobTitleBtn : _styles.defaultJobBtn}
          btnTextStyle={props.resumeUpdate=='yes'? _styles.checkedBtnText : _styles.uncheckedBtnText} 
          text='Yes'
          type="rounded"
          onPress={()=>props.onPresss('yes')}
        />
        <CustomButton
          btnStyle={props.resumeUpdate=='no' ? _styles.jobTitleBtn : _styles.defaultJobBtn}
          btnTextStyle={props.resumeUpdate=='no'? _styles.checkedBtnText : _styles.uncheckedBtnText } 
          text='No'
          type="rounded"
          onPress={()=>props.onPresss('no')}
        />
    </View>}
    { props.resumeUpdate =='yes' && 
      <View style={_styles.resumeView}>
        <View style={_styles.uploadSection}>
          <Text numberOfLines={1} style={[_styles.text,_styles.resumeText]}>
            RESUME
          </Text>
          <Button transparent onPress={onPress} style={_styles.cloudBtn}>
            <Icon style={_styles.uploadIcon} name="cloud-upload" />
          </Button>
        </View>
        {resumeContainer}
        <View style={_styles.errorTextView}>
          {resumeError && (
            <Text style={[_styles.errorText,_styles.resumeErrorText]}>
              {resumeError}
            </Text>
          )}
        </View>
      </View>
    }
      </Fragment>
    );
  }

  onUpdate = async values => {
    if(!__DEV__){
      values.source = 'MobileApp'
      values.sender_mail=this.props.navigation.state.params.candidateDataToUpdate.candidate.data.sender_mail
    }
    const { params } = this.props.navigation.state;
    values["fileNames"] = [];
    if(this.state.resumeUpdate=='yes'){
    if (this.state.resumeData.length >= 1 ) {
      this.state.resumeData.map((data, i) => {
        values[`file${i + 1}`] = data.dataBase64;
        values["extention"] = data.filetype;
        values["fileNames"].push(`file${i + 1}`);
        values["default_tag"] = params.jobDetail.default_id;
        values["tag_id"] = this.state.jobId;
        values['device_id']=this.state.fcm_token_Id,
        values['_id']=this.props.navigation.state.params.mongo_id,
        values['jobtitle']=this.state.SelectJOb
      });
      if(this.state.SelectJOb==''){
       this.setState({isJobEmpty:false})
      }
      else{
        this.setState({updating:true})
    await this.props.addCandidate(values)
      this.setState({updateData:true})
      }
    } 
    else {
      this.setState({ resumeError: "Upload your resume" });
    }
  }
  else{
    values["fileNames"].push(`file${1 + 1}`);
    values["default_tag"] = params.jobDetail.default_id;
    values["tag_id"] = this.state.jobId;
    values['device_id']=this.state.fcm_token_Id,
    values['_id']=this.props.navigation.state.params.mongo_id,
    values['jobtitle']=this.state.SelectJOb
    if(this.state.SelectJOb==''){
      this.setState({isJobEmpty:false})
     }
     else{
       this.setState({updating:true})
   await this.props.addCandidate(values)
     this.setState({updateData:true})
     }
  }
}

  onSubmit = async values => {
    if(!__DEV__){
      values.source = 'MobileApp'
    }
    const { params } = this.props.navigation.state;
    values["fileNames"] = [];
    if (this.state.resumeData.length >= 1) {
      this.state.resumeData.map((data, i) => {
        values[`file${i + 1}`] = data.dataBase64;
        values["extention"] = data.filetype;
        values["fileNames"].push(`file${i + 1}`);
        values["default_tag"] = params.jobDetail.default_id;
        values["tag_id"] = params.jobDetail.id;
        values['device_id']=this.state.fcm_token_Id
      });
      this.setState({adding:true,haveData:true})
      this.props.addCandidate(values);
    } else {
      this.setState({ resumeError: "Upload your resume" });
    }
  };

  askStoragePermission = async () =>{
    await Permissions.request('storage').then(response => {
      console.log(response,'per storage')
      return true;
    })
  }
   onResumeAdd = async () => {
     //response is an object mapping type to permission
     if(Platform.OS !== "ios"){
    await Permissions.checkMultiple(['location']).then(response => {
      console.log(response,'check')
      if(response.storage != 'authorized'){
        this.askStoragePermission()
      } else {
        return true;
      }
    })}
    this.props.change({ resume_file: [] });
    let resumeData = this.state.resumeData;
    this.setState({ converting: true });
    if (Platform.OS !== "ios") {
      //Android Only
      DocumentPicker.show(
        {
          filetype: [DocumentPickerUtil.allFiles()]
        },
        (error, res) => {
          console.log(res);
          
          SplashScreen.hide();
          this.scroll.scrollToEnd()
          this.setState({whenAddedResume:true})
          if (res) {
            let check =
              this.state.resumeData.length >= 1
                ? this.state.currentType == res.type
                : true;
            if (check) {
              let type = res.type.split("/");
              RNFetchBlob.fs.readFile(res.uri, "base64").then(
                data => {
                  resumeData.push({
                    fileName: res.fileName,
                    dataBase64: data,
                    filetype: type[1]
                  });
                  let base64 = require('base-64');
                  let decodedData = base64.decode(data);
                  let bytes = decodedData.length;
                  let fileSizeInMB=(bytes / 1000000)
                  if(fileSizeInMB > 2 ){
                    alert("File size can't be larger than 2MB");
                  }
                  this.setState({
                    converting: false,
                    resumeData,
                    currentType: res.type
                  });
                },
                error => {
                  // console.log(error,'asdas')
                  this.setState({ converting: false });
                }
              );
            } else {
              this.setState({ converting: false, resumeError: null });
              alert("Please select same format for files");
            }
          } else {
            this.setState({ converting: false, resumeError: null });
          }
        }
      );
    } else {
      DocumentPicker.show(
        {
          filetype: [DocumentPickerUtil.allFiles()]
        },
        (error, res) => {
          SplashScreen.hide();
          this.scroll.scrollToEnd()
          this.setState({whenAddedResume:true})
          if (res) {
            let check =
              this.state.resumeData.length >= 1
                ? this.state.currentType == res.type
                : true;
              let type = res.type
              RNFS.readFile(res.uri, "base64").then(
                data => {
                  console.log(data, 'base64');
                  resumeData.push({
                    fileName: res.fileName,
                    dataBase64: data,
                    filetype: type[1]
                  });
                  let base64 = require('base-64');
                  let decodedData = base64.decode(data);
                  let bytes = decodedData.length;
                  let fileSizeInMB=(bytes / 1000000)
                  if(fileSizeInMB > 2 ){
                    alert("File size can't be larger than 2MB");
                  }
                  this.setState({
                    converting: false,
                    resumeData,
                    currentType: res.type
                  });
                },
                error => {
                  // console.log(error,'asdas')
                  this.setState({ converting: false });
                }
              );
            } else {
              this.setState({ converting: false, resumeError: null });
              alert("Please select same format for files");
            }
        }
      );
    }
  };

  onClosePress = i => {
    if (!this.state.converting) {
      let resumeData = this.state.resumeData;
      resumeData.splice(i, 1);
      this.setState({ resumeData });
    }
  };
  handleSubmit=(props)=>{
   const {input}=props
    return(
     <Text>rberbrbeber</Text>
    )
  }
  forResumeUploading=(value)=>{
        this.setState({resumeUpdate:value})
        if(value=='yes'){
        this.scroll.scrollToEnd()
        }
  }
  setdata=async ()=>{
    const candidate =this.props.candidateValidation
   await setItem("mongo_id", JSON.stringify({ candidate }))
    this.exitingCandidate();
  }
  emailValidation=(values)=>{
    this.props.candidateValidationapi(values.sender_mail,this.state.fcm_token_Id)
    this.setState({isExisting:true,valiSpinner:true})
  }
  toAddCandidate=(values)=>{
      if(this.state.bottomBotton=='JOIN'){
        this.emailValidation(values)
      }
      else if(this.state.bottomBotton == 'JOIN NOW'){
          this.onSubmit(values)
      }
      else{
        this.onUpdate(values);
      }
  }
  render() 
  {         
    const { handleSubmit } = this.props;
    const { converting, resumeData, resumeError ,updating,adding,valiSpinner,forvali} = this.state;
    return (
      <Container style={styles.container}>
        <LinearGradient style={styles.linearGradientView} colors={[COLOR.LGONE, COLOR.LGTWO]} >
          <ScrollView 
          contentHeight ={1000}
          contentContainerStyle={{flex:0}}
         ref={(scroll) => {this.scroll = scroll}}
          overScrollMode ='never'
          >
          <Content padder>
          <Grid>
            <Row style={[styles.logoView,{marginTop:-40}]}>
              <Logo />
            </Row>
            <Row style={{justifyContent:'center',marginTop:-30, marginBottom:25}}>
              <View style={styles.descriptionText}>
                <Text style={_styles.acquaintedTitle}>Let's get acquainted</Text>
                  <Text style={_styles.acquaintedDescription}>
                    Let’s get acquainted Excellence Technologies gathers data to ensure 
                    the accuracy of the information we are providing for you as well as 
                    the security of business for employers and workers.
                </Text>
              </View>
            </Row>
            <Row>
              <View style={styles.blockView}>
                <Form onSubmit={handleSubmit(this.handleSubmit)}>
             {this.props.navigation.state.params.isEditing !==true &&  <Field
                  name="sender_mail"
                  labelName="EMAIL"
                  keyboardType="email-address"
                  component={this.renderField}
                  autoCapitalize="none"
                  emailVefication={this.state.emailVefication}
                />}
             {forvali &&
              <Field
                  name="from"
                  labelName="NAME"
                  component={this.renderField}
                  params={this.props.navigation.state.params}
                   />
                    }
               {forvali && 
               <Field
                  name="mobile_no"
                  labelName="PHONE"
                  component={this.renderField}
                  keyboardType="numeric"
                   />
                    } 
               {forvali &&
                <Field
                  name="mobile_no"
                  labelName="JOB TITLE"
                  component={this.renderJobField}
                  keyboardType="numeric"
                  params={this.props.navigation.state.params}
                  SelectJOb={(i,title,id)=>this.SelectJOb(i,title,id)}
                  SelectJObTitle={this.state.SelectJOb}
                  isEditing={this.props.navigation.state.params.isEditing}
                  isJobEmpty={this.state.isJobEmpty}
                />
                 }
               {forvali && 
               <Field
                  name="resume_file"
                  placeholder="Mobile number"
                  onPress={() => {
                    this.onResumeAdd();
                  }}
                  onClosePress={i => {
                    this.onClosePress(i);
                  }}
                  component={ this.renderButtonField}
                  input={resumeData}
                  resumeError={resumeError}
                  onPresss={(value)=>this.forResumeUploading(value)}
                  resumeUpdate={this.state.resumeUpdate}
                  forEditing={this.props.navigation.state.params.isEditing}
                />
                }
                </Form>
              </View>
            </Row>
          </Grid>
          </Content>
          </ScrollView>
        {adding || converting || updating ||valiSpinner ? (
          <Spinner color={COLOR.MUSTARD} />
        ) : (
          <CustomButton
          textColor={{color:COLOR.LGONE}} style={{backgroundColor:COLOR.MUSTARD}}
          btnStyle={_styles.joinNowBtn}
          btnTextStyle={_styles.joinNowBtnText}
          text={this.state.bottomBotton}
          onPress={handleSubmit(this.toAddCandidate)}
          />
        )}
        </LinearGradient>
      </Container>
    );
  }
}
validate = values => {  
  const errors = {};
  if (!values.from) {
    errors.from = "Cannot be Empty";
  }

  if (!values.sender_mail) {
    errors.sender_mail = "Cannot be Empty";
  } else if (!isEmail(values.sender_mail) || !isLowercase(values.sender_mail)) {
    errors.sender_mail = "Enter a valid email and must be in lowercase";
  }
  if (!values.gender) errors.gender = "Select a gender";
  if (!values.mobile_no) {
    errors.mobile_no = "Cannot be Empty";
  } else if (!isMobilePhone(values.mobile_no, "en-IN")) {
    errors.mobile_no = "Enter valid phone number";
  }
  return errors;





    
};

const mapStateToProps = (state ) =>{
  // console.log(state,'77');
 return{
  candidateValidation:state.candidateValidation,
 candidate:state.candidate,
 appliedJob:state.appliedJob,
 candidateProfileUpdateDetails:state.candidateProfileUpdateDetails
};
}
export default reduxForm({
  form: "AddCandidate",
  validate,
  initialized : true,
  enableReinitialize:true,
})(
  connect(
    mapStateToProps,
    {addCandidate,UploadProfile,candidateUploadProfile,getCandidateUpdateProfileDetails,getCandidateJobDetails,candidateValidationapi}
  )(AddCandidate)
);
