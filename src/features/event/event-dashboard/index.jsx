import React from "react";
import { Grid } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import EventList from "../event-list/event-list";
import { deleteEvent } from "../event.action";
import LoadingComponent from "../../../app/layout/loading";

function EventDashboard() {
  const events = useSelector((state) => state.events);
  const { loading } = useSelector((state) => state.async);
  const dispatch = useDispatch();

  const handleDeleteEvent = (eventId) => {
    dispatch(deleteEvent(eventId));
  };
  return loading ? (
    <LoadingComponent />
  ) : (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} handleDeleteEvent={handleDeleteEvent} />
      </Grid.Column>
      <Grid.Column width={6}></Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
