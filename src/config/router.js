import { createStackNavigator } from "react-navigation";
import InterviewLogin from "../screens/InterviewLogin";
import VerifyingCandidate from "../screens/VerifyingCandidate";
import OTPpage from "../screens/OTPpage";
import AddCandidate from '../screens/AddCandidate';

const Rootstack = createStackNavigator({
  InterviewLogin: {
    screen: InterviewLogin
  },
  VerifyingCandidate : {
    screen : VerifyingCandidate
  },
  OTPpage : {
    screen : OTPpage
  },
  AddCandidate : {
    screen : AddCandidate
  }
},{
    initialScreen : 'InterviewLogin',
});

export default Rootstack;