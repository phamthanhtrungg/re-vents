import React from "react";
import { Button, Icon, Item, List, Segment, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import EventListAttendee from "./event-list-attendee";
import moment from "moment";
import { useSelector } from "react-redux";

function EventListItem({ event, handleDeleteEvent }) {
  const {
    title,
    date,
    description,
    venue,
    hostedBy,
    hostPhotoURL,
    attendees,
    cancelled,
  } = event;
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={hostPhotoURL} alt="" />
            <Item.Content>
              <Item.Header>{title}</Item.Header>
              <Item.Description>
                Hosted by{" "}
                <Link to={`/profile/${event.hostUid}`} href="/">
                  {hostedBy}
                </Link>
              </Item.Description>
              {cancelled && (
                <Label ribbon="right" color="red" style={{ top: "-40px" }}>
                  This event has been cancelled
                </Label>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {moment(date.toDate()).fromNow()} |
          <Icon name="marker" /> {venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {attendees &&
            Object.keys(attendees).map((attendeeKey) => (
              <EventListAttendee
                key={attendeeKey}
                {...attendees[attendeeKey]}
                attendeeId={attendeeKey}
              />
            ))}
        </List>
      </Segment>
      <Segment clearing>
        <span>{description}</span>
        {event.hostUid === auth.uid && (
          <Button
            color="red"
            floated="right"
            onClick={() => handleDeleteEvent(event.id)}
          >
            Delete
          </Button>
        )}
        <Button
          as={Link}
          to={`/events/${event.id}`}
          color="teal"
          floated="right"
        >
          View
        </Button>
      </Segment>
    </Segment.Group>
  );
}

export default EventListItem;
