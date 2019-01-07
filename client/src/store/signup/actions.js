import * as types from "./types";

export const signUpCompleted = () => ({
  type: types.SIGN_UP_COMPLETED
});

export const signUpFailed = error => ({
  type: types.SIGN_UP_FAILED,
  error
});
