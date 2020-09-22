import React from "react";
import { Icon, Segment } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";
const Marker = ({ text }) => <Icon color="red" name="marker" size="large" />;

const EventDetailMap = (props) => {
  return (
    <Segment attached="bottom">
      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GG_API_KEY }}
          defaultCenter={props.center}
          defaultZoom={props.zoom}
        >
          <Marker
            lat={props.center.lat}
            lng={props.center.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export default EventDetailMap;
