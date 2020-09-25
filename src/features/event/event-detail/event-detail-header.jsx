import React from "react";
import { Link } from "react-router-dom";
import { Segment, Image, Item, Button, Header } from "semantic-ui-react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { cancelGoingToEvent, goingToEvent } from "../../auth/auth.action";

const eventImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  color: "white",
};

function EventDetailHeader({ event, isHost, isGoing }) {
  const dispatch = useDispatch();
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={process.env.PUBLIC_URL + `/assets/${event.category}.jpeg`}
          fluid
          alt=""
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: "white" }}
                />
                <p>{moment(event.date.toDate()).format("DD/MM/yyyy HH:mm")}</p>
                <p>
                  Hosted by{" "}
                  <Link
                    to={`/profile/${event.hostUid}`}
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    {event.hostedBy}
                  </Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        {!isHost && (
          <>
            {isGoing ? (
              <Button
                onClick={() => {
                  dispatch(cancelGoingToEvent(event));
                }}
              >
                Cancel My Place
              </Button>
            ) : (
              <Button
                color="teal"
                onClick={() => {
                  dispatch(goingToEvent(event));
                }}
              >
                JOIN THIS EVENT
              </Button>
            )}
          </>
        )}

        {isHost && (
          <Button color="orange" as={Link} to={`/manage/${event.id}`}>
            Manage Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
}

export default EventDetailHeader;
