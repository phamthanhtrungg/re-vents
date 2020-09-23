import React from "react";
import { Grid } from "semantic-ui-react";
import { useSelector } from "react-redux";

import EventDetailChat from "./event-detail-chat";
import EventDetailHeader from "./event-detail-header";
import EventDetailInfo from "./event-detail-info";
import EventDetailSideBar from "./event-detail-sidebar";
import LoadingComponent from "../../../app/layout/loading";

function EventDetail({ match }) {
  const eventId = match.params.id;
  const events = useSelector((state) => state.events);
  const event = events.filter((event) => event.id === eventId)[0];
  return !event ? (
    <LoadingComponent />
  ) : (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event} />
        <EventDetailInfo event={event} />
        <EventDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSideBar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  );
}

export default EventDetail;
