import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import interviewReducer from './interviewReducer';

export default combineReducers({
    form : formReducer,
    interviewSignUp : interviewReducer
});