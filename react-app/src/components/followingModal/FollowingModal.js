import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { Modal } from '../../context/Modal';
import ShowFollows from '.';
import "./index.css"

function ShowfollowsModal({followers}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const onCloseAction = () => {
    setShowModal(false)
    // history.push("/home")
  }

  return (
    <div className='FollowModal'>
      <button
      className='following-butt'
      onClick={() => setShowModal(true)}>{followers} Following</button>
      {showModal && (
        <Modal onClose={() => onCloseAction()}>
          <ShowFollows setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default ShowfollowsModal;
