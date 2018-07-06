import axios from "axios";
import {
  INTERVIEW_EMAIL_SIGN_UP,
  INTERVIEW_EMAIL_SIGN_UP_REQUEST,
  INTERVIEW_EMAIL_SIGN_UP_FAILURE,
  INTERVIEW_EMAIL_SIGN_UP_ERROR
} from "./types";
import {
  ADD_CANDIDATE_REQUEST,
  ADD_CANDIDATE_SUCCESS,
  ADD_CANDIDATE_FAILURE
} from "./types";
import { OTP_REQUEST, OTP_SUCCESS, OTP_FAILED, OTP_ERROR } from "./types";
import { QUESTIONS_SUCCESS, QUESTIONS_FAILURE } from "./types";
import {
  CALL_HELP_REQUEST,
  CALL_HELP_SUCCESS,
  CALL_HELP_FAILURE
} from "./types";
import {
  SUBMIT_TEST_REQUEST,
  SUBMIT_TEST_SUCCESS,
  SUBMIT_TEST_FAILURE
} from "./types";
import { CHANGE_CONNECTION_STATUS } from "./types";
import { CANDIDATE_DETAILS_SUCCESS, CANDIDATE_DETAILS_FAILURE } from "./types";
import {
  CANDIDATE_ROUND_DETAILS_SUCCESS,
  CANDIDATE_ROUND_DETAILS_FAILURE
} from "./types";

import API_URL from "../config/dev";
import PubSub from "pubsub-js";

const _axios = () => axios.create({ baseURL: API_URL, timeout: 20000 }); //TimeOut set to 20 seconds

// Action for Signing Up with email to take interview test paper
export const signUp = email => async dispatch => {
  const profile_pic = `https://pikmail.herokuapp.com/${email}?size=60`;
  const appliedEmail = email;
  dispatch({ type: INTERVIEW_EMAIL_SIGN_UP_REQUEST });
  try {
    const res = await _axios().post("signup_login_fb", {
      email,
      appliedEmail,
      profile_pic
    });
    PubSub.publish("FIREBASE_SIGNUP_SUCCESS", { API_URL, email, res });
    dispatch({
      type: INTERVIEW_EMAIL_SIGN_UP,
      payload: { email, ...res.data }
    });
  } catch (err) {
    if (err.response) {
      PubSub.publish("FIREBASE_SIGNUP_FAILURE", { API_URL, email, err });
      if (err.response.data.error === 1) {
        dispatch({
          type: INTERVIEW_EMAIL_SIGN_UP_FAILURE,
          payload: err.response.data
        });
      } else {
        dispatch({ type: INTERVIEW_EMAIL_SIGN_UP_ERROR });
      }
    } else if (err.message) {
      dispatch({
        type: INTERVIEW_EMAIL_SIGN_UP_FAILURE,
        payload: { msg: err.message }
      });
    }
  }
};

// Action for verifying with OTP
export const verifyingOTP = (email, otp, fb_id) => async dispatch => {
  const examToken = otp;
  dispatch({ type: OTP_REQUEST });
  try {
    const res = await _axios().post("verifyExamToken", {
      fb_id,
      examToken
    });
    PubSub.publish("FIREBASE_VERIFY_OTP_SUCCESS", {
      API_URL,
      email,
      fb_id,
      examToken,
      res
    });
    dispatch({ type: OTP_SUCCESS, payload: res });
  } catch (err) {
    if (err.response) {
      if (err.response.data.message === "Invalid OTP") {
        PubSub.publish("FIREBASE_VERIFY_OTP_FAILURE", {
          API_URL,
          email,
          fb_id,
          examToken,
          err
        });
        dispatch({ type: OTP_FAILED, payload: err.response.data });
      } else {
        dispatch({ type: OTP_ERROR });
      }
    } else if (err.message) {
      dispatch({ type: OTP_FAILED, payload: { msg: err.message } });
    }
  }
};

//Action for adding new component
export const addCandidate = data => async dispatch => {
  dispatch({ type: ADD_CANDIDATE_REQUEST });
  try {
    const res = await _axios().post("addCandidateWithBase64File", {...data});
    dispatch({ type: ADD_CANDIDATE_SUCCESS, payload: res });
  } catch (err) {
    if (err.message) {
      dispatch({
        type: ADD_CANDIDATE_FAILURE,
        payload: { msg: err.message }
      });
    } else {
      dispatch({ type: ADD_CANDIDATE_FAILURE });
    }
  }
};

