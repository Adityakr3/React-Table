import React from 'react'
import './ModalComp.css'
import { createPortal } from "react-dom";

export const ModalComponent = (props) => {
  const { setModalOpen, children } = props;
  return createPortal(
    <div className="modal-div ">
      <button
        className="close"
        type="button"
        onClick={() => setModalOpen(false)}
      >
        Close
      </button>
      {children}
    </div>,
    document.body
  );
};