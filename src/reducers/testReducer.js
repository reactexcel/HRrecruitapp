import {
  SUBMIT_TEST_REQUEST,
  SUBMIT_TEST_SUCCESS,
  SUBMIT_TEST_FAILURE
} from "../actions/types";

const initialState = {
  isSuccess:false,
  isLoading:false,
  isError:false,
  data:{}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_TEST_REQUEST:
      return {
        isSuccess:false, isLoading:true, isError:false
      };
      break;
    case SUBMIT_TEST_SUCCESS:
      return {
        isSuccess: true, isLoading:false, isError:false, data:action.payload
      };
    case SUBMIT_TEST_FAILURE:
      return {
        isSuccess: false, isLoading:false, isError:true
      };
    default:
      return state;
      break;
  }
}
