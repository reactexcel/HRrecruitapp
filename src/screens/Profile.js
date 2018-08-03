import React, { Component, Fragment } from "react";
import { Text, View, Thumbnail, Header, Button, Icon } from "native-base";
import { ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLOR } from "../styles/color";
import ProfileBlock from "../components/ProfileBlock";
import StepIndicator from "react-native-step-indicator";

export default class Profile extends Component {
  static navigationOptions = {
    headerStyle: {
      elevation: 0
    },
    title: "Profile",
    headerTitleStyle: {
      color: "black",
      textAlign: "center",
      alignSelf: "center",
      flex: 1
    },
    headerTintColor: COLOR.PINK,
    headerRight: <View />
  };
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 0
    };
  }
  render() {
    const labels = [
      "CV Sent",
      "CV Received",
      "CV Shortlisted",
      "Take Online Test",
      "Result"
      //   "#2a365f"
    ];
    const customStyles = {
      stepIndicatorSize: 10,
      currentStepIndicatorSize: 15,
      separatorStrokeWidth: 1,
      currentStepStrokeWidth: 2,
      stepStrokeCurrentColor: COLOR.MUSTARD,
      stepStrokeWidth: 3,
      stepStrokeFinishedColor: COLOR.MUSTARD,
      stepStrokeUnFinishedColor: "#dedede",
      separatorFinishedColor: COLOR.MUSTARD,
      separatorUnFinishedColor: "#dedede",
      stepIndicatorFinishedColor: COLOR.MUSTARD,
      stepIndicatorUnFinishedColor: "#ffffff",
      stepIndicatorCurrentColor: "#ffffff",
      stepIndicatorLabelFontSize: 0,
      currentStepIndicatorLabelFontSize: 0,
      stepIndicatorLabelCurrentColor: "transparent",
      stepIndicatorLabelFinishedColor: "transparent",
      stepIndicatorLabelUnFinishedColor: "transparent",
      labelColor: "#999999",
      labelSize: 13,
      currentStepLabelColor: COLOR.MUSTARD
    };

    return (
      <ScrollView>
        <View
          style={{
            flexBasis: "35%",
            backgroundColor: "white",
            alignItems: "center"
          }}
        >
          <Thumbnail
            large
            source={require("../images/solidgrey.png")}
            style={{
              width: 110,
              height: 110,
              borderRadius: 55
            }}
          />
          <Text style={{ fontSize: 20, letterSpacing: 1 }}>John Doe</Text>
          <Text style={{ color: COLOR.TURQUOISE }}>12345660909</Text>
        </View>
        <LinearGradient
          colors={[COLOR.LGONE, COLOR.LGTWO]}
          style={{ flexBasis: "65%" }}
        >
          <ProfileBlock title="JOB TITLE">
            <Text style={{ color: "white", marginTop: 6 }}>
              Jr. Web Developer
            </Text>
          </ProfileBlock>
          <ProfileBlock title="JOB DESCRIPTION">
            <Text style={{ color: "white", marginTop: 6 }}>
              Web Developer - Experience in PHP,MySQL, HTML, CSS, jQuery is
              required. Experience in React, Angular, Magento is added benefit
            </Text>
          </ProfileBlock>
          <ProfileBlock title="APPLICATION STATUS">
            <View style={{ marginBottom: 10 }} />
            <StepIndicator
              customStyles={customStyles}
              currentPosition={this.state.currentPosition}
              labels={labels}
            />
          </ProfileBlock>
          <ProfileBlock title="EXCELLENCE TECHNOLOGIES" showBorder={false}>
            <View style={{ flex: 1, flexDirection: "row", marginTop: 6 }}>
              <Button
                iconLeft
                rounded
                style={{ backgroundColor: "transparent" }}
              >
                <Icon
                  name="location-pin"
                  type="Entypo"
                  style={{ color: COLOR.PINK }}
                />
                <Text>Location</Text>
              </Button>
              <Button
                iconLeft
                rounded
                style={{ backgroundColor: "transparent", marginHorizontal: 10 }}
              >
                <Icon name="volume-up" style={{ color: COLOR.PINK }} />

                <Text>About Us</Text>
              </Button>
            </View>
          </ProfileBlock>
        </LinearGradient>
      </ScrollView>
    );
  }
}
