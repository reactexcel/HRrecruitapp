import React, { Component, Fragment } from "react";
import { Text, StyleSheet, View } from "react-native";
import { COLOR } from "../styles/color";

export default class ProfileBlock extends Component {
  static defaultProps = {
    showBorder: true
  };
  render() {
    return (
      <Fragment>
        <View style={{ paddingVertical: 15, paddingLeft: 15 }}>
          <Text style={{ color: COLOR.TURQUOISE, fontSize: 18 }}>
            {this.props.title}
          </Text>
          {this.props.children}
        </View>
        {this.props.showBorder && (
          <View
            style={{ borderWidth: 1, borderColor: "#303d6b", width: "100%" }}
          />
        )}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({});
