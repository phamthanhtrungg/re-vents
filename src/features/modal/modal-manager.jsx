import React from "react";
import { useSelector } from "react-redux";
import LogInModal from "./login-modal";
import RegisterModal from "./register-modal";

const modalLookUp = {
  LogInModal,
  RegisterModal,
};

function ModalManager() {
  const modals = useSelector((state) => state.modals);
  let renderedModal = null;
  if (modals) {
    const { modalType, modalProps } = modals;
    const ModalComponent = modalLookUp[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }
  return renderedModal;
}

export default ModalManager;
