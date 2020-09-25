/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Grid, Loader } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import EventList from "../event-list/event-list";
import { deleteEvent, getEventsForDashBoard } from "../event.action";
import LoadingComponent from "../../../app/layout/loading";
import EventActivity from "../event-activity";

function EventDashboard() {
  const [moreEvent, setMoreEvent] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [localEvents, setLocalEvents] = useState([]);
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const loading = useSelector((state) => state.async.loading);

  useEffect(() => {
    window.scroll({
      behavior: "smooth",
      top: 0,
      left: 0,
    });
    const fetchEvent = async () => {
      const next = await dispatch(getEventsForDashBoard());
      if (next && next.docs && next.docs.length > 1) {
        setMoreEvent(true);
      }
      setLoadingInitial(false);
      setMounted(true);
    };
    fetchEvent();
  }, []);

  useEffect(() => {
    if (events) {
      setLocalEvents((state) => [...state, ...events]);
    }
  }, [events]);

  const getNextEvents = async () => {
    const lastEvent = events[events.length - 1];
    const next = await dispatch(getEventsForDashBoard(lastEvent));

    if (next && next.docs && next.docs.length <= 1) {
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
          loading={loading}
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
        <Loader active={loading} />
      </Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
