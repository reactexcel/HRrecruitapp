import {
  OTP_SUCCESS,
  OTP_REQUEST,
  OTP_FAILED,
  OTP_ERROR
} from "../actions/types";

const initialState = {
  registering: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OTP_REQUEST:
      return {
        registering: true
      };
    case OTP_SUCCESS:
      return { registering: false, ...action.payload };
      break;
    case OTP_FAILED:
      return { registering: false, ...action.payload };
    case OTP_ERROR:
      return {
        success: false
      };
    default:
      return state;
      break;
  }
}
