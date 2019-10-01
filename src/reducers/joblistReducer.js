import { GET_JOBLIST_SUCCESS, GET_JOBLIST_FAILURE } from "../actions/types";

const initialState = {
    isLoading:false,
    isSuccess:false,
    isError:false,
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_JOBLIST_SUCCESS:
            return  {isSuccess:true,isError:false,...action.payload}
            break;
            
        case GET_JOBLIST_FAILURE:
            return{isError:true,isSuccess:false, ...action.payload}

        default:
            return state;
            break;
    }
}
