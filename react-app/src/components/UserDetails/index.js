import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { Modal } from '../../context/Modal';
import UserDetails from './details';
import { getFollowsThunk } from '../../store/follows';
import { getFollowingThunk } from '../../store/follows';

function GetUserDetailsModal(user) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const onCloseAction = () => {
    setShowModal(false)
    // Get a users followers
    dispatch(getFollowsThunk())
    // Who youre following
    dispatch(getFollowingThunk())
    history.push("/users")
  }

  return (
    <>
      <button
      onClick={() => setShowModal(true)}>Get UserDetails</button>
      {showModal && (
        <Modal onClose={() => onCloseAction()}>
          <UserDetails setShowModal={setShowModal} user={user}/>
        </Modal>
      )}
    </>
  );
}

export default GetUserDetailsModal;
