import * as types from "./types";

export const signInCompleted = data => ({
  type: types.SIGN_IN_COMPLETED,
  data
});

export const signInFailed = error => ({
  type: types.SIGN_IN_FAILED,
  error
});
