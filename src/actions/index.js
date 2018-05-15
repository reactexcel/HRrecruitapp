import axios from "axios";
import {
  INTERVIEW_EMAIL_SIGN_UP,
  INTERVIEW_EMAIL_SIGN_UP_REQUEST
} from "./types";
import { API_URL } from "../config/dev";

// Action for Signing Up with email to take interview test paper
export const signUp = (email) => async dispatch => {
  const profile_pic = `https://pikmail.herokuapp.com/${email}?size=60`;
  const appliedEmail = email;
  dispatch({ type: INTERVIEW_EMAIL_SIGN_UP_REQUEST });
  const res = await axios.post(`${API_URL}signup_login_fb`, {
    email,
    appliedEmail,
    profile_pic
  });
  dispatch({ type: INTERVIEW_EMAIL_SIGN_UP, payload: res.data });

};
