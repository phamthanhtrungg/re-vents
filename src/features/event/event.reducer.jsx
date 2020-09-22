import { handleActions } from "redux-actions";
import {
  createEvent,
  deleteEvent,
  fetchEvents,
  updateEvent,
} from "./event.action";

const initialState = [];

export const eventReducer = handleActions(
  {
    [fetchEvents]: (state, { payload }) => {
      return payload;
    },
    [createEvent]: (state, { payload }) => {
      return [...state, payload];
    },
    [updateEvent]: (state, { payload }) => {
      return state.map((event) => {
        if (event.id === payload.id) {
          return Object.assign(event, payload);
        }
        return event;
      });
    },
    [deleteEvent]: (state, { payload }) => {
      return [...state.filter((event) => event.id !== payload)];
    },
  },
  initialState
);
