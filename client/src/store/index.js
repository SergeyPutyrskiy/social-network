import { combineReducers, createStore, applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";

import { rootEpic, epicMiddleware } from "../middleware";
import user from "./signin";
import profile from "./profile";

const rootReducer = combineReducers({
  user,
  profile
});
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["profile"]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
);
export const persistor = persistStore(store);

epicMiddleware.run(rootEpic);
