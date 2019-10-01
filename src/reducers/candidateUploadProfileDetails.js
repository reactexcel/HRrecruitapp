import {
     CANDIDATE_UPDATE_PROFILE_DETAILS_SUCCESS,
     CANDIDATE_UPDATE_PROFILE_DETAILS_FAILURE, 
     CANDIDATE_UPDATE_PROFILE_DETAILS_REQUEST
     } from "../actions/types";

const initialState = {
    adding: false,
    isError:false,
    isSuccess:false,

  };

export default function (state =initialState , action) {
    switch (action.type) {
        case CANDIDATE_UPDATE_PROFILE_DETAILS_REQUEST:
            return {isSuccess:false,isError:false, ...action.payload}
            break;
        case CANDIDATE_UPDATE_PROFILE_DETAILS_SUCCESS:
            return {isSuccess:true,isError:false, ...action.payload}
            break;
        case CANDIDATE_UPDATE_PROFILE_DETAILS_FAILURE:
            return {isError:true, isSuccess:false, ...action.payload}
        default:
            return state;
            break;
    }
}