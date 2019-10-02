import {
    CANDIDATE_JOB_REQUEST,
    CANDIDATE_JOB_SUCCESS,
    CANDIDATE_JOB_FAILURE
} from "../actions/types";

const initialState = {
    success: false,
    isLoading:false,
    isError:false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CANDIDATE_JOB_REQUEST:
            return { success: false,isLoading:true,isError:false, ...action.payload };
            break;
        case CANDIDATE_JOB_SUCCESS:
            return { success: true,isLoading:false,isError:false, ...action.payload };
            break;
        case CANDIDATE_JOB_FAILURE:
            return { success: false,isLoading:false,isError:true, ...action.payload };
            break;
        default:
            return state;
            break;
    }
}
