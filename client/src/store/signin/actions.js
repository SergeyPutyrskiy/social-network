import * as types from "./types";

export const signInCompleted = data => ({
  type: types.SIGN_IN_COMPLETED,
  data
});
export const signInFailed = error => ({
  type: types.SIGN_IN_FAILED,
  error
});

export const getAuthTokensCompleted = tokens => ({
  type: types.GET_AUTH_TOKENS_COMPLETED,
  tokens
});

export const getAuthTokensFailed = error => ({
  type: types.GET_AUTH_TOKENS_FAILED,
  error
});

export const logOut = () => ({
  type: types.LOG_OUT
});
