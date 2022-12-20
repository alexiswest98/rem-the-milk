import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { Modal } from '../../context/Modal';
import EditList from './EditListModal';

function EditListModal () {const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);


  const onCloseAction = () => {
    setShowModal(false)
    history.push("/home")
  }

  return (
    <>
      <button
      className='editListButton'
      onClick={() => setShowModal(true)}>✏️</button>
      {showModal && (
        <Modal onClose={() => onCloseAction()}>
          <EditList setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditListModal;
