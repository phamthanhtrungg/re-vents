import { handleActions } from "redux-actions";
import { fetchEvents } from "./event.action";

const initialState = [];

export const eventReducer = handleActions(
  {
    [fetchEvents]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);
