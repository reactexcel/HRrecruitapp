import {
  INTERVIEW_EMAIL_SIGN_UP,
  INTERVIEW_EMAIL_SIGN_UP_REQUEST
} from "../actions/types";

const initialState = {
  registering: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INTERVIEW_EMAIL_SIGN_UP_REQUEST:
      return {
        registering: true
      };
    case INTERVIEW_EMAIL_SIGN_UP:
      return { registering: false, ...action.payload };
      break;
    default:
      return initialState;
      break;
  }
}
