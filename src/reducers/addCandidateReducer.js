import {
  ADD_CANDIDATE_REQUEST,
  ADD_CANDIDATE_SUCCESS,
  ADD_CANDIDATE_FAILURE,
  CANDIDATE_UPDATE_VALUE
} from "../actions/types";
const initialState = {
  adding: false,
};

export default function(state = initialState, action) {
  console.log(state,action,'IIIIIIIIIIIIIIIi');
  switch (action.type) {
    case ADD_CANDIDATE_REQUEST:
      return { state };
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
