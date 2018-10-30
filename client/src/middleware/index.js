import { combineEpics } from "redux-observable";
import firstEpic from "./first/epic";

export default combineEpics(firstEpic);
