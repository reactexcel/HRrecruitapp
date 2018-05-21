import { createStackNavigator } from "react-navigation";
import InterviewLogin from "../screens/InterviewLogin";
import VerifyingCandidate from "../screens/VerifyingCandidate";
import OTPpage from "../screens/OTPpage";
import AddCandidate from "../screens/AddCandidate";
import Instructions from "../screens/Instructions";
import TestPage from "../screens/TestPage";

const Rootstack = createStackNavigator(
  {
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
    }
  },
  {
    initialScreen: "InterviewLogin"
  }
);

export default Rootstack;
