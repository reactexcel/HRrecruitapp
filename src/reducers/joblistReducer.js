import { GET_JOBLIST_SUCCESS, GET_JOBLIST_FAILURE } from "../actions/types";

export default function (state = null, action) {
    switch (action.type) {
        case GET_JOBLIST_SUCCESS:
            return action.payload;
            break;
        case GET_JOBLIST_FAILURE:
            return action.payload;

        default:
            return state;
            break;
    }
}
