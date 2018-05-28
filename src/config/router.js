import { createStackNavigator } from "react-navigation";
import InterviewLogin from "../screens/InterviewLogin";
import VerifyingCandidate from "../screens/VerifyingCandidate";
import OTPpage from "../screens/OTPpage";
import AddCandidate from "../screens/AddCandidate";
import Instructions from "../screens/Instructions";
import TestPage from "../screens/TestPage";
import SubmitTest from "../screens/SubmitTest";

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
    },
    SubmitTest: {
      screen: SubmitTest
    }
  },
  {
    initialScreen: "InterviewLogin"
  }
);

export default Rootstack;
