import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { modalReducer } from "../../features/modal/modal.reducer";
import { authReducer } from "../../features/auth/auth.reducer";
import { asyncReducer } from "../../features/async/async.reducer";
import { reducer as toastrReducer } from "react-redux-toastr";
import { getFirebase, firebaseReducer } from "react-redux-firebase";
import {
  reduxFirestore,
  getFirestore,
  firestoreReducer,
} from "redux-firestore";
import firebase from "../config/firebase";

const rootReducer = combineReducers({
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  toastr: toastrReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
const middlewareEnhancer = applyMiddleware(...middlewares);
const storeEnhancer = [middlewareEnhancer];
const composedEnhander = composeWithDevTools(
  ...storeEnhancer,
  reduxFirestore(firebase)
);

const store = createStore(rootReducer, composedEnhander);

export { store };
