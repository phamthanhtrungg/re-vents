import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { eventReducer } from "../../features/event/event.reducer";
import { modalReducer } from "../../features/modal/modal.reducer";
import { authReducer } from "../../features/auth/auth.reducer";

const middleware = [thunk];

const rootReducer = combineReducers({
  events: eventReducer,
  modals: modalReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middleware)
    // other store enhancers if any
  )
);

export { store };
