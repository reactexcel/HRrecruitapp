import { QUESTIONS_SUCCESS, QUESTIONS_FAILURE } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case QUESTIONS_SUCCESS:
      return action.payload;
      break;
    case QUESTIONS_FAILURE:
      return action.payload;

    default:
      return state;
      break;
  }
}
