import React, { useState } from "react";
import { Segment, Grid, Icon, Button } from "semantic-ui-react";
import moment from "moment";
import EventDetailMap from "./event-detail-map";

function EventDetailInfo({ event }) {
  const [showMap, setShowMap] = useState(false);

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{event.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{moment(event.date).format("DD/MM/yyyy HH:mm")}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{event.venue}</span>
          </Grid.Column>

          <Grid.Column width={4}>
            <Button
              color="teal"
              size="tiny"
              content={showMap ? "Hide Map" : "Show Map"}
              onClick={toggleMap}
            />
          </Grid.Column>
          {showMap && (
            <EventDetailMap
              zoom={8}
              center={{
                lat: event.lat || 59.95,
                lng: event.lng || 30.33,
              }}
            />
          )}
        </Grid>
      </Segment>
    </Segment.Group>
  );
}

export default EventDetailInfo;
