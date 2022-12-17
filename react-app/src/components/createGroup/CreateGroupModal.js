import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';
// import Members from './members';
import { getGroupsThunk } from '../../store/groups';
import CreateAGroup from '.';


function AddGroupModal(user) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const onCloseAction = () => {
    setShowModal(false)
    dispatch(getGroupsThunk())

  }

  return (
    <>
      <button
      onClick={() => setShowModal(true)}>Create a group</button>
      {showModal && (
        <Modal onClose={() => onCloseAction()}>
          <CreateAGroup setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default AddGroupModal;
