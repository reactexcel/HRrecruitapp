import {
    CANDIDATE_UPDATE_PROFILE_SUCCESS,
  CANDIDATE_UPDATE_PROFILE_FAILURE,
  CANDIDATE_UPDATE_PROFILE_REQUEST
     } from "../actions/types";
     const initialState = {
       adding: false,
     };
     
     export default function(state = initialState, action) {
         console.log(state,action,'KKKKKKKKKKKKKKk');
       switch (action.type) {
         case CANDIDATE_UPDATE_PROFILE_REQUEST:
           return { state };
           break;
         case CANDIDATE_UPDATE_PROFILE_SUCCESS:
           return { adding: false, ...action.payload };
           break;
         case CANDIDATE_UPDATE_PROFILE_FAILURE:
           return { success: false, ...action.payload };
           break;
         default:
           return state;
           break;
       }
     }