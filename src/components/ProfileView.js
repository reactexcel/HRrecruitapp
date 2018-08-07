import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text, Thumbnail, Icon, Item } from "native-base";
import { COLOR } from "../styles/color";

const ProfileView = props => {
  return (
    <View style={styles.profileView}>
      <Thumbnail
        large
        source={require("../images/solidgrey.png")}
        style={styles.thumbnail}
      />
      <Icon
        name="squared-plus"
        type="Entypo"
        style={{
          color: COLOR.PINK,
          position: "absolute",
          top: "25%",
          right: "25%"
        }}
      />
      <Text style={styles.nameText}>John Doe</Text>
      <Text style={styles.number}>12345660909</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileView: {
    flexBasis: "35%",
    backgroundColor: "white",
    alignItems: "center",
    paddingBottom: 15
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
