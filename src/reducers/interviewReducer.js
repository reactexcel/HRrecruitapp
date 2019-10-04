import {
  INTERVIEW_EMAIL_SIGN_UP,
  INTERVIEW_EMAIL_SIGN_UP_REQUEST,
  INTERVIEW_EMAIL_SIGN_UP_FAILURE,
  INTERVIEW_EMAIL_SIGN_UP_ERROR,
  CANDIDATE_DETAILS_SUCCESS,
  CANDIDATE_DETAILS_FAILURE,
  CANDIDATE_DETAILS_REQUEST,
  CANDIDATE_DETAILS_CLEAR_REQUEST,
} from "../actions/types";

const initialState = {
  registering: false,
  isLoading:false,
  isSuccess:false,
  isError:false,
  jobNotAssign:false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INTERVIEW_EMAIL_SIGN_UP_REQUEST:
      return {
        registering: true,
        isLoading:true,
      };
    case INTERVIEW_EMAIL_SIGN_UP:
      return { registering: false,isLoading:false,isSuccess:true, ...action.payload };
      break;
    case INTERVIEW_EMAIL_SIGN_UP_FAILURE:
      return {isLoading:false,isSuccess:false,isError:true,jobNotAssign:true, ...action.payload};
      break;
    case INTERVIEW_EMAIL_SIGN_UP_ERROR:
      return {
        success: false,
        isLoading:false,
        isSuccess:false,
        isError:true,
      };
      break;
      case CANDIDATE_DETAILS_CLEAR_REQUEST:
      return initialState;
      break;
      case CANDIDATE_DETAILS_REQUEST:
      return { registering: false,isLoading:true,isSuccess:false,isError:false, ...action.payload };
      break;
    case CANDIDATE_DETAILS_SUCCESS:
      return { registering: false,isLoading:false,isSuccess:true,isError:false, ...action.payload };
    break;
    case CANDIDATE_DETAILS_FAILURE:
      return { registering: false,isLoading:false,isSuccess:false,isError:true, ...action.payload };
    break;
    default:
      return state;
      break;
  }
}
