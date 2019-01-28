import * as types from "./types";

export const getProfileCompleted = data => ({
  type: types.GET_PROFILE_COMPLETED,
  data
});

export const getProfileFailed = error => ({
  type: types.GET_PROFILE_FAILED,
  error
});
