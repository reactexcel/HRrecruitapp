import React, { Fragment } from "react";
import { View, Text, Button, Icon, Form, Item, Input } from "native-base";
import { COLOR } from "../styles/color";
import ProfileBlock from "./ProfileBlock";
import StepIndicator from "react-native-step-indicator";
import { customStyles } from "../helper/constant";
import styles from "../styles/components/ProfileDescription";
import { connect } from "react-redux";
import {Dimensions} from 'react-native';
const  {height, width} = Dimensions.get('window');
const h=height/100;
const ProfileDescription = props => {

  const labels = [
    "CV Sent",
    "First Round",
    "Second Round",
    "Third Round",
    props.appliedJob.status === "Selected" ||
    props.appliedJob.status === "Reject"
      ? props.appliedJob.status
      : "Result"
  ];
  const {
    appliedJob: { job_profile, job_description }
  } = props;
  let profile_status = 0;
  let activiColor = "#7d7885";
  let FirstRound = "#7d7885";
  let SecondRound = "#7d7885";
  let ThirdRound = "#7d7885";
  let Result = "#7d7885";
  let status_color = COLOR.MUSTARD;
  if (props.appliedJob.status === "First Round") {
    profile_status = 1;
    FirstRound = COLOR.MUSTARD;
  } else if (props.appliedJob.status === "Second Round") {
    profile_status = 2;
    FirstRound = COLOR.MUSTARD;
    SecondRound = COLOR.MUSTARD;
  } else if (props.appliedJob.status === "Third Round") {
    profile_status = 3;
    FirstRound = COLOR.MUSTARD;
    SecondRound = COLOR.MUSTARD;
    ThirdRound = COLOR.MUSTARD;
  } else if (props.appliedJob.status === "Reject") {
    profile_status = 4;
    status_color = COLOR.PINK;
    FirstRound = COLOR.PINK;
    SecondRound = COLOR.PINK;
    ThirdRound = COLOR.PINK;
    Result = COLOR.PINK;
  } else if (props.appliedJob.status === "Selected") {
    profile_status = 4;
    status_color = "green";
    FirstRound = "green";
    SecondRound = "green";
    ThirdRound = "green";
    Result = "green";
  }

  return (
    // <View style={{height:400}}>
    <Fragment>
      <ProfileBlock title="JOB TITLE">
        <Text style={styles.textStyle}>{job_profile}</Text>
        {/* <Form>
          <Item>
            <Input editable={props.isEditing==false ? false :true} onChangeText={(e)=>props.onChange(e)} value={props.isEditing==false ? job_profile : props.job_profile} />
          </Item>
        </Form> */}
      </ProfileBlock>
      <ProfileBlock title="JOB DESCRIPTION">
        <Text style={styles.textStyle}>{job_description}</Text>
      </ProfileBlock>
      <ProfileBlock title="APPLICATION STATUS">
        <View style={{ marginBottom: 10 }} />
        <StepIndicator
          customStyles={{
            stepIndicatorSize: 10,
            currentStepIndicatorSize: 10,
            separatorStrokeWidth: 1,
            currentStepStrokeWidth: 2,
            stepStrokeWidth: 3,
            currentStepIndicatorLabelFontSize: 0,
            stepIndicatorLabelFontSize: 0,
            labelSize: 10,
            stepStrokeUnFinishedColor: "#7d7885",
            separatorUnFinishedColor: "#7d7885",
            stepIndicatorUnFinishedColor: "#7d7885",
            stepStrokeCurrentColor: status_color,
            separatorFinishedColor: status_color,
            currentStepLabelColor: status_color,
            stepStrokeFinishedColor: status_color,
            stepIndicatorFinishedColor: status_color,
            stepIndicatorCurrentColor: status_color,
            stepIndicatorLabelCurrentColor: "red",
            stepIndicatorLabelFinishedColor: "red",
            stepIndicatorLabelUnFinishedColor: "red",
            labelColor: activiColor
          }}
          currentPosition={profile_status}
          // labels={labels}
        />
        <View style={{ flexDirection: "row", marginLeft: 15 }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "500",
              color: status_color,
              marginRight: 23
            }}
          >
            CV Sent
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "500",
              color: FirstRound !== "#7d7885" ? FirstRound : "#7d7885",
              marginRight: 7
            }}
          >
            First Round
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "500",
              color: SecondRound !== "#7d7885" ? SecondRound : "#7d7885",
              marginRight: 7
            }}
          >
            Second Round
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "500",
              color: ThirdRound !== "#7d7885" ? ThirdRound : "#7d7885",
              marginRight: 23
            }}
          >
            Third Round
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "500",
              color: Result !== "#7d7885" ? Result : "#7d7885"
            }}
          >
            {props.appliedJob.status === "Selected" ||
            props.appliedJob.status === "Reject"
              ? props.appliedJob.status
              : "Result"}
          </Text>
        </View>
      </ProfileBlock>
      <ProfileBlock title="EXCELLENCE TECHNOLOGIES" showBorder={false}>
        <View style={[styles.btnView, { paddingBottom:h+8+'%' }]}>
          <Button
            iconLeft
            rounded
            style={{
              backgroundColor: "transparent",
              borderWidth: 4,
              borderColor: "rgba(52, 66, 116, 1)",
              shadowOffset: { height: 0, width: 0 },
              shadowOpacity: 0,
              elevation:0
              // opacity:0.5
            }}
            onPress={props.handleLocate}
          >
            <Icon
              name="map-pin"
              type="FontAwesome"
              style={{ color: COLOR.PINK }}
            />
            <Text uppercase={false} style={styles.btnText}>
              Location
            </Text>
          </Button>
          <Button
            onPress={props.aboutus}
            iconLeft
            rounded
            style={styles.aboutBtn}
          >
            <Icon name="volume-up" style={{ color: COLOR.PINK }} />
            <Text uppercase={false} style={styles.btnText}>
              About Us
            </Text>
          </Button>
        </View>
      </ProfileBlock>
    </Fragment>
  );
};
ProfileDescription.defaultProps = {
  result: "Result"
};

const mapStateToProps = state => ({
  data: state
});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDescription);
