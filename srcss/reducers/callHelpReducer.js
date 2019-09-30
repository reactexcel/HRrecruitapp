import {
  CALL_HELP_REQUEST,
  CALL_HELP_SUCCESS,
  CALL_HELP_FAILURE
} from "../actions/types";

const initialState = {
  calling: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CALL_HELP_REQUEST:
      return {
        calling: true
      };
      break;
    case CALL_HELP_SUCCESS:
      return { calling: false, ...action.payload };
      break;

    case CALL_HELP_FAILURE:
      return { success: false };

    default:
      return state;
      break;
  }
}
