import { ADD_CANDIDATE } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case ADD_CANDIDATE:
      return action.payload;
      break;

    default:
      return state;
      break;
  }
}
