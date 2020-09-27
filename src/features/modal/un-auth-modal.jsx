import React from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Modal, Button, Divider } from "semantic-ui-react";
import { closeModal, openModal } from "./modal.action";

function UnauthModal({ history }) {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    history.goBack();
    dispatch(closeModal());
  };
  const handleOpenModal = (name) => {
    dispatch(openModal({ modalType: name }));
  };
  return (
    <Modal size="mini" open={true} onClose={handleCloseModal}>
      <Modal.Header>You need to be signed in to do that!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>Please either login or register to see this page</p>
          <Button.Group widths={4}>
            <Button
              fluid
              color="teal"
              onClick={() => handleOpenModal("LogInModal")}
            >
              Login
            </Button>
            <Button.Or />
            <Button
              fluid
              positive
              onClick={() => handleOpenModal("RegisterModal")}
            >
              Register
            </Button>
          </Button.Group>
          <Divider />
          <div style={{ textAlign: "center" }}>
            <p>Or click cancel to continue as a guest</p>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </div>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default withRouter(UnauthModal);
