import { ofType, combineEpics } from "redux-observable";
import { mergeMap, catchError, tap } from "rxjs/operators";
import { of, empty } from "rxjs";
import history from "../../services/history";
import { logOutCompleted, logOutFailed } from "../../store/logOut/actions";
import * as types from "./types";
import { USER_AUTH_TOKEN_KEY } from "../../constants/common";

const logOut = $action =>
  $action.pipe(
    ofType(types.LOG_OUT_START),
    mergeMap(() => {
      try {
        localStorage.removeItem(USER_AUTH_TOKEN_KEY);
        return of(logOutCompleted()).pipe(tap(() => history.push("/signin")));
      } catch (error) {
        return empty();
      }
    }),
    catchError(error => of(logOutFailed(error)))
  );

export default combineEpics(logOut);
