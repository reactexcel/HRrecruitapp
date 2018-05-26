import axios from "axios";
import {
  INTERVIEW_EMAIL_SIGN_UP,
  INTERVIEW_EMAIL_SIGN_UP_REQUEST,
  INTERVIEW_EMAIL_SIGN_UP_FAILURE
} from "./types";
import { OTP_REQUEST, OTP_SUCCESS, OTP_FAILED } from "./types";
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
import { API_URL } from "../config/dev";

const _axios = () => axios.create({ baseURL: API_URL });

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
    dispatch({ type: INTERVIEW_EMAIL_SIGN_UP, payload: res.data });
  } catch (err) {
    dispatch({ type: INTERVIEW_EMAIL_SIGN_UP_FAILURE });
  }
};

// Action for verifying with OTP
export const verifyingOTP = (otp, fb_id) => async dispatch => {
  const examToken = otp;
  dispatch({ type: OTP_REQUEST });
  try {
    const res = await _axios().post("verifyExamToken", {
      fb_id,
      examToken
    });
    dispatch({ type: OTP_SUCCESS, payload: res });
  } catch (err) {
    dispatch({ type: OTP_FAILED });
  }
};


//Action for adding new component
export const addCandidate = data => async dispatch => {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  const res = await _axios().post("addNewCandidate", {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formData
  });

  dispatch({ type: ADD_CANDIDATE, payload: res });
};

//Action for getting questions for candidate
export const getQuestions = fb_id => async dispatch => {
  try {
    const res = await _axios().get(`getQuestinsForCandidate/${fb_id}`);
    dispatch({ type: QUESTIONS_SUCCESS, payload: res });
  } catch (err) {
    dispatch({ type: QUESTIONS_FAILURE });
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
    dispatch({ type: CALL_HELP_FAILURE });
  }
};

// Action for submitting Test
export const submitTest = data => async dispatch => {
  dispatch({ type: SUBMIT_TEST_REQUEST });
  try {
    const res = await _axios().post("submitExam", {
      ...data
    });
    dispatch({ type: SUBMIT_TEST_SUCCESS, payload: res });
  } catch (err) {
    dispatch({ type: SUBMIT_TEST_FAILURE });
  }
};
