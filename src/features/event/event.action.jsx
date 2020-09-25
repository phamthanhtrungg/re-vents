import { createAction } from "redux-actions";
import { toastr } from "react-redux-toastr";
import { fetchData } from "../../app/data/mock-api";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../async/async.action";
import { createNewEvent } from "../../app/utils/helper";

export const deleteEvent = createAction("DELETE_EVENT", (eventId) => eventId);
export const fetchEvents = createAction("FETCH_EVENTS");
export const createEventType = createAction("CREATE_EVENT");
export const updateEventType = createAction("UPDATE_EVENT");

export const createEvent = (event) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const user = getFirebase().auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    let newEvent = createNewEvent(user, photoURL, event);
    try {
      let createdEvent = await firestore.add(
        { collection: "events" },
        newEvent
      );

      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true,
      });
      dispatch(createEventType(event));
      toastr.success("Success", "Event has beed created");
    } catch (err) {
      console.log(err);
      toastr.error("Oops", "Something went wrong");
    }
  };
};
export const updateEvent = (event) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    try {
      await firestore.update(`events/${event.id}`, {
        ...event,
        venueLatLng: {
          lat: event.lat,
          lng: event.lng,
        },
      });

      dispatch(createEventType(event));
      toastr.success("Success", "Event has beed updated");
    } catch (err) {
      console.log("my event", event);
      console.log(err);
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

export const cancelToggle = (cancelled, eventId) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      await firestore.update(`events/${eventId}`, {
        cancelled,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
