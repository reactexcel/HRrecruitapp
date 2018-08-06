import React, { Component, Fragment } from "react";
import { Platform, Linking } from "react-native";
import { ScrollView, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLOR } from "../styles/color";
import ProfileView from "../components/ProfileView";
import ProfileDescription from "../components/ProfileDescription";

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
  handleLocate = () => {
    let url = "";
    if (Platform.OS === "ios") {
      url = `http://maps.apple.com/maps?q=${28.5965789},${77.3287437}`;
    } else if (Platform.OS === "android") {
      url = `geo:${28.5965789},${77.3287437}`;
    }
    Linking.openURL(url);
  };
  incPosition = () => {
    if (this.state.currentPosition < 5) {
      this.setState(prevState => ({
        currentPosition: prevState.currentPosition + 1
      }));
    }
  };
  render() {
    return (
      <ScrollView>
        <ProfileView onPress={this.incPosition} />
        <LinearGradient
          colors={[COLOR.LGONE, COLOR.LGTWO]}
          style={{ flexBasis: "65%" }}
        >
          <ProfileDescription
            currentPosition={this.state.currentPosition}
            handleLocate={this.handleLocate}
          />
        </LinearGradient>
      </ScrollView>
    );
  }
}
