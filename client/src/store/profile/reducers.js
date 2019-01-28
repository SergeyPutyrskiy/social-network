import * as types from "./types";

const initialState = {
  inProgress: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROFILE_START:
      return { ...state, inProgress: true };
    case types.GET_PROFILE_COMPLETED:
      return { ...state, data: action.data.user, inProgress: false };
    case types.GET_PROFILE_FAILED:
      return { ...state, inProgress: false, error: action.error };
    default:
      return state;
  }
};

export default user;
