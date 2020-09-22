import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

function LoadingComponent() {
  return (
    <Dimmer active inverted>
      <Loader inverted content="Loading" />
    </Dimmer>
  );
}

export default LoadingComponent;
