import React from 'react';
import { ImCross } from 'react-icons/im';
import "./Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-wrapper">
          <div className="overlay"></div>
          <div className="modal-content">
            {children}
            <button className="close-button" onClick={onClose}>
              <ImCross className="close-icon" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
