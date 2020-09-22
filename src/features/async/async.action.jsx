import { createAction } from "redux-actions";

export const asyncActionStart = createAction("ASYNC_ACTION_START");
export const asyncActionFinish = createAction("ASYNC_ACTION_FINISH");
export const asyncActionError = createAction("ASYNC_ACTION_ERROR");
