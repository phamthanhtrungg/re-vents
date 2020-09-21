import React from "react";
import { Menu, Button } from "semantic-ui-react";

function SignOutMenu() {
  return (
    <Menu.Item position="right">
      <Button basic inverted content="Login" />
      <Button
        basic
        inverted
        content="Register"
        style={{ marginLeft: "1rem" }}
      />
    </Menu.Item>
  );
}

export default SignOutMenu;
