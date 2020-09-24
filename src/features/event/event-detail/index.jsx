/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";

import EventDetailChat from "./event-detail-chat";
import EventDetailHeader from "./event-detail-header";
import EventDetailInfo from "./event-detail-info";
import EventDetailSideBar from "./event-detail-sidebar";
import LoadingComponent from "../../../app/layout/loading";
import { useFirestore } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";

function EventDetail({ match, history }) {
  const eventId = match.params.id;
  const [localEvent, setLocalEvent] = useState(null);
  const firestore = useFirestore();

  useEffect(() => {
    async function findEvent() {
      let event = await firestore.get(`events/${eventId}`);
      if (!event.exists) {
        history.push("/events");
        toastr.error("Error", "Event not found");
      } else {
        setLocalEvent({ ...event.data(), id: eventId });
      }
    }
    findEvent();
  }, []);

  return !localEvent ? (
    <LoadingComponent />
  ) : (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={localEvent} />
        <EventDetailInfo event={localEvent} />
        <EventDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSideBar attendees={localEvent.attendees} />
      </Grid.Column>
    </Grid>
  );
}

export default EventDetail;
