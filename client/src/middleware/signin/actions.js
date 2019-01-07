import * as types from "./types";

export const signInStart = userData => ({
  type: types.SIGN_IN_START,
  userData
});
