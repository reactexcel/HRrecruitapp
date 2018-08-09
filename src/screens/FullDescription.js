import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { COLOR } from "../styles/color";
import JobSalaryDetails from "../components/JobSalaryDetails";
import { Button, Container, Content, Icon } from "native-base";
import { ABOUT_US } from "../helper/constant";
import { KEY_SKILLS } from "../helper/constant";
import styles from "../styles/FullDescription";

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
    return (
      <Container style={styles.container}>
        <Content showsVerticalScrollIndicator={false}>
          <JobSalaryDetails>
            <Text style={styles.jobTitle}>{job_title}</Text>
          </JobSalaryDetails>
          <View style={{ marginVertical: 10 }} />
          <Text style={styles.headerTextStyle}>Job Description</Text>
          <Text style={styles.descriptionText}>{job_desription}</Text>
          <View style={{ marginVertical: 10 }} />
          <Text style={styles.descriptionText}>
            Salary: INR 1,25,000 - 2,00,000 PA{`\n`}
            Industry: IT-Software/Software-Services{`\n`}
            Functional Area: IT Software - Application Programming,Maintenance{`\n`}
            Role Category: Programming & Design{`\n`}
            Role: Software Developer Employment{`\n`}
            Type: Permanent Job, Full Time{`\n`}
          </Text>
          <View style={{ marginVertical: 10 }} />
          <Text style={styles.headerTextStyle}>Keys Skills</Text>
          <View style={styles.keySkillsView}>
            {KEY_SKILLS.map((text, id) => {
              return (
                <Button rounded style={styles.keySkillsButton} key={id}>
                  <Text style={styles.keySkillsButtonText}>{text}</Text>
                </Button>
              );
            })}
          </View>

          <View style={{ marginVertical: 10 }} />
          <Text style={styles.headerTextStyle}>Desired Cadidate Profile</Text>
          <Text style={styles.descriptionText}>
            Knowledge of PHP, MySQL.{`\n`}
            Knowledge of CSS/Jquery.{`\n`}
            Knowledge of database designing.{`\n`}
            Good Programming Logic.{`\n`}
            Basic/Advanced knowledge of JavaScript, Ajax, Jquery.{`\n`}
            Self Learner and Self Motivated Person.{`\n`}
            Team Player.{`\n`}
            Freshers can also be apply.{`\n`}
          </Text>

          <View style={{ marginVertical: 10 }} />
          <Text style={styles.headerTextStyle}>Education</Text>
          <Text style={styles.descriptionText}>
            UG: Any Graduate - Any Specialization, B.Tech/B.E. - Any
            Specialization, Diploma - Any Specialization, Other Graduate, BCA -
            Computers
          </Text>

          <View style={{ marginVertical: 10 }} />
          <Text style={styles.headerTextStyle}>Company Profile:</Text>
          <View style={{ marginVertical: 10 }} />
          <Text style={styles.descriptionText}>
            Excellence Technologies :{`\n`}
            {ABOUT_US}
          </Text>
          <View style={{ marginVertical: 10 }} />
          <Text style={styles.descriptionText}>
            Recruiter Name:HR{`\n`}
            Contact Company:Excellence Technosoft Private Limited{`\n`}
            Email Address:jobs@excellencetechnologies.in{`\n`}
            Website:http://www.excellencetechnologies.in{`\n`}
            Telephone:123456789{`\n`}
            Reference Id:DEV001
          </Text>
          <View style={styles.btnView}>
            <Button rounded style={[styles.btnStyle, { marginRight: 3 }]}>
              <Text style={[styles.btnText, { paddingHorizontal: 15 }]}>
                LOGIN TO APPLY
              </Text>
            </Button>
            <Button iconLeft rounded style={styles.btnStyle}>
              <Icon
                name="share"
                type="Entypo"
                style={{ color: COLOR.TEXTCOLOR }}
              />
              <Text style={[styles.btnText, { paddingRight: 20 }]}>
                SHARE IT
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default FullDescription;
