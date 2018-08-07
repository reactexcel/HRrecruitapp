import React, { Fragment } from "react";
import { Text, StyleSheet, View } from "react-native";
import { COLOR } from "../styles/color";

const ProfileBlock = props => {
  return (
    <Fragment>
      <View style={{ paddingVertical: 15, paddingLeft: 15 }}>
        <Text style={{ color: COLOR.TURQUOISE, fontSize: 18 }}>
          {props.title}
        </Text>
        {props.children}
      </View>
      {props.showBorder && (
        <View
          style={{ borderWidth: 1, borderColor: "#303d6b", width: "100%" }}
        />
      )}
    </Fragment>
  );
};

ProfileBlock.defaultProps = {
  showBorder: true
};

export default ProfileBlock;
