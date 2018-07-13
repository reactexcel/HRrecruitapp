import {
  ADD_CANDIDATE_REQUEST,
  ADD_CANDIDATE_SUCCESS,
  ADD_CANDIDATE_FAILURE
} from "../actions/types";

const initialState = {
  adding: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CANDIDATE_REQUEST:
      return { adding: true };
      break;
    case ADD_CANDIDATE_SUCCESS:
      return { adding: false, ...action.payload };
      break;
    case ADD_CANDIDATE_FAILURE:
      return { success: false, ...action.payload };
      break;
    default:
      return state;
      break;
  }
}
