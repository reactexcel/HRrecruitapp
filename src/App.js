import React, { Component } from "react";
import { StatusBar, Platform } from "react-native";
import { Root, Footer, Text } from "native-base";
import Rootstack from "./config/router";
import "../src/firebase/index";
import * as firebase from "firebase";
import { FIREBASE_CONFIG } from "../src/config/firebase";
import pubsub from "pubsub-js";
import { COLOR } from "./styles/color";
import AppFooter from "./components/AppFooter";
import { Font } from 'expo';
require("core-js/es6/array"); // USE FOR BACK HANDLER NOT WORKING IN RELEASE MODE IF REMOVED

firebase.initializeApp(FIREBASE_CONFIG);

export default class App extends Component {
  async componentDidMount() {
     await Font.loadAsync({
      'Montserrat-Ragular': require('../assets/fonts/Montserrat-Regular.ttf'),
    });
    Platform.OS === "android"
      ? StatusBar.setBackgroundColor(COLOR.LGONE)
      : StatusBar.setBarStyle("dark-content");
  }
  render() {
    return (
      <Root>
        <Rootstack />
        {/* <AppFooter /> */}
      </Root>
    );
  }
}
