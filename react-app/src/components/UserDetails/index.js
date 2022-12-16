import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UserDetails from './details'

function GetUserDetailsModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
      onClick={() => setShowModal(true)}>Get Details</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UserDetails setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default GetUserDetailsModal;
