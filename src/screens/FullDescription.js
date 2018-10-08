import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { COLOR } from "../styles/color";
import EmptyView from "../components/EmptyView";
import JobSalaryDetails from "../components/JobSalaryDetails";
import { Button, Container, Content, Icon } from "native-base";
import {
  ABOUT_US,
  JOB_DESCRIPTION,
  CANDIDATE_PROFILE,
  JOBDES_TITLE,
  DESIRE_PRO,
  EDU_TITLE,
  KEY_SKILL,
  COM_PRO,
  EXCELLECE_TECH,
  LOG_TO_APPLY,
  SHARE_IT,
  EDUCATION_DES,
  RECRUIT_NAME
} from "../helper/constant";
import styles from "../styles/screens/FullDescription";

class FullDescription extends Component {
  static navigationOptions = {
    headerStyle: {
      elevation: 0,
      backgroundColor: "white"
    },
    title: "Full Description",
    headerTitleStyle: {
      color: "#253055",
      textAlign: "center",
      alignSelf: "center",
      flex: 1,
      fontFamily: "Montserrat-SemiBold"
    },
    headerTintColor: COLOR.PINK,
    headerRight: <View />
  };
  render() {
    const job_title = this.props.navigation.getParam("subject");
    const job_desription = this.props.navigation.getParam("job_description");
    const candidate_profile = this.props.navigation.getParam(
      "candidate_profile"
    );
    const keyword = this.props.navigation.getParam("keyword").split(",");
    return (
      <Container style={styles.container}>
        <Content showsVerticalScrollIndicator={false}>
          <JobSalaryDetails>
            <Text style={styles.jobTitle}>{job_title}</Text>
          </JobSalaryDetails>
          <EmptyView />
          <Text style={styles.headerTextStyle}>{JOBDES_TITLE}</Text>
          <Text style={styles.descriptionText}>{job_desription}</Text>
          <EmptyView />
          <Text style={styles.descriptionText}>{JOB_DESCRIPTION}</Text>
          <EmptyView />
          <Text style={styles.headerTextStyle}>{KEY_SKILL}</Text>
          <View style={styles.keySkillsView}>
            {keyword.map((text, id) => {
              return (
                <Button rounded style={styles.keySkillsButton} key={id}>
                  <Text style={styles.keySkillsButtonText}>{text}</Text>
                </Button>
              );
            })}
          </View>

          <EmptyView />
          <Text style={styles.headerTextStyle}>{DESIRE_PRO}</Text>
          {candidate_profile !== "" ? (
            <Text style={styles.descriptionText}>{candidate_profile} </Text>
          ) : (
            <Text style={styles.descriptionText}>{CANDIDATE_PROFILE}</Text>
          )}

          <EmptyView />
          <Text style={styles.headerTextStyle}>{EDU_TITLE}</Text>
          <Text style={styles.descriptionText}>{EDUCATION_DES}</Text>

          <EmptyView />
          <Text style={styles.headerTextStyle}>{COM_PRO}</Text>
          <EmptyView />
          <Text style={styles.descriptionText}>
            {EXCELLECE_TECH}
            {ABOUT_US}
          </Text>
          <EmptyView />
          <Text style={styles.descriptionText}>{RECRUIT_NAME}</Text>
          <View style={styles.btnView}>
            <Button rounded style={[styles.btnStyle, styles.loginBtnStyle]}>
              <Text style={[styles.btnText, styles.loginTextStyle]}>
                {LOG_TO_APPLY}
              </Text>
            </Button>
            <Button iconLeft rounded style={styles.btnStyle}>
              <Icon name="share" type="Entypo" style={styles.shareIconStyle} />
              <Text style={[styles.btnText, styles.shareTextStyle]}>
                {SHARE_IT}
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default FullDescription;
