const initialState = {
  data: {
    userName: "Test"
  }
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "TEST":
      return { ...state };
    default:
      return state;
  }
};

export default user;
