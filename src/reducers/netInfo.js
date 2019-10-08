import {
    CHANGE_CONNECTION_STATUS,
  } from "../actions/types";
  
  const initialState = {
    isConnected: true
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case CHANGE_CONNECTION_STATUS:
        return {
            isConnected: action.payload
        };
      default:
        return state;
        break;
    }
  }
 
  