import { createAction } from "redux-actions";
import { toastr } from "react-redux-toastr";
import { fetchData } from "../../app/data/mock-api";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../async/async.action";

export const deleteEvent = createAction("DELETE_EVENT", (eventId) => eventId);
export const fetchEvents = createAction("FETCH_EVENTS");
export const createEventType = createAction("CREATE_EVENT");
export const updateEventType = createAction("UPDATE_EVENT");

export const createEvent = (newEvent) => {
  return async (dispatch) => {
    try {
      dispatch(createEventType(newEvent));
      toastr.success("Success", "Event has beed created");
    } catch (err) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};
export const updateEvent = (updatedEvent) => {
  return async (dispatch) => {
    try {
      dispatch(updateEventType(updatedEvent));
      toastr.success("Success", "Event has beed updated");
    } catch (err) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const loadEvents = () => {
  return async (dispatch) => {
    try {
      dispatch(asyncActionStart());
      let events = await fetchData();
      dispatch(fetchEvents(events));
      dispatch(asyncActionFinish());
    } catch (err) {
      dispatch(asyncActionError(err));
    }
  };
};
