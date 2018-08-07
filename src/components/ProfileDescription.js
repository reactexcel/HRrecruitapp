import React, { Fragment } from "react";
import { StyleSheet } from "react-native";
import { View, Text, Button, Icon } from "native-base";
import { COLOR } from "../styles/color";
import ProfileBlock from "./ProfileBlock";
import StepIndicator from "react-native-step-indicator";

const ProfileDescription = props => {
  const labels = [
    "CV Sent",
    "CV Received",
    "CV Shortlisted",
    "Take Online Test",
    props.result
    //   "#2a365f"
  ];
  const customStyles = {
    stepIndicatorSize: 10,
    currentStepIndicatorSize: 10,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: COLOR.MUSTARD,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: COLOR.MUSTARD,
    stepStrokeUnFinishedColor: "#7d7885",
    separatorFinishedColor: COLOR.MUSTARD,
    separatorUnFinishedColor: "#7d7885",
    stepIndicatorFinishedColor: COLOR.MUSTARD,
    stepIndicatorUnFinishedColor: "#7d7885",
    stepIndicatorCurrentColor: COLOR.MUSTARD,
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: "transparent",
    stepIndicatorLabelFinishedColor: "transparent",
    stepIndicatorLabelUnFinishedColor: "transparent",
    labelColor: "#7d7885",
    labelSize: 10,
    currentStepLabelColor: COLOR.MUSTARD
  };
  return (
    <Fragment>
      <ProfileBlock title="JOB TITLE">
        <Text style={styles.textStyle}>Jr. Web Developer</Text>
      </ProfileBlock>
      <ProfileBlock title="JOB DESCRIPTION">
        <Text style={styles.textStyle}>
          Web Developer - Experience in PHP,MySQL, HTML, CSS, jQuery is
          required. Experience in React, Angular, Magento is added benefit
        </Text>
      </ProfileBlock>
      <ProfileBlock title="APPLICATION STATUS">
        <View style={{ marginBottom: 10 }} />
        <StepIndicator
          customStyles={customStyles}
          currentPosition={props.currentPosition}
          labels={labels}
        />
      </ProfileBlock>
      <ProfileBlock title="EXCELLENCE TECHNOLOGIES" showBorder={false}>
        <View style={styles.btnView}>
          <Button
            iconLeft
            rounded
            style={{ backgroundColor: "transparent" }}
            onPress={props.handleLocate}
          >
            <Icon
              name="map-pin"
              type="FontAwesome"
              style={{ color: COLOR.PINK }}
            />
            <Text>Location</Text>
          </Button>
          <Button iconLeft rounded style={styles.aboutBtn}>
            <Icon name="volume-up" style={{ color: COLOR.PINK }} />

            <Text>About Us</Text>
          </Button>
        </View>
      </ProfileBlock>
    </Fragment>
  );
};
ProfileDescription.defaultProps = {
  result: "Result"
};

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    marginTop: 6
  },
  btnView: {
    flex: 1,
    flexDirection: "row",
    marginTop: 6
  },
  aboutBtn: {
    backgroundColor: "transparent",
    marginHorizontal: 10
  }
});
export default ProfileDescription;
