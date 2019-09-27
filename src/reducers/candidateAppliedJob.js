import {
    CANDIDATE_JOB_SUCCESS,
    CANDIDATE_JOB_FAILURE
} from "../actions/types";

const initialState = {
    success: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CANDIDATE_JOB_SUCCESS:
            return { success: true, ...action.payload };
            break;
        case CANDIDATE_JOB_FAILURE:
            return { success: false, ...action.payload };
            break;
        default:
            return state;
            break;
    }
}
