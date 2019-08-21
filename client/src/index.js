import React from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import App from "./App";
import { store, persistor } from "./store";
import registerServiceWorker from "./registerServiceWorker";

import "semantic-ui-css/semantic.min.css";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
