import React from "react";
import ReactDOM from "react-dom";
import { createEpicMiddleware } from "redux-observable";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import rootReducer from "./store";
import rootEpic from "./middleware";
import registerServiceWorker from "./registerServiceWorker";

const epicMiddleware = createEpicMiddleware();
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
