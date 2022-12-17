import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { getGroupsThunk } from '../../store/groups';
import CreateAGroup from '.';
import './index.css'


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
      className='createGroupModalButton'
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
