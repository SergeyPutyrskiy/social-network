import { ofType, combineEpics } from "redux-observable";
import { mergeMap, catchError, tap } from "rxjs/operators";
import { of, from, empty } from "rxjs";
import history from "../../services/history";
import { signInCompleted, signInFailed } from "../../store/signin/actions";
import * as types from "./types";
import { USER_AUTH_TOKEN_KEYS, BEARER } from "../../constants/common";

const signInEpic = ($action, state, { user }) =>
  $action.pipe(
    ofType(types.SIGN_IN_START),
    mergeMap(action =>
      from(user.signIn(action.userData)).pipe(
        mergeMap(({ data, data: { accessToken, refreshToken } }) => {
          try {
            localStorage.setItem(
              USER_AUTH_TOKEN_KEYS,
              JSON.stringify({
                accessToken: `${BEARER} ${accessToken}`,
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
