import PubSub from 'pubsub-js';
import * as firebase from "firebase";
import { modifyEmail } from "../helper/index";

firebaseSignup = (msg,data) => {

    const {API_URL, email, res } = data;
    let modify_Email = modifyEmail(email);    
    let signupPath = "/signUp/" + modify_Email ;
    
    return firebase.database().ref(signupPath).set({
        API_URL:API_URL,
        res: res.data,
        status:res.status
    })
} 

firebaseVerifyOtp = (msg,data) => {

    const {API_URL, email, res, examToken,fb_id  } = data;
    let modify_Email = modifyEmail(email);    
    let verfiyOtp = "/verfiyOtp/" + modify_Email ;

    return firebase.database().ref(verfiyOtp).set({
        API_URL:API_URL,
        res: res.data,
        examToken:examToken,
        status:res.status,
        fb_id:fb_id
    })
}

firebaseGetQuestion = (msg,data) => {

    const {API_URL, email, res,fb_id  } = data;
    // let modify_Email = modifyEmail(email);    
    // let getQuestion = "/getQuestion/" + modify_Email ;

    // return firebase.database().ref(getQuestion).set({
    //     API_URL:API_URL,
    //     res: res.data,
    //     status:res.status,
    //     fb_id:fb_id
    // })
}

firebaseSubmitTest = (msg,data) => {
    console.log(msg,data)
    
    const {API_URL, email, res,fb_id  } = data;
    let modify_Email = modifyEmail(email);    
    let submitTest = "/submitTest/" + modify_Email ;

    return firebase.database().ref(submitTest).set({
        API_URL:API_URL,
        res: res.data,
        status:res.status,
        fb_id:fb_id
    })
}

// Firebase Action for Sign up 
var SIGN_UP_SUCCESS = PubSub.subscribe('FIREBASE_SIGNUP_SUCCESS', firebaseSignup);
var SIGN_UP_FAILURE = PubSub.subscribe('FIREBASE_SIGNUP_FAILURE', firebaseSignup);

// Firebase Action for OTP Verification 
var VERIFY_OTP_SUCCESS = PubSub.subscribe('FIREBASE_VERIFY_OTP_SUCCESS', firebaseVerifyOtp); 
var VERIFY_OTP_FAILURE = PubSub.subscribe('FIREBASE_VERIFY_OTP_FAILURE', firebaseVerifyOtp);

// Firebase Action for GetQuestions  
var GET_QUESTION_SUCCESS = PubSub.subscribe('FIREBASE_GET_QUESTION_SUCCESS', firebaseGetQuestion); 
var GET_QUESTION_FAILURE = PubSub.subscribe('FIREBASE_GET_QUESTION_FAILURE', firebaseGetQuestion);

// firebase Action for submitTest SUBMIT_TEST
var SUBMIT_TEST_SUCCESS = PubSub.subscribe('FIREBASE_SUBMIT_TEST_SUCCESS', firebaseSubmitTest); 
var SUBMIT_TEST_FAILURE = PubSub.subscribe('FIREBASE_SUBMIT_TEST_FAILURE', firebaseSubmitTest);