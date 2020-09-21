import React from "react";
import { List, Image } from "semantic-ui-react";

function EventListAttendee({ photoURL }) {
  return (
    <List.Item>
      <Image as="a" size="mini" circular src={photoURL} alt="" />
    </List.Item>
  );
}

export default EventListAttendee;
