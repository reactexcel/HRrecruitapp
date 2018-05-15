import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, StatusBar } from "react-native";
import Rootstack from "./config/router";

export default class App extends Component {
  componentDidMount() {
    StatusBar.setHidden(true);
  }
  render() {
    return (
      <Rootstack />
    );
  }
}

