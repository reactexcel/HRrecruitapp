import { createAction } from "redux-actions";
import * as constants from '../actions/types'

export const UploadProfile = createAction(constants.CANDIDATE_UPDATE_VALUE);
export const ProfileOnChange = createAction(constants.CANDIDATE_DATA_ONCHNAGE);

