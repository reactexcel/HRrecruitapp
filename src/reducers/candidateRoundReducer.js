import {
  CANDIDATE_ROUND_DETAILS_SUCCESS,
  CANDIDATE_ROUND_DETAILS_FAILURE
} from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case CANDIDATE_ROUND_DETAILS_SUCCESS:
      return action.payload;
      break;
    case CANDIDATE_ROUND_DETAILS_FAILURE:
      return action.payload;
    default:
      return state;
      break;
  }
}
