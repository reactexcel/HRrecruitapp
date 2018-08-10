import React, { Fragment } from "react";
import { View, Text, Button, Icon } from "native-base";
import { COLOR } from "../styles/color";
import ProfileBlock from "./ProfileBlock";
import StepIndicator from "react-native-step-indicator";
import { customStyles } from "../helper/constant";
import styles from "../styles/components/ProfileDescription";

const ProfileDescription = props => {
  const labels = [
    "CV Sent",
    "CV Received",
    "CV Shortlisted",
    "Take Online Test",
    props.result
  ];

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
            <Text uppercase={false} style={styles.btnText}>
              Location
            </Text>
          </Button>
          <Button iconLeft rounded style={styles.aboutBtn}>
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

export default ProfileDescription;
