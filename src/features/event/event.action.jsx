import { createAction } from "redux-actions";
import { toastr } from "react-redux-toastr";
import { createNewEvent } from "../../app/utils/helper";
import firebase from "../../app/config/firebase";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../async/async.action";

export const resetEvents = createAction("RESET_EVENTS");
export const fetchEvents = createAction("FETCH_EVENTS");

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
        eventDate: new Date(event.date),
        host: true,
      });

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
      toastr.success("Success", "Event has beed updated");
    } catch (err) {
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

export const getEventsForDashBoard = (lastEvent) => {
  return async (dispatch) => {
    const today = new Date();
    const firestore = firebase.firestore();
    const eventRef = firestore.collection("events");

    try {
      dispatch(asyncActionStart());
      const startAfter =
        lastEvent &&
        (await firestore.collection("events").doc(lastEvent.id).get());
      let query;

      lastEvent
        ? (query = eventRef
            .where("date", ">=", today)
            .orderBy("date")
            .startAfter(startAfter)
            .limit(2))
        : (query = eventRef
            .where("date", ">=", today)
            .orderBy("date")
            .limit(2));

      const querySnap = await query.get();
      const events = [];

      if (querySnap.docs.length === 0) {
        dispatch(asyncActionFinish());
        return;
      }

      for (let i = 0; i < querySnap.docs.length; ++i) {
        let event = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
        events.push(event);
      }
      dispatch(fetchEvents(events));
      dispatch(asyncActionFinish());

      return querySnap;
    } catch (err) {
      console.log(err);
      dispatch(asyncActionError());
    }
  };
};
