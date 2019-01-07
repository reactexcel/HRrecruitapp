import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Easing, Animated } from "react-native";
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import HomePage from '../src/screens/HomePage';
import AppIntro from '../src/screens/AppIntro';
import JobList from '../src/screens/JobList';
import InterviewLogin from '../src/screens/InterviewLogin';
import VerifyingCandidate from '../src/screens/VerifyingCandidate';
import OTPpage from '../src/screens/OTPpage';
import candidateValidation from '../src/screens/candidateValidation';
import AddCandidate from '../src/screens/AddCandidate';
import Instructions from '../src/screens/Instructions';
import TestPage from '../src/screens/TestPage';
import SubmitTest from '../src/screens/SubmitTest';
import AboutUs from '../src/screens/AboutUs';
import Profile from '../src/screens/Profile';
import FullDescription from '../src/screens/FullDescription';
import ProfileDescription from '../src/components/ProfileDescription'

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
    InterviewLogin: {
      screen: InterviewLogin
    },
    VerifyingCandidate: {
      screen: VerifyingCandidate
    },
    OTPpage: {
      screen: OTPpage
    },
    candidateValidation:{
      screen:candidateValidation
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
    },
    FullDescription: {
      screen: FullDescription
    },
    ProfileDescription:{
      screen:ProfileDescription
    }
    
  },
  {
    initialScreen: "AppIntro",
    transitionConfig
  }
);

  export default Rootstack;