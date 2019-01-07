import { combineEpics } from "redux-observable";
import signinEpic from "./signin/epic";
import signupEpic from "./signup/epic";
import logOut from "./logOut/epic";
import user from "./user/epic";

export default combineEpics(signinEpic, signupEpic, logOut, user);
