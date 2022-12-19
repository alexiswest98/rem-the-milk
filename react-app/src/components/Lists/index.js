import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { Modal } from '../../context/Modal';
// import UserDetails from './details';
import CreateList from './CreateLists';


function CreateListModal(user) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const onCloseAction = () => {
    setShowModal(false)
    // history.push("/home")
  }

  return (
    <>
      <button
      onClick={() => setShowModal(true)}>+</button>
      {showModal && (
        <Modal onClose={() => onCloseAction()}>
          <CreateList setShowModal={setShowModal} user={user}/>
        </Modal>
      )}
    </>
  );
}

export default CreateListModal;
