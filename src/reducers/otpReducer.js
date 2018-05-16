import { OTP_SUCCESS, OTP_REQUEST,OTP_FAILED } from "../actions/types";

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
      return { registering: false, message: "Invalid OTP" };
    default:
      return initialState;
      break;
  }
}
