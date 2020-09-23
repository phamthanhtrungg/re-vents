import { handleActions } from "redux-actions";
import { logInFailed, registerUserFailed, resetAuthState } from "./auth.action";

const initialState = {
  logInError: null,
  registerUserError: null,
};

export const authReducer = handleActions(
  {
    [logInFailed]: (state, { payload }) => {
      return { ...state, logInError: payload };
    },
    [registerUserFailed]: (state, { payload }) => {
      return { ...state, registerUserError: payload };
    },
    [resetAuthState]: (state) => initialState,
  },
  initialState
);
