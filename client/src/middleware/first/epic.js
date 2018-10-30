import { ofType } from "redux-observable";
import { mergeMap } from "rxjs/operators";
import { empty } from "rxjs";

const firstEpic = $action =>
  $action.pipe(
    ofType("ofType"),
    mergeMap(action => {
      console.log("action ", action);
      return empty();
    })
  );

export default firstEpic;
