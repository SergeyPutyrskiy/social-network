import { combineReducers } from "redux";
import user from "./signin";
import profile from "./profile";

export default combineReducers({
  user,
  profile
});
