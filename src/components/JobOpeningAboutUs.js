import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Button } from "native-base";
import { COLOR } from "../styles/color";
import { ABOUT_US } from "../helper/constant";

const ProfileView = props => {
  return (
    <View style={styles.descriptionView}>
      <Text style={styles.textStyle}>About Excellence Technologies</Text>
      <View style={styles.aboutUsView}>
        <Text style={styles.aboutUs}>{ABOUT_US}</Text>
      </View>
      {/* <View style={{ alignContent: "center" }}>
        <Button rounded style={styles.btnStyle}>
          <Text style={{ color: "#253055", fontFamily: "Montserrat-Bold" }}>Login To Apply</Text>
        </Button>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionView: {
    flexBasis: "50%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  textStyle: {
    fontFamily: "Montserrat-SemiBold", 
    color: COLOR.TURQUOISE
  },
  aboutUsView: {
    marginVertical: 10
  },
  aboutUs: {
    fontFamily: "Montserrat-SemiBold", 
    textAlign: "center",
    // letterSpacing:0.5,
    color: COLOR.TEXTCOLOR,
    fontSize:12.3,
    textAlignVertical:'center'
  },
  btnStyle: {
    marginBottom:15,
    height:35,
    backgroundColor: COLOR.MUSTARD,
    marginBottom: 10
  }
});
export default ProfileView;