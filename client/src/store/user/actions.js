import * as types from "./types";

export const getUserCompleted = data => ({
  type: types.GET_USER_COMPLETED,
  data
});

export const getUserFailed = error => ({
  type: types.GET_USER_FAILED,
  error
});
