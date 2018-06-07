import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Root, Footer, Text } from "native-base";
import Rootstack from "./config/router";
import { COLOR } from "./styles/color";
import AppFooter from "./components/AppFooter";

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
