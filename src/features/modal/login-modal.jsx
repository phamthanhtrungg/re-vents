import React from "react";
import { Modal } from "semantic-ui-react";

import LoginForm from "../auth/log-in/login-form";
import { useDispatch } from "react-redux";
import { closeModal } from "./modal.action";

const LoginModal = () => {
  const dispatch = useDispatch();
  return (
    <Modal
      size="mini"
      open={true}
      onClose={() => {
        dispatch(closeModal());
      }}
    >
      <Modal.Header>Login to Re-vents</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <LoginForm />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default LoginModal;
