import React from "react";
import { useDispatch } from "react-redux";
import { Menu, Button } from "semantic-ui-react";
import { resetAuthState } from "../../auth/auth.action";
import { openModal } from "../../modal/modal.action";

function SignOutMenu() {
  const dispatch = useDispatch();
  return (
    <Menu.Item position="right">
      <Button
        basic
        inverted
        content="Login"
        onClick={() => {
          dispatch(resetAuthState());
          dispatch(openModal({ modalType: "LogInModal" }));
        }}
      />
      <Button
        basic
        inverted
        content="Register"
        style={{ marginLeft: "1rem" }}
        onClick={() => {
          dispatch(openModal({ modalType: "RegisterModal" }));
        }}
      />
    </Menu.Item>
  );
}

export default SignOutMenu;
