import * as types from "./types";

const initialState = {
  inProgress: false,
  isAuthenticated: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_IN_START:
      return { ...state, inProgress: true };
    case types.SIGN_IN_COMPLETED:
      return {
        ...state,
        data: action.data,
        inProgress: false,
        isAuthenticated: true
      };
    case types.SIGN_IN_FAILED:
      return { ...state, inProgress: false, error: action.error };
    case types.GET_AUTH_TOKENS_COMPLETED:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.tokens
        },
        inProgress: false
      };
    case types.GET_AUTH_TOKENS_FAILED:
      return { ...state, inProgress: false, error: action.error };
    case types.LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default user;
