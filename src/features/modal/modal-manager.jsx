/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";
import LogInModal from "./login-modal";
import RegisterModal from "./register-modal";
import UnAuthModal from "./un-auth-modal";

const modalLookUp = {
  LogInModal,
  RegisterModal,
  UnAuthModal,
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
