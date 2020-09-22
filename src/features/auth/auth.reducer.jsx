import { handleActions } from "redux-actions";
import { logInUser, signOutUser } from "./auth.action";

const initialState = {
  currentUser: {},
  authenticated: false,
};

export const authReducer = handleActions(
  {
    [logInUser]: (state, { payload }) => {
      return { ...state, authenticated: true, currentUser: payload };
    },
    [signOutUser]: (state) => {
      return initialState;
    },
  },
  initialState
);
