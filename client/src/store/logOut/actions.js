import * as types from "./types";

export const logOutCompleted = () => ({
  type: types.LOG_OUT_COMPLETED
});

export const logOutFailed = error => ({
  type: types.LOG_OUT_FAILED,
  error
});
