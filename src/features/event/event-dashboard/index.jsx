import React from "react";
import { Button, Grid } from "semantic-ui-react";
import EventForm from "../event-form";
import EventList from "../event-list/event-list";

function EventDashboard() {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList />
      </Grid.Column>
      <Grid.Column width={6}>
        <Button positive>Create Event</Button>
        <EventForm />
      </Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
