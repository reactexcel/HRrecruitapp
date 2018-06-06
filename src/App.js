import React, { Component } from "react";
import { Root } from "native-base";
import Rootstack from "./config/router";
import * as firebase from 'firebase';
import { FIREBASE_CONFIG } from '../src/config/firebase';
firebase.initializeApp(FIREBASE_CONFIG);

export default class App extends Component {
  render() {
    return (
      <Root>
        <Rootstack />
      </Root>
    );
  }
}
