/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useSelector } from "react-redux";

import EventDetailChat from "./event-detail-chat";
import EventDetailHeader from "./event-detail-header";
import EventDetailInfo from "./event-detail-info";
import EventDetailSideBar from "./event-detail-sidebar";
import LoadingComponent from "../../../app/layout/loading";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";

function EventDetail({ match, history }) {
  const eventId = match.params.id;
  useFirestoreConnect([
    {
      collection: "events",
      doc: eventId,
      storeAs: "eventDetail",
    },
  ]);
  const event = useSelector((state) => state.firestore.data.eventDetail);
  const auth = useSelector((state) => state.firebase.auth);
  const firestore = useFirestore();

  useEffect(() => {
    async function findEvent() {
      let event = await firestore.get(`events/${eventId}`);

      if (!event.exists) {
        history.push("/error");
        toastr.error("Error", "Event not found");
      }
    }
    findEvent();
  }, [eventId]);

  const attendees = event?.attendees || [];
  const isHost = event?.hostUid === auth.uid;
  const isGoing = Object.keys(attendees).some((a) => a === auth.uid);
  const isAuthenticated = auth.isLoaded && !auth.isEmpty;
  return !event ? (
    <LoadingComponent />
  ) : (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader
          event={{ ...event, id: eventId }}
          isHost={isHost}
          isGoing={isGoing}
          isAuthenticated={isAuthenticated}
        />
        <EventDetailInfo event={{ ...event, id: eventId }} />
        {isAuthenticated && <EventDetailChat eventId={eventId} />}
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSideBar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  );
}

export default EventDetail;
