import * as types from "./types";

const initialState = {
  inProgress: false
};

const signin = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_IN_START:
      return { ...state, inProgress: true };
    case types.SIGN_IN_COMPLETED:
      return { ...state, data: action.data, inProgress: false };
    case types.SIGN_IN_FAILED:
      return { ...state, inProgress: false, error: action.error };
    default:
      return state;
  }
};

export default signin;
