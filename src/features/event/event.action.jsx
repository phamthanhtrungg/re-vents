import { createAction } from "redux-actions";
import { toastr } from "react-redux-toastr";
import { createNewEvent } from "../../app/utils/helper";

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

export const addEventComment = (eventId, value, parentId) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const profile = getState().firebase.profile;
    const user = firebase.auth().currentUser;
    let newComment = {
      parentId,
      displayName: profile.displayName,
      photoURL: profile.photoURL || process.env.PUBLIC_URL + "/assets/user.png",
      uid: user.uid,
      text: value.comment,
      date: Date.now(),
    };
    try {
      await firebase.push(`event_chat/${eventId}`, newComment);
      toastr.success("Success", "New comment added");
    } catch (err) {
      console.log(err);
      toastr.error("Oops", "Something wrong happened");
    }
  };
};
