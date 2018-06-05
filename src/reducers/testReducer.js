import {
  SUBMIT_TEST_REQUEST,
  SUBMIT_TEST_SUCCESS,
  SUBMIT_TEST_FAILURE
} from "../actions/types";

const initialState = {
  submitting: false
};

export default function(state = initialState, action) {
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
        success: false
      };
    default:
      return initialState;
      break;
  }
}
