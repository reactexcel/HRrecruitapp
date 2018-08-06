import React from "react";
import { Easing, Animated } from "react-native";
import { createStackNavigator } from "react-navigation";
import HomePage from "../screens/HomePage";
import InterviewLogin from "../screens/InterviewLogin";
import VerifyingCandidate from "../screens/VerifyingCandidate";
import OTPpage from "../screens/OTPpage";
import AddCandidate from "../screens/AddCandidate";
import Instructions from "../screens/Instructions";
import TestPage from "../screens/TestPage";
import SubmitTest from "../screens/SubmitTest";
import JobList from "../screens/JobList";
import AppIntro from "../screens/AppIntro";
import AboutUs from "../screens/AboutUs";
import Profile from "../screens/Profile";

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 700,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { position, layout, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      });

      const slideFromRight = { transform: [{ translateX }] };

      return slideFromRight;
    }
  };
};

const Rootstack = createStackNavigator(
  {
    AppIntro: {
      screen: AppIntro
    },
    HomePage: {
      screen: HomePage
    },
    InterviewLogin: {
      screen: InterviewLogin
    },
    VerifyingCandidate: {
      screen: VerifyingCandidate
    },
    OTPpage: {
      screen: OTPpage
    },
    AddCandidate: {
      screen: AddCandidate
    },
    Instructions: {
      screen: Instructions
    },
    TestPage: {
      screen: TestPage
    },
    SubmitTest: {
      screen: SubmitTest
    },
    JobList: {
      screen: JobList
    },
    AboutUs: {
      screen: AboutUs
    },
    Profile: {
      screen: Profile
    }
  },
  {
    initialScreen: "AppIntro",
    transitionConfig
  }
);

export default Rootstack;
