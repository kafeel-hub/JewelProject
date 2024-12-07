// src/store/store.js
// import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import demo from "../features/demo/demoSlice";
import auth from "../features/auth/authSlice";
import saga from "./sagaindex";
import rootReducer from "./rootReducer";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["demo", "auth"],
};
// const reducer = combineReducers({
//   demo,
// });
const persistedReducer = persistReducer(persistConfig, rootReducer);
let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(saga);
console.log(store.getState(), "store");

const persistor = persistStore(store);

export default store;
export { persistor };
