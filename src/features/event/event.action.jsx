import { createAction } from "redux-actions";
import { toastr } from "react-redux-toastr";
import { createNewEvent } from "../../app/utils/helper";
import firebase from "../../app/config/firebase";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../async/async.action";

export const fetchEvents = createAction("FETCH_EVENTS");
export const createEventType = createAction("CREATE_EVENT");
export const updateEventType = createAction("UPDATE_EVENT");

export const deleteEvent = (eventId) => {
  return async (_dispatch, _getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const user = getFirebase().auth().currentUser;
    try {
      await firestore.delete(`event_attendee/${eventId}_${user.uid}`);
      await firestore.delete(`events/${eventId}`);

      toastr.success("Success", "Event has beed deleted");
    } catch (err) {
      console.log(err);
      toastr.error("Oops", "Something went wrong");
    }
  };
};

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
  return async (dispatch, _getState, { getFirestore }) => {
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

export const cancelToggle = (cancelled, eventId) => {
  return async (_dispatch, _getState, { getFirestore }) => {
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

export const getEventsForDashBoard = () => {
  return async (dispatch, getState) => {
    dispatch(asyncActionStart());
    const today = new Date();
    const firestore = firebase.firestore();
    const eventQuery = firestore
      .collection("events")
      .where("date", ">=", today);
    try {
      const querySnap = await eventQuery.get();
      const events = [];

      for (let i = 0; i < querySnap.docs.length; ++i) {
        let event = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
        events.push(event);
      }
      dispatch(fetchEvents(events));
      dispatch(asyncActionFinish());
    } catch (err) {
      console.log(err);
      dispatch(asyncActionError());
    }
  };
};
