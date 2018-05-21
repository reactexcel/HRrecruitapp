import {
  INTERVIEW_EMAIL_SIGN_UP,
  INTERVIEW_EMAIL_SIGN_UP_REQUEST,
  INTERVIEW_EMAIL_SIGN_UP_FAILURE
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
    case INTERVIEW_EMAIL_SIGN_UP_FAILURE:
      return { success: false };
    default:
      return initialState;
      break;
  }
}
