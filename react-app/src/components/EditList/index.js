import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { Modal } from '../../context/Modal';
// import UserDetails from './details';
import EditList from './EditListModal';
import { GetAllListsThunk } from '../../store/lists';
function EditListModal (listId) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(state => state.session.user);


  const onCloseAction = () => {
    setShowModal(false)
    history.push("/home")
  }

  return (
    <>
      <button
      onClick={() => setShowModal(true)}>✎</button>
      {showModal && (
        <Modal onClose={() => onCloseAction()}>
          <EditList setShowModal={setShowModal} listId={listId}/>
        </Modal>
      )}
    </>
  );
}

export default EditListModal;
