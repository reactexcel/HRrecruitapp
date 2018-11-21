import {
    CANDIDATE_VALIDATION_REQUEST,
    CANDIDATE_VALIDATION_SUCCESS,
    CANDIDATE_VALIDATION_FAILURE,
    CANDIDATE_UPDATE_VALUE
  } from "../actions/types";
  const initialState = {
    adding: false,
  };
  
  export default function(state = initialState, action) {
    // console.log(state,action,'IIIIIIIIIIIIIIIi');
    switch (action.type) {
      case CANDIDATE_VALIDATION_REQUEST:
        return { state };
        break;
      case CANDIDATE_VALIDATION_SUCCESS:
        return { adding: false, ...action.payload };
        break;
      case CANDIDATE_VALIDATION_FAILURE:
        return { success: false, ...action.payload };
        break;
      default:
        return state;
        break;
    }
  }
  