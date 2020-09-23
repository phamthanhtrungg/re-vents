import React from "react";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import { Dimmer, Loader } from "semantic-ui-react";

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth))
    return (
      <Dimmer active inverted>
        <Loader inverted content="Loading..." />
      </Dimmer>
    );
  return children;
}

export default AuthIsLoaded;
