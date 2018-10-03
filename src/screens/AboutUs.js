import React, { Component } from "react";
import { StyleSheet, Text, View, Alert, ScrollView, Image } from "react-native";
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

class AboutUs extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: COLOR.LGONE,
      elevation: 0
    },
    headerTitle: (
      <View style={{ flex: 1, alignItems: "center", alignSelf: "center" }}>
        <Image
          source={require("../images/logo.png")}
          resizeMode="contain"
          style={{
            height: 100,
            width: 150
          }}
        />
      </View>
    ),
    headerTintColor: COLOR.PINK,
    headerRight: <View />
  };
  render() {
    return (
      <ScrollView>
        <LinearGradient
          colors={[COLOR.LGONE, COLOR.LGTWO]}
          style={{ height: 150 }}
        >
          <AboutUsText textcolor="white" />
        </LinearGradient>
        {/* <View style ={{position:'absolute',zIndex:1000,bottom:"35%"}}>
          <Image
            source={require("../images/teamwork.png")}
            // style ={{position:'absolute',zIndex:2,bottom:"15%",}}
          />
        </View> */}
        <View>
          <View style={{ paddingHorizontal: 10, marginBottom: 30 }}>
            <Icon
              type="FontAwesome"
              name="quote-left"
              style={{ color: COLOR.PINK }}
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Montserrat-SemiBold",
                color: COLOR.TEXTCOLOR
              }}
            >
              {EXCEL_BELIVE}
            </Text>
          </View>

          <AboutUsHeader text="CHECK US OUT" />
          <AboutUsCarousel />

          <LinearGradient
            colors={[COLOR.LGONE, COLOR.LGTWO]}
            style={{
              padding: 20,
              position: "relative",
              bottom: 135,
              justifyContent: "center",
              alignItems: "center"
            }}
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
              style={{ color: COLOR.PINK, alignSelf: "flex-start" }}
            />
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Montserrat",
                color: COLOR.TURQUOISE,
                textAlign: "center"
              }}
            >
              {EMP_SAY}
            </Text>
            <ReviewButton />
          </LinearGradient>

          <AboutUsHeader text="OUR SERVICES" />
          <Text
            style={aboutusCss.grw}
          >
            {GRW_US}
          </Text>
          <Text
            style={aboutusCss.edge}
          >
            {EDGE_TECH}
          </Text>
          <View style={{ marginTop: 30 }}>
            <View style={aboutusCss.childview}>
              <View style={aboutusCss.firstrow}>
                <Image
                  style={{ width: 70, height: 62, marginLeft: 56 }}
                  source={require("../images/Vector_Smart.png")}
                />
                <Text
                  style={aboutusCss.imagename}
                >
                  UX/UI
                </Text>
                <Text
                  style={aboutusCss.ux}
                >
                  {UX_UI}
                </Text>
              </View>
              <View
                style={aboutusCss.secondrow}
              >
                <Image
                  style={{ width: 70, height: 77, marginLeft: 50 }}
                  source={require("../images/Icon_cart.png")}
                />
                <Text
                  style={aboutusCss.imagename}
                >
                  eCommerce
                </Text>
                <Text
                  style={aboutusCss.ecom}
                >
                  {eCommerce}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 8
              }}
            >
              <View
                style={[aboutusCss.border,{marginRight:'5%'}]}
              />
              <View
                style={aboutusCss.border}
              />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View
                style={aboutusCss.mobileview}
              >
                <Image
                  style={{ width: 60, height: 70, marginLeft: 50 }}
                  source={require("../images/Layer_17.png")}
                />
                <Text
                  style={aboutusCss.imagename}
                >
                  Mobile Apps
                </Text>
                <Text
                  style={aboutusCss.apptext}
                >
                  {M_APPS}
                </Text>
              </View>
              <View
                style={aboutusCss.cloudview}
              >
                <Image
                  style={{ width: 77, height: 70, marginLeft: 50 }}
                  source={require("../images/Layer_18.png")}
                />
                <Text
                  style={aboutusCss.imagename}
                >
                  Cloud Deployment
                </Text>
                <Text
                  style={aboutusCss.cloudtext}
                >
                  {CLOUD_DEV}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 8
              }}
            >
              <View
                style={[aboutusCss.border,{marginRight:'5%'}]}
              />
              <View
                style={aboutusCss.border}
              />
            </View>
            <View style={{ justifyContent: "center", marginTop: 15 }}>
              <View style={{ justifyContent: "center", alignSelf: "center" }}>
                <Image
                  style={{ width: 70, height: 68 }}
                  source={require("../images/Layer_19.png")}
                />
              </View>
              <Text
                style={aboutusCss.blockchainname}
              >
                Block Chain
              </Text>
              <Text
                style={aboutusCss.blockchaintext}
              >
                {BLK_CHAIN}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default AboutUs;
