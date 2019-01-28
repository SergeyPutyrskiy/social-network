import { combineEpics, createEpicMiddleware } from "redux-observable";
import signinEpic from "./signin/epic";
import signupEpic from "./signup/epic";
import profile from "./profile/epic";

import user from "../api/user";

export const epicMiddleware = createEpicMiddleware({
  dependencies: {
    user
  }
});
export const rootEpic = combineEpics(signinEpic, signupEpic, profile);
