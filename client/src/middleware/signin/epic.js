import { ofType, combineEpics } from "redux-observable";
import { mergeMap, catchError, tap } from "rxjs/operators";
import { of, from, empty } from "rxjs";
import history from "../../services/history";
import { signInCompleted, signInFailed } from "../../store/user/actions";
import * as types from "./types";
import { USER_AUTH_TOKEN_KEY } from "../../constants/common";

const signInEpic = ($action, state, { user }) =>
  $action.pipe(
    ofType(types.SIGN_IN_START),
    mergeMap(action =>
      from(user.signIn(action.userData)).pipe(
        mergeMap(({ data, data: { accessToken, refreshToken } }) => {
          try {
            localStorage.setItem(
              USER_AUTH_TOKEN_KEY,
              JSON.stringify({
                accessToken,
                refreshToken
              })
            );
            return of(signInCompleted(data)).pipe(
              tap(() => history.push("/profile"))
            );
          } catch (error) {
            return empty();
          }
        })
      )
    ),
    catchError(({ response }) => of(signInFailed(response.data.error)))
  );

export default combineEpics(signInEpic);
