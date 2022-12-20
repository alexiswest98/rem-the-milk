import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import Members from './members';
import { getFollowsThunk } from '../../store/follows';


function AddMemberModal(user) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const { groupId } = useParams
  const onCloseAction = () => {
    setShowModal(false)
    dispatch(getFollowsThunk())

  }

  return (
    <>
      <button
      className="logout-butt btn-1"
      onClick={() => setShowModal(true)}>Add members</button>
      {showModal && (
        <Modal onClose={() => onCloseAction()}>
          <Members setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default AddMemberModal;
