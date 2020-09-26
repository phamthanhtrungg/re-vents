import { toastr } from "react-redux-toastr";
import { createAction } from "redux-actions";
import { closeModal } from "../modal/modal.action";
import firebase from "../../app/config/firebase";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../async/async.action";
import { fetchEvents } from "../event/event.action";

export const registerUserFailed = createAction("REGISTER_USER_FAILED");
export const logInFailed = createAction("LOG_IN_FAILED");
export const resetAuthState = createAction("RESET_AUTH_STATE");

export const login = (data) => {
  return async (dispatch, _getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
      dispatch(closeModal());
    } catch (error) {
      dispatch(logInFailed(error));
    }
  };
};

export const registerUser = (user) => {
  return async (dispatch, _getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    try {
      //create user in auth
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);

      //update profile
      await firebase.auth().currentUser.updateProfile({
        displayName: user.displayName,
      });

      //create new profile in firestore
      const newUser = {
        displayName: user.displayName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await firestore
        .collection("users")
        .doc(`/${firebase.auth().currentUser.uid}`)
        .set({ ...newUser });
      dispatch(closeModal());
    } catch (error) {
      dispatch(registerUserFailed(error));
    }
  };
};

export const socialLogin = (selectedProvider) => {
  return async (dispatch, _getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      dispatch(closeModal());
      await firebase.login({
        type: "popup",
        provider: selectedProvider,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const goingToEvent = (event) => {
  return async (_dispatch, getState) => {
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser;
    const photoURL =
      getState().firebase.profile.photoURL ||
      process.env.PUBLIC_URL + "/assets/user.png";
    const attendee = {
      going: true,
      joinDate: Date.now(),
      photoURL,
      displayName: user.displayName,
      host: false,
    };
    try {
      const eventDocRef = firestore.collection("events").doc(event.id);
      const eventAttendeeDocRef = firestore
        .collection("event_attendee")
        .doc(`${event.id}_${user.uid}`);

      await firestore.runTransaction(async (transaction) => {
        await transaction.get(eventDocRef);
        transaction.update(eventDocRef, {
          [`attendees.${user.uid}`]: attendee,
        });

        transaction.set(eventAttendeeDocRef, {
          eventId: event.id,
          userUid: user.uid,
          eventDate: event.date,
          host: false,
        });
      });

      toastr.success("Success", "Join event successfully");
    } catch (err) {
      toastr.error("Oops", "Going to event failed");
      console.log(err);
    }
  };
};

export const cancelGoingToEvent = (event) => {
  return async (_dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const user = getFirebase().auth().currentUser;

    try {
      await firestore.update(`events/${event.id}`, {
        [`attendees.${user.uid}`]: firestore.FieldValue.delete(),
      });
      await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
      toastr.success("Success", "Cancel event successfully");
    } catch (err) {
      toastr.error("Oops", "Going to event failed");
      console.log(err);
    }
  };
};

export const getUserEvents = (userUid, activeTab) => {
  return async (dispatch, getState) => {
    dispatch(asyncActionStart());
    const firestore = firebase.firestore();
    const today = new Date();
    const eventsRefs = firestore.collection("event_attendee");
    let query;

    switch (activeTab) {
      case 1: //past events
        query = eventsRefs
          .where("userUid", "==", userUid)
          .where("eventDate", "<=", today)
          .orderBy("eventDate", "desc");
        break;
      case 2: //future events
        query = eventsRefs
          .where("userUid", "==", userUid)
          .where("eventDate", ">=", today)
          .orderBy("eventDate", "asc");
        break;
      case 3:
        query = eventsRefs
          .where("userUid", "==", userUid)
          .where("host", "==", true)
          .orderBy("eventDate", "desc");
        break;
      default:
        query = eventsRefs
          .where("userUid", "==", userUid)
          .orderBy("eventDate", "desc");
        break;
    }
    try {
      let querySnap = await query.get();
      const events = [];

      for (let i = 0; i < querySnap.docs.length; ++i) {
        let evt = await firestore
          .collection("events")
          .doc(querySnap.docs[i].data().eventId)
          .get();
        events.push({ ...evt.data(), id: evt.id });
      }
      dispatch(fetchEvents(events));
      dispatch(asyncActionFinish());
    } catch (err) {
      console.log(err);
      dispatch(asyncActionError());
    }
  };
};
