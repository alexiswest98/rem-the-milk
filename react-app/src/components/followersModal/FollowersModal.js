import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { Modal } from '../../context/Modal';
import ShowFollowers from '.';

function ShowfollowersModal({following}) {
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
      id='sec-box-info'
      onClick={() => setShowModal(true)}>{following} Followers</button>
      {showModal && (
        <Modal onClose={() => onCloseAction()}>
          <ShowFollowers setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default ShowfollowersModal;
