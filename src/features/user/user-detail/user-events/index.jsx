/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Grid, Segment, Header, Card, Image, Tab } from "semantic-ui-react";
import { getUserEvents } from "../../../auth/auth.action";
import { Link } from "react-router-dom";

const panes = [
  { menuItem: "All events", pane: { key: "allEvents" } },
  { menuItem: "Past events", pane: { key: "pastEvents" } },
  { menuItem: "Future events", pane: { key: "futureEvents" } },
  { menuItem: "Hosting", pane: { key: "hosted" } },
];

function UserEvents({ uid, auth }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserEvents(uid));
  }, []);

  const events = useSelector((state) => state.events);
  const loading = useSelector((state) => state.async.loading);

  const changeTab = (e, data) => {
    dispatch(getUserEvents(uid, data.activeIndex));
  };

  return (
    <Grid.Column width={uid === auth.uid ? 12 : 16}>
      <Segment attached loading={loading}>
        <Header icon="calendar" content="Events" />
        <Tab
          panes={panes}
          menu={{ secondary: true, pointing: true }}
          onTabChange={(e, data) => {
            changeTab(e, data);
          }}
        />
        <br />

        <Card.Group itemsPerRow={5}>
          {events.map((event) => (
            <Card as={Link} to={`/events/${event.id}`} key={event.id}>
              <Image
                src={
                  event.photoURL ||
                  process.env.PUBLIC_URL + `/assets/${event.category}.jpeg`
                }
              />
              <Card.Content>
                <Card.Header textAlign="center">{event.title}</Card.Header>
                <Card.Meta textAlign="center">
                  <div>
                    {moment(event.date.toDate())
                      .format("dddd DD-MM-yyyy")
                      .toString()}
                  </div>
                  <div>
                    {moment(event.date.toDate()).format("HH:mm A").toString()}
                  </div>
                </Card.Meta>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
}

export default UserEvents;
