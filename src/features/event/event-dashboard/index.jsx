import React from "react";
import { Grid } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import EventList from "../event-list/event-list";
import { deleteEvent } from "../event.action";

function EventDashboard() {
  const events = useSelector((state) => state.events);
  const dispatch = useDispatch();

  const handleDeleteEvent = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} handleDeleteEvent={handleDeleteEvent} />
      </Grid.Column>
      <Grid.Column width={6}></Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
