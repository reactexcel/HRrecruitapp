import React, { Component, Fragment } from "react";
import { View, Alert, Platform, PermissionsAndroid } from "react-native";
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
import { Col, Row, Grid } from "react-native-easy-grid";
import { reduxForm, Field } from "redux-form";
import { isEmail, isMobilePhone, isLowercase } from "validator";
import Logo from "../components/Logo";
import CustomButton from "../components/CustomButton";
import HorizontalLine from "../components/HorizontalLine";
import styles from "../styles";
import _styles from "../styles/AddCandidate";
import { COLOR } from "../styles/color";
import { notify } from "../helper/notify";
import { connect } from "react-redux";
import { addCandidate } from "../actions";
import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";
import RNFetchBlob from "rn-fetch-blob";
import { setItem, getItem } from "../helper/storage";
import SplashScreen from "react-native-splash-screen";
var _ = require('lodash');
import LinearGradient from "react-native-linear-gradient";


class AddCandidate extends Component {
  constructor() {
    super();
    this.state = {
      converting: false,
      resumeData: [],
      currentType: "",
      resumeError: null
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
      // alert(msg);
    }
    return null;
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
                  setUser: true
                })
            }
          ],
          { cancelable: false }
        );
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
              onPress: () => this.props.navigation.popToTop()
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
    return (
      <Fragment>
        <Item stackedLabel style={_styles.inputTextView}>
          <Label style={{ color: COLOR.LTONE,fontFamily:"Montserrat-Medium"}}>{props.labelName}</Label>
          <Input
            style={styles.inputText}
            {...inputProps}
            onChangeText={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            value={input.value}
            placeholderTextColor={COLOR.WHITE}
            selectionColor={COLOR.Grey}
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
          btnTextStyle={check ? { fontSize: 11, color: 'black',fontFamily:"Montserrat-Medium" } : { fontSize: 11, color:COLOR.WHITE,fontFamily:"Montserrat-Medium" }}
          key={i}
          onPress={()=>{console.log()}}
          text={title.title}
          type="rounded"
        />
      )
    })
    return (
      <Fragment>
        <View style={{margin: 6, marginBottom:10}}>
          <Text numberOfLines={1} style={[_styles.text,{alignSelf:'flex-start',fontFamily:"Montserrat-Medium"}]}>
            JOB TITLE
          </Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap:'wrap', marginLeft:15}}>
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
      <View style={{marginLeft:8}}>
        <View style={_styles.uploadSection}>
          <Text numberOfLines={1} style={[_styles.text,{fontFamily:"Montserrat-Medium"}]}>
            RESUME
          </Text>
          <Button transparent onPress={onPress} style={{ marginTop: 5 }}>
            <Icon style={_styles.uploadIcon} name="cloud-upload" />
          </Button>
        </View>
        {resumeContainer}
        <View style={_styles.errorTextView}>
          {resumeError && (
            <Text style={[_styles.errorText, { marginLeft: 8 }]}>
              {resumeError}
            </Text>
          )}
        </View>
      </View>
      </Fragment>
    );
  }

  onSubmit = async values => {
    const { params } = this.props.navigation.state;
    values["fileNames"] = [];
    if (this.state.resumeData.length >= 1) {
      this.state.resumeData.map((data, i) => {
        values[`file${i + 1}`] = data.dataBase64;
        values["extention"] = data.filetype;
        values["fileNames"].push(`file${i + 1}`);
        values["default_tag"] = params.jobDetail.default_id;
        values["tag_id"] = params.jobDetail.id;
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

  render() {
    const { handleSubmit } = this.props;
    const { adding } = this.props.candidate;
    const { converting, resumeData, resumeError } = this.state;
    return (
      <Container style={styles.container}>
        <LinearGradient style={{flex:1}} colors={[COLOR.LGONE, COLOR.LGTWO]} >
          <Content padder>
          <Grid>
            <Row style={[styles.logoView,{marginTop:-40}]}>
              <Logo />
            </Row>
            <Row style={{justifyContent:'center',marginTop:-30, marginBottom:25}}>
              <View style={styles.descriptionText}>
                <Text style={{ textAlign: "center", fontSize: 12,  color: COLOR.WHITE,fontFamily:"Montserrat-SemiBold"}}>Let's get acquainted</Text>
                  <Text style={{ textAlign: 'center', color: COLOR.WHITE,fontSize:9.67,fontFamily:"Montserrat-Regular"}}>
                    Let’s get acquainted Excellence Technologies gathers data to ensure 
                    the accuracy of the information we are providing for you as well as 
                    the security of business for employers and workers.
                </Text>
              </View>
            </Row>
            <Row>
              <View style={styles.blockView}>
                <Form>
                <Field
                  name="sender_mail"
                  labelName="EMAIL"
                  keyboardType="email-address"
                  component={this.renderField}
                  autoCapitalize="none"
                />
                <Field
                  name="from"
                  labelName="NAME"
                  component={this.renderField}
                />
                {/* <Field
                  name="gender"
                  component={this.renderPicker}
                  mode="dropdown"
                >
                  <Item label="Select gender" value="" />
                  <Item label="Female" value="female" />
                  <Item label="Male" value="male" />
                </Field> */}

                <Field
                  name="source"
                  labelName="SOURCE"
                  component={this.renderField}
                />
                <Field
                  name="mobile_no"
                  labelName="PHONE"
                  component={this.renderField}
                  keyboardType="numeric"
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
        </LinearGradient>
        {adding || converting ? (
          <Spinner color={COLOR.Spinner} />
        ) : (
            <CustomButton
              btnStyle={{ backgroundColor: COLOR.MUSTARD}}
              btnTextStyle={{color:'black',fontFamily:"Montserrat-Bold"}}
              text="JOIN NOW"
              onPress={handleSubmit(this.onSubmit)}
            />
          )}
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
  if (!values.source) errors.source = "Cannot be Empty";
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
  validate
})(
  connect(
    mapStateToProps,
    { addCandidate }
  )(AddCandidate)
);
