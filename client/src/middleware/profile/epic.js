import { ofType, combineEpics } from "redux-observable";
import {
  mergeMap,
  catchError,
  takeUntil,
  take,
  merge,
  switchMap
} from "rxjs/operators";
import { of, from, defer } from "rxjs";
import {
  getProfileCompleted,
  getProfileFailed
} from "../../store/profile/actions";
import * as types from "./types";
import * as signInTypes from "../../store/signin/types";
import { getAuthTokensStart } from "../signin/actions";

const getProfileEpic = ($action, state, { user }) =>
  $action.pipe(
    ofType(types.GET_PROFILE_START),
    switchMap(() =>
      defer(() => {
        const { accessToken, user: profile } = state.value.user.data;

        return from(user.getUser(accessToken, profile.id));
      }).pipe(
        mergeMap(({ data }) => of(getProfileCompleted(data))),
        catchError(({ response }, source) => {
          if (response.status === 401) {
            return $action.pipe(
              ofType(signInTypes.GET_AUTH_TOKENS_COMPLETED),
              takeUntil(
                $action.pipe(ofType(signInTypes.GET_AUTH_TOKENS_FAILED))
              ),
              take(1),
              mergeMap(() => source),
              merge(of(getAuthTokensStart()))
            );
          }

          return of(getProfileFailed(response.data.error));
        })
      )
    )
  );

export default combineEpics(getProfileEpic);
