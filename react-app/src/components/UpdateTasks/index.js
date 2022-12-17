import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';
import { Modal } from '../../context/Modal';
import EditListTask from './updateTasks';
// import { getAllTasksThunk } from '../../store/tasks';
function EditTaskModal({taskId}) {
  // const dispatch = useDispatch();
  const history = useHistory();
  const {listId} = useParams()
  const [showModal, setShowModal] = useState(false);

  const onCloseAction = () => {
    setShowModal(false)
    history.push(`/lists/${listId}`)
    // dispatch(getAllTasksThunk())
  }

  return (
    <>
      <button
      onClick={() => setShowModal(true)}>✎</button>
      {showModal && (
        <Modal onClose={() => onCloseAction()}>
          <EditListTask setShowModal={setShowModal} taskId={taskId}/>
        </Modal>
      )}
    </>
  );
}

export default EditTaskModal;
