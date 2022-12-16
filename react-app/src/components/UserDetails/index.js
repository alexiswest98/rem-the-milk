import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UserDetails from './details';

function GetUserDetailsModal(user) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
      onClick={() => setShowModal(true)}>Get UserDetails</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UserDetails setShowModal={setShowModal} user={user}/>
        </Modal>
      )}
    </>
  );
}

export default GetUserDetailsModal;