//Action for getting questions for candidate
export const getQuestions = (email, fb_id) => async dispatch => {
  try {
    const res = await _axios().get(`getQuestinsForCandidate/${fb_id}`);
    PubSub.publish("FIREBASE_GET_QUESTION_SUCCESS", {
      API_URL,
      email,
      fb_id,
      res
    });
    dispatch({ type: QUESTIONS_SUCCESS, payload: res });
  } catch (err) {
    if (err.message == "timeout of 10000ms exceeded") {
      // Show alert about timeout to user
      dispatch({ type: QUESTIONS_FAILURE, payload: { msg: err.message } });
    } else {
      PubSub.publish("FIREBASE_GET_QUESTION_FAILURE", {
        API_URL,
        email,
        fb_id,
        err
      });
      dispatch({ type: QUESTIONS_FAILURE, payload: err.response.data });
    }
  }
};

// Action to call for HR help

export const callingHelp = (accessToken, fb_id) => async dispatch => {
  dispatch({ type: CALL_HELP_REQUEST });
  try {
    const res = await _axios().post("askHrForHelp?accessToken=${accessToken}", {
      fb_id
    });
    dispatch({ type: CALL_HELP_SUCCESS, payload: res });
  } catch (err) {
    if (err.message) {
      // Show alert about timeout to user
      dispatch({ type: CALL_HELP_FAILURE, payload: { msg: err.message } });
    } else {
      dispatch({ type: CALL_HELP_FAILURE });
    }
  }
};

// Action for submitting Test
export const submitTest = (email, data) => async dispatch => {
  dispatch({ type: SUBMIT_TEST_REQUEST });
  try {
    const res = await _axios().post("submitExam", {
      ...data
    });
    PubSub.publish("FIREBASE_SUBMIT_TEST_SUCCESS", {
      API_URL,
      email,
      data,
      res
    });
    dispatch({ type: SUBMIT_TEST_SUCCESS, payload: res });
  } catch (err) {
    if (err.message) {
      // Show alert about timeout to user
      dispatch({ type: SUBMIT_TEST_FAILURE, payload: { msg: err.message } });
    } else {
      PubSub.publish("FIREBASE_SUBMIT_TEST_FAILURE", {
        API_URL,
        email,
        data,
        err
      });
      dispatch({ type: SUBMIT_TEST_FAILURE });
    }
  }
};

export const connectionState = isConnected => async dispatch => {
  dispatch({ type: CHANGE_CONNECTION_STATUS, payload: isConnected });
};

export const getCandidateDetails = fb_id => async dispatch => {
  try {
    const res = await _axios().get(`candidateDetails/${fb_id}`);
    PubSub.publish("CANDIDATE_DETAILS_SUCCESS", { API_URL, fb_id, res });
    dispatch({ type: CANDIDATE_DETAILS_SUCCESS, payload: res.data });
  } catch (err) {
    if (err.message == "timeout of 10000ms exceeded") {
      // Show alert about timeout to user
      dispatch({
        type: CANDIDATE_DETAILS_FAILURE,
        payload: { msg: err.message }
      });
    } else {
      PubSub.publish("CANDIDATE_DETAILS_FAILURE", {
        API_URL,
        email,
        fb_id,
        err
      });
      dispatch({ type: CANDIDATE_DETAILS_FAILURE, payload: err.response.data });
    }
  }
};

export const getCandidateRoundDetails = fb_id => async dispatch => {
  try {
    const res = await _axios().get(`candidateExamRoundDetails/${fb_id}`);
    dispatch({ type: CANDIDATE_ROUND_DETAILS_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);
    if (err.message == "timeout of 10000ms exceeded") {
      // Show alert about timeout to user
      dispatch({
        type: CANDIDATE_ROUND_DETAILS_FAILURE,
        payload: { msg: err.message }
      });
    } else {
      dispatch({
        type: CANDIDATE_ROUND_DETAILS_FAILURE,
        payload: err.response.data
      });
    }
  }
};
