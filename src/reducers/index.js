import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import interviewReducer from './interviewReducer';
import otpReducer from './otpReducer';

export default combineReducers({
    form : formReducer,
    interviewSignUp : interviewReducer,
    otp : otpReducer
});