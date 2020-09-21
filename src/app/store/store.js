import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { eventReducer } from "../../features/event/event.reducer";

const middleware = [thunk];

const rootReducer = combineReducers({
  events: eventReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middleware)
    // other store enhancers if any
  )
);

export { store };
