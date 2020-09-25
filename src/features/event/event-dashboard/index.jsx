import React from "react";
import { Grid } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import EventList from "../event-list/event-list";
import { deleteEvent } from "../event.action";
import LoadingComponent from "../../../app/layout/loading";
import EventActivity from "../event-activity";
import { useFirestoreConnect } from "react-redux-firebase";

function EventDashboard() {
  useFirestoreConnect([
    {
      collection: "events",
      storeAs: "events",
    },
  ]);

  const events = useSelector((state) => state.firestore?.ordered?.events);
  const dispatch = useDispatch();

  const handleDeleteEvent = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  return !events ? (
    <LoadingComponent />
  ) : (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={Object.keys(events).map((eventKey) => {
            return (
              events[eventKey] && {
                ...events[eventKey],
                id: eventKey,
              }
            );
          })}
          handleDeleteEvent={handleDeleteEvent}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventActivity />
      </Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
