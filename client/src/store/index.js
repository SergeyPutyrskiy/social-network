import { combineReducers, createStore } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";

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

export const store = createStore(persistedReducer, composeWithDevTools());
export const persistor = persistStore(store);
