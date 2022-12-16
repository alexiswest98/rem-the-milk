import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { Modal } from '../../context/Modal';
import UserDetails from './details';
import EditListTask from './updateTasks';
import {getAllTasksThunk} from '../../store/groups';

function EditTaskModal() {
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
      onClick={() => setShowModal(true)}>Edit Task</button>
      {showModal && (
        <Modal onClose={() => onCloseAction()}>
          <EditListTask setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditTaskModal;
