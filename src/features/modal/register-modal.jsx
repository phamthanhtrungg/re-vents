import React from "react";
import { Modal } from "semantic-ui-react";

import RegisterForm from "../auth/register/register-form";
import { useDispatch } from "react-redux";
import { closeModal } from "./modal.action";

const RegisterModal = () => {
  const dispatch = useDispatch();
  return (
    <Modal
      size="mini"
      open={true}
      onClose={() => {
        dispatch(closeModal());
      }}
    >
      <Modal.Header>Sign Up to Re-vents</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <RegisterForm />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default RegisterModal;
