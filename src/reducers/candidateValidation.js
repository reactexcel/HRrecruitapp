import {
    CANDIDATE_VALIDATION_REQUEST,
    CANDIDATE_VALIDATION_SUCCESS,
    CANDIDATE_VALIDATION_FAILURE,
    CANDIDATE_UPDATE_VALUE
  } from "../actions/types";
  const initialState = {
    adding: false,
    isLoading:false,
    isSuccess:false,
    isError:false,
    data:[]
  };
  
  export default function(state = initialState, action) {
    // console.log(state,action,'IIIIIIIIIIIIIIIi');
    switch (action.type) {
      case CANDIDATE_VALIDATION_REQUEST:
        return { adding:false, isLoading:true, isSuccess:false , isError:false,data:null};
        break;
      case CANDIDATE_VALIDATION_SUCCESS:
        return { adding: false, isLoading:false, isSuccess:true,isError:false, data:action.payload };
        break;
      case CANDIDATE_VALIDATION_FAILURE:
        return { success: false, isLoading:false,isSuccess:false, isError:true, data:action.payload };
        break;
      default:
        return state;
        break;
    }
  }
  