import * as types from "./types";

export const signInStart = userData => ({
  type: types.SIGN_IN_START,
  userData
});

export const getAuthTokensStart = () => ({
  type: types.GET_AUTH_TOKENS_START
});
