import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { Modal } from '../../context/Modal';
import CreateListTask from './CreateListTask';
import {getAllTasksThunk} from '../../store/groups';

function CreateListTaskModal() {
  const dispatch = useDispatch();
//   const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const onCloseAction = () => {
    setShowModal(false)
    dispatch(getAllTasksThunk())
  }

  return (
    <>
      <button
      onClick={() => setShowModal(true)}>Create Task</button>
      {showModal && (
        <Modal onClose={() => onCloseAction()}>
          <CreateListTask setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateListTaskModal;
