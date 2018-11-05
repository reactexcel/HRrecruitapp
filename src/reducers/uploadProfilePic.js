import {
 CANDIDATE_UPLOAD_IMAGE_REQUEST,
 CANDIDATE_UPLOAD_IMAGE_SUCCESS,
 CANDIDATE_UPLOAD_IMAGE_FAILURE,
  } from "../actions/types";
  const initialState = {
    adding: false,
  };
  
  export default function(state = initialState, action) {
      // console.log(state,action,'^^^^^^^^^^^^^^^^^^^^^');
    switch (action.type) {
      case CANDIDATE_UPLOAD_IMAGE_REQUEST:
        return { state };
        break;
      case CANDIDATE_UPLOAD_IMAGE_SUCCESS: 
        return { adding: false, ...action.payload };
        break;
      case CANDIDATE_UPLOAD_IMAGE_FAILURE:
        return { success: false, ...action.payload };
        break;
      default:
        return state;
        break;
    }
  }