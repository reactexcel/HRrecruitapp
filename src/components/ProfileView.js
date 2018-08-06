import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text, Thumbnail } from "native-base";
import { COLOR } from "../styles/color";

const ProfileView = props => {
  return (
    <View style={styles.profileView}>
      <TouchableOpacity onPress={props.onPress}>
        <Thumbnail
          large
          source={require("../images/solidgrey.png")}
          style={styles.thumbnail}
        />
      </TouchableOpacity>
      <Text style={styles.nameText}>John Doe</Text>
      <Text style={styles.number}>12345660909</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileView: {
    flexBasis: "35%",
    backgroundColor: "white",
    alignItems: "center"
  },
  thumbnail: {
    width: 110,
    height: 110,
    borderRadius: 55
  },
  nameText: {
    fontSize: 20,
    letterSpacing: 1
  },
  number: {
    color: COLOR.TURQUOISE
  }
});
export default ProfileView;
