import { handleActions } from "redux-actions";
import { pick } from "lodash";
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
      return [
        ...state,
        {
          ...pick(payload, [
            "id",
            "title",
            "category",
            "description",
            "date",
            "venue",
          ]),
          venueLatLng: {
            lat: payload.lat,
            lng: payload.lng,
          },
        },
      ];
    },
    [updateEventType]: (state, { payload }) => {
      return state.map((event) => {
        if (event.id === payload.id) {
          return Object.assign(event, {
            ...pick(payload, [
              "id",
              "title",
              "category",
              "description",
              "date",
              "venue",
            ]),
            venueLatLng: {
              lat: payload.lat,
              lng: payload.lng,
            },
          });
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
