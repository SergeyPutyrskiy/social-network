import { ofType, combineEpics } from "redux-observable";
import { mergeMap, catchError, tap } from "rxjs/operators";
import { of, from } from "rxjs";
import history from "../../services/history";
import { signUpCompleted, signUpFailed } from "../../store/signup/actions";
import * as types from "./types";

const signUpEpic = ($action, state, { user }) =>
  $action.pipe(
    ofType(types.SIGN_UP_START),
    mergeMap(action =>
      from(user.signUp(action.userData)).pipe(
        mergeMap(() =>
          of(signUpCompleted()).pipe(tap(() => history.push("/signin")))
        )
      )
    ),
    catchError(({ response }) => of(signUpFailed(response.data.error)))
  );

export default combineEpics(signUpEpic);
