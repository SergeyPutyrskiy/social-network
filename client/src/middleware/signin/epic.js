import { ofType, combineEpics } from "redux-observable";
import { mergeMap, catchError, tap, switchMap } from "rxjs/operators";
import { of, from } from "rxjs";
import history from "../../services/history";
import {
  signInCompleted,
  signInFailed,
  getAuthTokensCompleted,
  getAuthTokensFailed
} from "../../store/signin/actions";
import * as types from "./types";
import { BEARER } from "../../constants/common";

const signInEpic = ($action, state, { user }) =>
  $action.pipe(
    ofType(types.SIGN_IN_START),
    mergeMap(action =>
      from(user.signIn(action.userData)).pipe(
        mergeMap(({ data, data: { accessToken } }) => {
          const dataWithBearer = {
            ...data,
            accessToken: `${BEARER} ${accessToken}`
          };

          return of(signInCompleted(dataWithBearer)).pipe(
            tap(() => history.push("/profile"))
          );
        })
      )
    ),
    catchError(({ response }) => of(signInFailed(response.data.error)))
  );

export const getAuthTokensEpic = ($action, state, { user }) =>
  $action.pipe(
    ofType(types.GET_AUTH_TOKENS_START),
    switchMap(() => {
      const { accessToken, refreshToken } = state.value.user.data;

      return from(user.reAuthenticate({ accessToken, refreshToken })).pipe(
        mergeMap(({ data, data: { accessToken } }) => {
          const dataWithBearer = {
            ...data,
            accessToken: `${BEARER} ${accessToken}`
          };

          return of(getAuthTokensCompleted(dataWithBearer));
        }),
        catchError(({ response }) =>
          of(getAuthTokensFailed(response.data.error))
        )
      );
    })
  );

export default combineEpics(signInEpic, getAuthTokensEpic);
