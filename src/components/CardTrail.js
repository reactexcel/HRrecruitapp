import React, { Fragment } from "react";
import { View, StyleSheet } from "react-native";

const CardTrail = () => {
  return (
    <Fragment>
      <View
        style={{
          width: "70%",
          flex: 0.020,
          backgroundColor: "#39487a",
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15
        }}
      />
      <View
        style={{
          width: "75%",
          flex: 0.020,
          backgroundColor: "#5a6799",
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15
        }}
      />
      <View
        style={{
          width: "80%",
          flex: 0.020,
          backgroundColor: "#93a0cb",
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15
        }}
      />
    </Fragment>
  );
};

export default CardTrail;
