import {
  ADD_CANDIDATE_REQUEST,
  ADD_CANDIDATE_SUCCESS,
  ADD_CANDIDATE_FAILURE,
  CANDIDATE_UPDATE_VALUE,
  CANDIDATE_INTERVIEW_REQUEST,
  CANDIDATE_INTERVIEW_SUCCESS,
  CANDIDATE_INTERVIEW_ERROR,
  ADD_NEW_CANDIDATE_REQUEST,
  ADD_NEW_CANDIDATE_SUCCESS,
  ADD_NEW_CANDIDATE_ERROR,
  GET_EXAM_QUESTIONS_REQUEST,
  GET_EXAM_QUESTIONS_SUCCESS,
  GET_EXAM_QUESTIONS_ERROR,
} from '../actions/types';
const initialState = {
  adding: false,
  candidateInterview: {
    isSuccess: false,
    isLoading: false,
    isError: false,
    data:{}
  },
  addNewUser: {
    isSuccess: false,
    isLoading: false,
    data: {},
    isError: false,
  },
  getExamQuestions: {
    isSuccess: false,
    isLoading: false,
    isError: false,
    data: {},
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EXAM_QUESTIONS_REQUEST:
      return {
        ...state,
        getExamQuestions: {isSuccess: false, isLoading: true, isError: false},
      };
      break;
    case GET_EXAM_QUESTIONS_SUCCESS:
      return {
        ...state,
        getExamQuestions: {isSuccess: true, isLoading: false, isError: false},
      };
      break;
    case GET_EXAM_QUESTIONS_ERROR:
      return {
        ...state,
        getExamQuestions: {
          isSuccess: false,
          isLoading: false,
          isError: true,
        },
      };
      break;

    case CANDIDATE_INTERVIEW_REQUEST:
      return {
        ...state,
        candidateInterview: {isSuccess: false, isLoading: true, isError: false},
      };
      break;
    case CANDIDATE_INTERVIEW_SUCCESS:
      return {
        ...state,
        candidateInterview: {isSuccess: true, isLoading: false, isError: false, data:action.payload},
      };
      break;
    case CANDIDATE_INTERVIEW_ERROR:
      return {
        ...state,
        candidateInterview: {
          isSuccess: false,
          isLoading: false,
          isError: true,
        },
      };
      break;
    case ADD_NEW_CANDIDATE_REQUEST:
      return {
        ...state,
        addNewUser: {isSuccess: false, isLoading: true, isError: false},
      };
      break;
    case ADD_NEW_CANDIDATE_SUCCESS:
      return {
        ...state,
        addNewUser: {
          isSuccess: true,
          isLoading: false,
          isError: false,
          data: action.payload,
        },
      };
      break;
    case ADD_NEW_CANDIDATE_ERROR:
      return {
        ...state,
        addNewUser: {isSuccess: false, isLoading: false, isError: true},
      };
      break;
    case ADD_CANDIDATE_REQUEST:
      return {state};
      break;
    case ADD_CANDIDATE_SUCCESS:
      return {...state, adding: false, ...action.payload};
      break;
    case ADD_CANDIDATE_FAILURE:
      return {...state, success: false, ...action.payload};
      break;
    default:
      return state;
      break;
  }
}
