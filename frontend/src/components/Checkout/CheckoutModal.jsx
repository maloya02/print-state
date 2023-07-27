import React from 'react';
import Modal from 'react-modal';
import Payment from './Payment'; // Replace the path with the actual path to the Payment component

Modal.setAppElement('#root'); // Specify the root element of your app

const CheckoutModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Payment Modal"
    >
      <Payment />
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default CheckoutModal;
