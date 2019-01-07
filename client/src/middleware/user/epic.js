import { ofType, combineEpics } from "redux-observable";
import { mergeMap, catchError } from "rxjs/operators";
import { of, from, empty } from "rxjs";
import { getUserCompleted, getUserFailed } from "../../store/user/actions";
import * as types from "./types";
import { USER_AUTH_TOKEN_KEYS } from "../../constants/common";

const getUserEpic = ($action, state, { user }) =>
  $action.pipe(
    ofType(types.GET_USER_START),
    mergeMap(() => {
      try {
        const { accessToken } = JSON.parse(
          localStorage.getItem(USER_AUTH_TOKEN_KEYS)
        );

        return from(user.getUser(accessToken)).pipe(
          mergeMap(({ data }) => of(getUserCompleted(data)))
        );
      } catch (error) {
        return empty();
      }
    }),
    catchError(({ response }) => of(getUserFailed(response.data.error)))
  );

export default combineEpics(getUserEpic);
