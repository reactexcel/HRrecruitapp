import { createStackNavigator } from "react-navigation";
import InterviewLogin from "../screens/InterviewLogin";
import VerifyingCandidate from "../screens/VerifyingCandidate";
import ExistingEmail from "../screens/ExistingEmail";
import AddCandidate from '../screens/AddCandidate';

const Rootstack = createStackNavigator({
  InterviewLogin: {
    screen: InterviewLogin
  },
  VerifyingCandidate : {
    screen : VerifyingCandidate
  },
  ExistingEmail : {
    screen : ExistingEmail
  },
  AddCandidate : {
    screen : AddCandidate
  }
},{
    initialScreen : 'InterviewLogin',
});

export default Rootstack;