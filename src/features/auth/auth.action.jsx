import { createAction } from "redux-actions";
import { closeModal } from "../modal/modal.action";

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
