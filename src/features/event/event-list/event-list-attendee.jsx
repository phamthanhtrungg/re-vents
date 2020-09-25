import React from "react";
import { Link } from "react-router-dom";
import { List, Image } from "semantic-ui-react";

function EventListAttendee({ photoURL, attendeeId }) {
  return (
    <List.Item>
      <Image
        as={Link}
        to={`/profile/${attendeeId}`}
        size="mini"
        circular
        src={photoURL}
        alt=""
      />
    </List.Item>
  );
}

export default EventListAttendee;
