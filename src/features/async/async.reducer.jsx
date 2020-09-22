import { handleActions } from "redux-actions";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "./async.action";

const initialState = {
  loading: false,
};

export const asyncReducer = handleActions(
  {
    [asyncActionStart]: (state) => {
      return { ...state, loading: true };
    },
    [asyncActionFinish]: (state) => {
      return { ...state, loading: false };
    },
    [asyncActionError]: (state) => {
      return { ...state, loading: false };
    },
  },
  initialState
);
