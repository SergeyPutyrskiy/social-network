import React from "react";
import ReactDOM from "react-dom";
import { createEpicMiddleware } from "redux-observable";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import "./index.css";
import App from "./App";
import rootReducer from "./store";
import rootEpic from "./middleware";
import registerServiceWorker from "./registerServiceWorker";
import user from "./api/user";

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    user
  }
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
);
epicMiddleware.run(rootEpic);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
