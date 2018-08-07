import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLOR } from "../styles/color";
import styles from "../styles";

class FullDescription extends Component {
  static navigationOptions = {
    headerStyle: {
      elevation: 0,
      backgroundColor: "white"
    },
    title: "Full Description",
    headerTitleStyle: {
      color: "black",
      textAlign: "center",
      alignSelf: "center",
      flex: 1,
      fontFamily: "Montserrat-SemiBold"
    },
    headerTintColor: COLOR.PINK,
    headerRight: <View />
  };
  render() {
    return (
      <View
        style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 10 }}
      >
        <Text
          style={{
            color: COLOR.TURQUOISE,
            fontFamily: "Montserrat-Medium",
            fontSize: 20
          }}
        >
          Jr. Web Developer
        </Text>
        <View style={styles.viewDesign}>
          <View style={styles.iconView}>
            <View style={styles.viewRow}>
              <FontAwesome
                name="briefcase"
                color={COLOR.Red}
                style={styles.viewIcon}
              />
              <Text style={styles.rowText}>0 - 1 years</Text>
            </View>
            <View style={styles.viewRow}>
              <FontAwesome
                name="map-pin"
                color={COLOR.Red}
                style={styles.viewIcon}
              />
              <Text style={styles.rowText}>Noida</Text>
            </View>
            <View style={styles.viewRow}>
              <FontAwesome
                name="map-pin"
                color={COLOR.Red}
                style={styles.viewIcon}
              />
              <Text style={styles.rowText}>1,25,000 - 2,00,000 PA</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}


export default FullDescription;
