import {
  CANDIDATE_ROUND_DETAILS_REQUEST,
  CANDIDATE_ROUND_DETAILS_SUCCESS,
  CANDIDATE_ROUND_DETAILS_FAILURE,
} from "../actions/types";

const initialState ={
  isLoading:false,
  isSuccess:false,
  isError:false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CANDIDATE_ROUND_DETAILS_REQUEST:
      return {isError:false,isSuccess:false,isLoading:true, ...action.payload};
      break;
    case CANDIDATE_ROUND_DETAILS_SUCCESS:
      return {isError:false,isSuccess:true,isLoading:false, ...action.payload};
      break;
    case CANDIDATE_ROUND_DETAILS_FAILURE:
      return {isLoading:false,isError:true,isSuccess:false, ...action.payload};
    default:
      return state;
      break;
  }
}
