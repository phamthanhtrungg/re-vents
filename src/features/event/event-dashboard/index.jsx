/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import EventList from "../event-list/event-list";
import { deleteEvent, getEventsForDashBoard } from "../event.action";
import LoadingComponent from "../../../app/layout/loading";
import EventActivity from "../event-activity";

function EventDashboard() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const loading = useSelector((state) => state.async.loading);
  useEffect(() => {
    dispatch(getEventsForDashBoard());
  }, []);
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
      <Grid.Column width={6}>
        <EventActivity />
      </Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
