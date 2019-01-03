import * as types from "./types";

const initialState = {
  inProgress: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.LOG_OUT_START:
      return { ...state, inProgress: true };
    case types.LOG_OUT_COMPLETED:
      return { ...state, inProgress: false };
    case types.LOG_OUT_FAILED:
      return { ...state, inProgress: false, error: action.error };
    default:
      return state;
  }
};

export default user;
