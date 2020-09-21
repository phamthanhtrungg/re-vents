import React from "react";
import { Grid } from "semantic-ui-react";
import EventDetailChat from "./event-detail-chat";
import EventDetailHeader from "./event-detail-header";
import EventDetailInfo from "./event-detail-info";
import EventDetailSideBar from "./event-detail-sidebar";

function EventDetail() {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader />
        <EventDetailInfo />
        <EventDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSideBar />
      </Grid.Column>
    </Grid>
  );
}

export default EventDetail;
