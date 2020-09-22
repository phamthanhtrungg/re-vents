import { handleActions } from "redux-actions";
import { closeModal, openModal } from "./modal.action";

const initialState = null;

export const modalReducer = handleActions(
  {
    [openModal]: (state, { payload }) => {
      return payload;
    },
    [closeModal]: () => {
      return null;
    },
  },
  initialState
);
