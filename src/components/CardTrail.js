import React, { Fragment } from "react";
import { View, StyleSheet } from "react-native";
import styles from "../styles/components/CardTrail.js";

const CardTrail = () => {
  return (
    <Fragment>
      <View style={styles.cardTrailOne} />
      <View style={styles.cardTrailTwo} />
      <View style={styles.cardTrailThree} />
    </Fragment>
  );
};

export default CardTrail;
