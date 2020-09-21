import { createAction } from "redux-actions";

export const createEvent = createAction("CREATE_EVENT", (event) => event);
export const updateEvent = createAction(
  "UPDATE_EVENT",
  (updatedEvent) => updatedEvent
);
export const deleteEvent = createAction("DELETE_EVENT", (eventId) => eventId);
