import React from "react";
import { useDispatch } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { socialLogin } from "../auth.action";

function SocialLogin() {
  const dispatch = useDispatch();

  return (
    <div>
      <Button
        type="button"
        style={{ marginBottom: "10px" }}
        fluid
        color="facebook"
        onClick={() => {
          dispatch(socialLogin("facebook"));
        }}
      >
        <Icon name="facebook" /> Login with Facebook
      </Button>
      <Button
        type="button"
        fluid
        style={{ marginBottom: "10px" }}
        color="google plus"
        onClick={() => {
          dispatch(socialLogin("google"));
        }}
      >
        <Icon name="google plus" />
        Login with Google
      </Button>
      <Button
        type="button"
        fluid
        style={{ marginBottom: "10px" }}
        onClick={() => {
          dispatch(socialLogin("github"));
        }}
      >
        <Icon name="github" />
        Login with Github
      </Button>
      {/* <Button
        type="button"
        fluid
        color="twitter"
        onClick={() => {
          dispatch(socialLogin("twitter"));
        }}
      >
        <Icon name="twitter" />
        Login with Twitter
      </Button> */}
    </div>
  );
}

export default SocialLogin;
