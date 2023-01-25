import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { Modal } from '../../context/Modal';
import ShowFollows from '.';

function ShowfollowsModal() {
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
      className='FollowModal'
      onClick={() => setShowModal(true)}>Following</button>
      {showModal && (
        <Modal onClose={() => onCloseAction()}>
          <ShowFollows setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default ShowfollowsModal;
