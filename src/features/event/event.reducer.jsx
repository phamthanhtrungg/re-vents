import { handleActions } from "redux-actions";
import { fetchEvents, resetEvents } from "./event.action";

const initialState = [];

export const eventReducer = handleActions(
  {
    [fetchEvents]: (_state, { payload }) => {
      return [...payload];
    },
    [resetEvents]: (state) => {
      return initialState;
    },
  },
  initialState
);
