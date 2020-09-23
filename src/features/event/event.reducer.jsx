import { handleActions } from "redux-actions";
import {
  createEventType,
  deleteEvent,
  fetchEvents,
  updateEventType,
} from "./event.action";

const initialState = [];

export const eventReducer = handleActions(
  {
    [fetchEvents]: (state, { payload }) => {
      return payload;
    },
    [createEventType]: (state, { payload }) => {
      return [...state, payload];
    },
    [updateEventType]: (state, { payload }) => {
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
