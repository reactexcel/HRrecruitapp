import { handleActions } from "redux-actions";
import * as constants from "../actions/types";
import update from "immutability-helper";

const initialState = {
    candidateJob:'',
    message:'Hello'
  };

  const toGetData = (state=initialState, action) => {
      console.log(action,'+++++++++++++++++++++++++++++++++++++');
    return update(state, {
      candidateJob: { $set: action}
    });
  };
  const onChange = (state=initialState, action) => {
    console.log(state,action.payload,'#############################');
  return update(state, {
    candidateJob:{payload:{candidate:{data:{mobile_no:{$set:action.payload}}}}}
  });
};
  export default handleActions(
    {
      [constants.CANDIDATE_UPDATE_VALUE]: toGetData,
      [constants.CANDIDATE_DATA_ONCHNAGE]: onChange,
    //   [constants.NEW_VALUE]: addToDo,
    //   [constants.ADD_NEW_VALUE]: addnewValue,
    //   [constants.EDIT_TODO]: foredit,
    //   [constants.FOR_DELETE]: forDelete
    },
    initialState
  );