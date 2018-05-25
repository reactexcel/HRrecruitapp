import {
  SUBMIT_TEST_REQUEST,
  SUBMIT_TEST_SUCCESS,
  SUBMIT_TEST_FAILURE
} from "./types";

export default function(state = null, action) {
  switch (action.type) {
    case SUBMIT_TEST_REQUEST:
      return {
        submitting: true
      };
      break;
    case SUBMIT_TEST_SUCCESS:
      return {
        submitting: false,
        ...action.payload
      };
    case SUBMIT_TEST_FAILURE:
      return {
        sucess: false
      };
    default:
      return state;
      break;
  }
}
