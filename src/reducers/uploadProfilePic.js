import {
 CANDIDATE_UPLOAD_IMAGE_REQUEST,
 CANDIDATE_UPLOAD_IMAGE_SUCCESS,
 CANDIDATE_UPLOAD_IMAGE_FAILURE,
  } from "../actions/types";
  const initialState = {
    adding: false,
    isSuccess:false,
    isError:false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case CANDIDATE_UPLOAD_IMAGE_REQUEST:
        return { isSuccess:false,isError:false };
        break;
      case CANDIDATE_UPLOAD_IMAGE_SUCCESS: 
        return { adding: false,isSuccess:true,isError:false, ...action.payload };
        break;
      case CANDIDATE_UPLOAD_IMAGE_FAILURE:
        return { isSuccess: false,isError:true, ...action.payload };
        break;
      default:
        return state;
        break;
    }
  }