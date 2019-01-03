import * as types from "./types";

export const signUpStart = userData => ({
  type: types.SIGN_UP_START,
  userData
});
