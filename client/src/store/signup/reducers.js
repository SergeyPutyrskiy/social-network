import * as types from "./types";

const initialState = {
  inProgress: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP_START:
      return { ...state, inProgress: true };
    case types.SIGN_UP_COMPLETED:
      return { ...state, inProgress: false };
    case types.SIGN_UP_FAILED:
      return { ...state, inProgress: false, error: action.error };
    default:
      return state;
  }
};

export default user;
