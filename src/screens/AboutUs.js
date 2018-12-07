import React, { Component } from "react";
import { StyleSheet, Text, View,ImageBackground, Alert, ScrollView, Image ,TouchableNativeFeedback} from "react-native";
import { COLOR } from "../styles/color";
import Logo from "../components/Logo";
import LinearGradient from "react-native-linear-gradient";
import { Grid, Row } from "react-native-easy-grid";
import styles from "../styles";
import _styles from "../styles/screens/AboutUs";
import aboutusCss from "../styles/screens/AboutUs";
import AboutUsText from "../components/AboutUsText";
import {
  ABOUT_US,
  DEVICE_WIDTH,
  EXCEL_BELIVE,
  EMP_SAY,
  GRW_US,
  EDGE_TECH,
  UX_UI,
  eCommerce,
  CLOUD_DEV,
  M_APPS,
  BLK_CHAIN
  
} from "../helper/constant";
import { Icon } from "native-base";
import AboutUsHeader from "../components/AboutUsHeader";
import AboutUsCarousel from "../components/AboutUsCarousel";
import ReviewButton from "../components/ReviewButton";
// import {LoginManager,LoginButton} from 'react-native-fbsdk'

class AboutUs extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: COLOR.LGONE,
      elevation: 0
    },
    headerTitle: (
      <View style={aboutusCss.header}>
        <Image
          source={require("../images/excellencelogo.png")}
          resizeMode="contain"
          style={aboutusCss.headerImage}
        />
      </View>
    ),
    headerTintColor: COLOR.PINK,
    headerRight: <View />
  };
  onPress=()=>{
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log('Login success with permissions: '
            +result.grantedPermissions.toString());
        }
      },
      function(error) {
        console.log('Login fail with error: ' + error);
      }
    );
  }
  render() {
    return (
      <ScrollView
      overScrollMode ='never'
      showsVerticalScrollIndicator={false}
      >

        
        <View
          style={{
            // paddingBottom: 90,
            backgroundColor: [COLOR.LGTWO],
            zIndex: -1
          }}
        >
          <LinearGradient
            colors={[COLOR.LGONE, COLOR.LGTWO]}
            style={{ height: 240 }}
          >
          <ImageBackground style={{width:'100%',height:'100%'}} source ={require('../images/background.png')} >
            <AboutUsText textcolor="white" /* style={{ padding: 200 }} */ />
          </ImageBackground>
          </LinearGradient>
        </View>
        <View style={aboutusCss.aboutcover}>
          <Image
            source={require("../images/teamwork.png")}
            resizeMode="cover"
            style={[aboutusCss.cover]}
          />
        </View>
        <View>
          <View style={aboutusCss.inQoute}>
            <Icon
              type="FontAwesome"
              name="quote-left"
              style={{ color: COLOR.REDESS }}
            />
            <Text style={aboutusCss.excelbelieve}>{EXCEL_BELIVE}</Text>
          </View>

          <AboutUsHeader text="CHECK US OUT" />
          <AboutUsCarousel />

          <View style={aboutusCss.masterview}>
            <LinearGradient
              colors={[COLOR.LGONE, COLOR.LGTWO]}
              style={aboutusCss.pplSay}
            >
              <Text
                style={{
                  color: COLOR.MUSTARD,
                  fontSize: 18,
                  fontFamily: "Montserrat-Bold"
                }}
              >
                WHAT PEOPLE SAY
              </Text>

              <Icon
                type="FontAwesome"
                name="quote-left"
                style={{ color: COLOR.REDESS, alignSelf: "flex-start" }}
              />
              <Text style={aboutusCss.ourServices}>{EMP_SAY}</Text>
              <ReviewButton />
            </LinearGradient>
            <AboutUsHeader text="OUR SERVICES" />
            <Text style={aboutusCss.grw}>{GRW_US}</Text>
            <Text style={aboutusCss.edge}>{EDGE_TECH}</Text>
            <View style={{ marginTop: 30 }}>
              <View style={aboutusCss.childview}>
                <View style={aboutusCss.firstrow}>
                  <Image
                    style={aboutusCss.one}
                    source={require("../images/Vector_Smart.png")}
                  />
                  <Text style={aboutusCss.imagename}>UX/UI</Text>
                  <Text style={aboutusCss.ux}>{UX_UI}</Text>
                </View>
                <View style={aboutusCss.secondrow}>
                  <Image
                    style={aboutusCss.two}
                    source={require("../images/Icon_cart.png")}
                  />
                  <Text style={aboutusCss.imagename}>eCommerce</Text>
                  <Text style={aboutusCss.ecom}>{eCommerce}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 8
                }}
              >
                <View style={[aboutusCss.border, { marginRight: "9%" }]} />
                <View style={aboutusCss.border} />
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <View style={aboutusCss.mobileview}>
                  <Image
                    style={aboutusCss.three}
                    source={require("../images/Layer_17.png")}
                  />
                  <Text style={aboutusCss.imagename}>Mobile Apps</Text>
                  <Text style={aboutusCss.apptext}>{M_APPS}</Text>
                </View>
                <View style={aboutusCss.cloudview}>
                  <Image
                    style={aboutusCss.four}
                    source={require("../images/Layer_18.png")}
                  />
                  <Text style={aboutusCss.imagename}>Cloud Deployment</Text>
                  <Text style={aboutusCss.cloudtext}>{CLOUD_DEV}</Text>
                </View>
              </View>
              <View style={aboutusCss.borderParent}>
                <View style={[aboutusCss.border, { marginRight: "9%" }]} />
                <View style={aboutusCss.border} />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  marginTop: 15,
                  marginBottom: 10
                }}
              >
                <View style={aboutusCss.chainview}>
                  <Image
                    style={{ width: 70, height: 68 }}
                    source={require("../images/Layer_19.png")}
                  />
                </View>
                <Text style={aboutusCss.blockchainname}>Block Chain</Text>
                <Text style={aboutusCss.blockchaintext}>{BLK_CHAIN}</Text>
              </View>
            </View>
          </View>
          {/* <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/> */}
          {/* <TouchableNativeFeedback onPress={this.onPress}>
         <View style={{width:'100%',height:200,justifyContent:'center',backgroundColor:'blue'}} >
         <Text style={{color:'white'}}>FB LOGIN</Text>
         </View>
         </TouchableNativeFeedback> */}
        </View>
      </ScrollView>
    );
  }
}

export default AboutUs;
