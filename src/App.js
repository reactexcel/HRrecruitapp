import React, { Component } from "react";
import { Root } from "native-base";
import Rootstack from "./config/router";

export default class App extends Component {
  render() {
    return (
      <Root>
        <Rootstack />
      </Root>
    );
  }
}
