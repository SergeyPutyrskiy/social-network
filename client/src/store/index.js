import { combineReducers } from "redux";
import signin from "./signin";
import user from "./user";

export default combineReducers({
  signin,
  user
});
