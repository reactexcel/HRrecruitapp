import React from "react";
import { Easing, Animated } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import {createAppContainer} from 'react-navigation';
import HomePage from "../screens/HomePage";
// import InterviewLogin from "../screens/InterviewLogin";
// import VerifyingCandidate from "../screens/VerifyingCandidate";
// import OTPpage from "../screens/OTPpage";
// import AddCandidate from "../screens/AddCandidate";
// import Instructions from "../screens/Instructions";
// import TestPage from "../screens/TestPage";
// import SubmitTest from "../screens/SubmitTest";
// import JobList from "../screens/JobList";
import AppIntro from "../screens/AppIntro";
import AboutUs from "../screens/AboutUs";
// import Profile from "../screens/Profile";
// import FullDescription from "../screens/FullDescription";
// import ProfileDescription from '../components/ProfileDescription'
// import candidateValidation from '../screens/candidateValidation'
const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 700,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { position, layout, scene, index, scenes } = sceneProps;
      const toIndex = index;
      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      });

      const slideFromRight = { transform: [{ translateX }] };

      const lastSceneIndex = scenes[scenes.length - 1].index;

      if (lastSceneIndex - toIndex > 1) {
        if (scene.index === toIndex) return;

        if (scene.index !== lastSceneIndex) return { opacity: 0 };

        return slideFromRight;
      }
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
    // // InterviewLogin: {
    // //   screen: InterviewLogin
    // // },
    // // VerifyingCandidate: {
    // //   screen: VerifyingCandidate
    // // },
    // // OTPpage: {
    // //   screen: OTPpage
    // // },
    // // candidateValidation:{
    // //   screen:candidateValidation
    // // },
    // // AddCandidate: {
    // //   screen: AddCandidate
    // // },
    // // Instructions: {
    // //   screen: Instructions
    // // },
    // // TestPage: {
    // //   screen: TestPage
    // // },
    // // SubmitTest: {
    // //   screen: SubmitTest
    // // },
    // JobList: {
    //   screen: JobList
    // },
    AboutUs: {
      screen: AboutUs
    },
    // Profile: {
    //   screen: Profile
    // },
    // FullDescription: {
    //   screen: FullDescription
    // },
    // ProfileDescription:{
    //   screen:ProfileDescription
    // }
    
  },
  {
    initialScreen: "AppIntro",
    transitionConfig
  }
);

export default  createAppContainer(Rootstack);
