import { createAction } from "redux-actions";
import { fetchData } from "../../app/data/mock-api";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../async/async.action";

export const createEvent = createAction("CREATE_EVENT", (event) => event);
export const updateEvent = createAction(
  "UPDATE_EVENT",
  (updatedEvent) => updatedEvent
);
export const deleteEvent = createAction("DELETE_EVENT", (eventId) => eventId);
export const fetchEvents = createAction("FETCH_EVENTS");

export const loadEvents = () => {
  return async (dispatch) => {
    try {
      dispatch(asyncActionStart());
      let events = await fetchData();
      dispatch(fetchEvents(events));
      dispatch(asyncActionFinish());
    } catch (err) {
      console.log(err);
      dispatch(asyncActionError(err));
    }
  };
};
