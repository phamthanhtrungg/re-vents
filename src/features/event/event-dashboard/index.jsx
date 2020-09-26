/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Grid, Loader } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import EventList from "../event-list/event-list";
import { deleteEvent } from "../event.action";
import LoadingComponent from "../../../app/layout/loading";
import EventActivity from "../event-activity";
import { useFirebase } from "react-redux-firebase";

function EventDashboard() {
  const [localEvents, setLocalEvents] = useState([]);
  const [tempEvents, setTempEvents] = useState([]);
  const [moreEvent, setMoreEvent] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingEvent, setLoadingEvent] = useState(false);
  const firebase = useFirebase();

  const dispatch = useDispatch();
  const getEventsForDashBoard = async (lastEvent) => {
    const today = new Date();
    const firestore = firebase.firestore();
    const eventRef = firestore.collection("events");

    try {
      setLoadingEvent(true);
      const startAfter =
        lastEvent &&
        (await firestore.collection("events").doc(lastEvent.id).get());
      let query;

      lastEvent
        ? (query = eventRef
            .where("date", ">=", today)
            .orderBy("date")
            .startAfter(startAfter)
            .limit(2))
        : (query = eventRef
            .where("date", ">=", today)
            .orderBy("date")
            .limit(2));
      console.log("get here");
      const querySnap = await query.get();
      const events = [];

      if (querySnap.docs.length === 0) {
        setLoadingEvent(false);
        return querySnap;
      }

      for (let i = 0; i < querySnap.docs.length; ++i) {
        let event = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
        events.push(event);
      }

      setTempEvents(events);
      setLoadingEvent(false);
      return querySnap;
    } catch (err) {
      console.log(err);
      setLoadingEvent(false);
    }
  };

  useEffect(() => {
    window.scroll({
      behavior: "smooth",
      top: 0,
      left: 0,
    });
    const fetchEvent = async () => {
      const next = await getEventsForDashBoard();
      if (next && next.docs && next.docs.length >= 1) {
        setMoreEvent(true);
      }
      setLoadingInitial(false);
    };
    fetchEvent();
  }, []);

  useEffect(() => {
    setLocalEvents([...localEvents, ...tempEvents]);
  }, [tempEvents]);

  const getNextEvents = async () => {
    const lastEvent = localEvents[localEvents.length - 1];
    const next = await getEventsForDashBoard(lastEvent);

    if (next && next.docs && next.docs.length < 1) {
      setMoreEvent(false);
    }
  };

  const handleDeleteEvent = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  return loadingInitial ? (
    <LoadingComponent />
  ) : (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          loading={loadingEvent}
          moreEvents={moreEvent}
          getMoreEvents={getNextEvents}
          events={localEvents}
          handleDeleteEvent={handleDeleteEvent}
        />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventActivity />
      </Grid.Column>

      <Grid.Column width={10}>
        <Loader active={loadingEvent} />
      </Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
