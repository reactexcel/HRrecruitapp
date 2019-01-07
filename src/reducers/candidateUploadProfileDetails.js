import { CANDIDATE_UPDATE_PROFILE_DETAILS_SUCCESS, CANDIDATE_UPDATE_PROFILE_DETAILS_FAILURE } from "../actions/types";

const initialState = {
    adding: false,
  };

export default function (state =initialState , action) {
    switch (action.type) {
        case CANDIDATE_UPDATE_PROFILE_DETAILS_SUCCESS:
            return action.payload;
            break;
        case CANDIDATE_UPDATE_PROFILE_DETAILS_FAILURE:
            return action.payload;
        default:
            return state;
            break;
    }
}