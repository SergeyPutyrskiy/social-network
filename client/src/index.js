import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import App from "./App";
import rootReducer from "./store";
import { rootEpic, epicMiddleware } from "./middleware";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["profile"]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
);
const persistor = persistStore(store);
epicMiddleware.run(rootEpic);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
