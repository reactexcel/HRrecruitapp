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
import FCM,{FCMEvent} from 'react-native-fcm'
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
import { addCandidate } from "../actions";
import { getJobLists } from "../actions";
import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";
import RNFetchBlob from "rn-fetch-blob";
import { setItem, getItem } from "../helper/storage";
import SplashScreen from "react-native-splash-screen";
import LinearGradient from "react-native-linear-gradient";


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
      userName:'',
      mobile_no:'',
      job_profile:'',
      name:''
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
  // componentWillMount(){
  //   alert('vlkdbvdb')
  // }
  //  console.log(this.props.navigation.state.params.appliedJob.job_profile
  //   ,this.props.navigation.state.params.profileDetails.userName,this.props.navigation.state.params.profileDetails.mobile_no ,'hhhhhhhhhhhhhhhhhhhhh');
  componentDidMount(){
    // this.setState({userName:this.props.navigation.state.params.profileDetails.userName
    // ,mobile_no:this.props.navigation.state.params.profileDetails.mobile_no,
    // job_profile:this.props.navigation.state.params.appliedJob.job_profile})
    // console.log(this.state.mobile_no,this.state.userName,this.state.job_profile,'DDDDDDDDDDDDDDDDDDDDDDDD');
    FCM.requestPermissions();
    FCM.getFCMToken().then(token => {
      this.setState({fcm_token_Id:token})
      this.setState({deviceId: DeviceInfo.getUniqueID()})
    });
    FCM.getInitialNotification().then(notif => {
    });
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
  componentDidUpdate() {
    const { candidate } = this.props;
    if (candidate.data !== undefined) {
      if (candidate.data.candidate_status === true) {
        setItem("mongo_id", JSON.stringify({ candidate }));
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
      // else if(candidate == true){
      //   this.props.navigation.navigate("HomePage", {
      //     applied: true
      //   })
      // }
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
    // this.setState({name:updateValue})
    return (
      <Fragment>
        <Item stackedLabel style={_styles.inputTextView}>
          <Label style={_styles.labelText}>{props.labelName}</Label>
          <Input
            style={styles.inputText}
            {...inputProps}
            onChangeText={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            value={/* updateValue !=='' ? updateValue : */ input.value}
            placeholderTextColor={COLOR.WHITE}
            selectionColor={COLOR.LTONE}
            underlineColorAndroid={underLineColor}
          />
        </Item>
        <View style={_styles.errorTextView}>
          {touched && error && <Text style={_styles.errorText}>{error}</Text>}
        </View>
      </Fragment>
    );
  }
  renderJobField(props) {
    const { input, ...inputProps, } = props;
    const {
      meta: { touched, error, active }
    } = props;
    let renderJobTitle = props.params.currentJob.map((title,i)=>{
      let check;
      if (title.title == props.params.jobDetail.title){
        check = true;
      }
      return (
        <CustomButton
          btnStyle={check? _styles.jobTitleBtn:_styles.defaultJobBtn}
          btnTextStyle={check ? _styles.checkedBtnText : _styles.uncheckedBtnText}
          key={i}
          // onPress={}
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
      </Fragment>
    );
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
      this.props.addCandidate(values);
    } else {
      this.setState({ resumeError: "Upload your resume" });
    }
  };

  onResumeAdd = () => {
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
          SplashScreen.hide();
          this.scroll.scrollToEnd()
          this.setState({whenAddedResume:true})
          if (res) {
            // this.scroll.scrollTo({x:0,y:200,animated:true})
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
      alert("Not implemented in IOS");
      this.setState({ converting: false, resumeError: null });
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
  render() {
  //  console.log(
  //   this.props.navigation.state.params.profileDetails.userName
  //   ,this.props.navigation.state.params.profileDetails.mobile_no,
  //   this.props.navigation.state.params.appliedJob.job_profile,'SSSSSSSSSSSSS')
    const { handleSubmit } = this.props;
    const { adding } = this.props.candidate;
    const { converting, resumeData, resumeError } = this.state;
    return (
      <Container style={styles.container}>
        <LinearGradient style={styles.linearGradientView} colors={[COLOR.LGONE, COLOR.LGTWO]} >
          <ScrollView 
          contentHeight ={500}
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
                <Field
                  name="sender_mail"
                  labelName="EMAIL"
                  keyboardType="email-address"
                  component={this.renderField}
                  autoCapitalize="none"
                  // updateValue={this.props.navigation.state.params.sender_email}
                />
               <Field
                  name="from"
                  labelName="NAME"
                  component={this.renderField}
                  params={this.props.navigation.state.params}
                  // updateValue={this.props.navigation.state.params.profileDetails.userName}
                />
                <Field
                  name="mobile_no"
                  labelName="PHONE"
                  component={this.renderField}
                  keyboardType="numeric"
                  // updateValue={this.props.navigation.state.params.profileDetails.mobile_no}
                  
                />
                <Field
                  name="mobile_no"
                  labelName="JOB TITLE"
                  component={this.renderJobField}
                  keyboardType="numeric"
                  params={this.props.navigation.state.params}
                />
                <Field
                  name="resume_file"
                  placeholder="Mobile number"
                  onPress={() => {
                    this.onResumeAdd();
                  }}
                  onClosePress={i => {
                    this.onClosePress(i);
                  }}
                  component={this.renderButtonField}
                  input={resumeData}
                  resumeError={resumeError}
                />
                </Form>
              </View>
            </Row>
          </Grid>
          </Content>
          </ScrollView>
        {adding || converting ? (
          <Spinner color={COLOR.MUSTARD} />
        ) : (
          <CustomButton
          textColor={{color:COLOR.LGONE}} style={{backgroundColor:COLOR.MUSTARD}}
          btnStyle={_styles.joinNowBtn}
          btnTextStyle={_styles.joinNowBtnText}
          text="JOIN NOW"
          onPress={handleSubmit(this.onSubmit)}
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

const mapStateToProps = ({ candidate }) => ({ candidate });
export default reduxForm({
  form: "AddCandidate",
  // validate
})(
  connect(
    mapStateToProps,
    { addCandidate }
  )(AddCandidate)
);
