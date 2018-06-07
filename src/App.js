import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Root, Footer, Text } from "native-base";
import Rootstack from "./config/router";
import '../src/firebase/index'
import * as firebase from "firebase";
import { FIREBASE_CONFIG } from '../src/config/firebase';
import pubsub from 'pubsub-js';
import { COLOR } from "./styles/color";
import AppFooter from "./components/AppFooter";

firebase.initializeApp(FIREBASE_CONFIG);
export default class App extends Component {
  componentDidMount() {
    StatusBar.setBackgroundColor(COLOR.BGCOLOR);
  }
  render() {
    return (
      <Root>
        <Rootstack />
        <AppFooter />
      </Root>
    );
  }
}
