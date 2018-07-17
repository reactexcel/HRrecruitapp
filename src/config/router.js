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
import AboutUs from "../screens/AboutUs";

const Rootstack = createStackNavigator(
  {
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
    AboutUs : {
      screen : AboutUs
    }
  },
  {
    initialScreen: "HomePage"
  }
);

export default Rootstack;
