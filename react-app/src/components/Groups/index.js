import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { Modal } from '../../context/Modal';
// import UserDetails from './details';
import CreateGroupList from './CreateGroupLists';
function CreateGroupListModal(groupId) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const onCloseAction = () => {
    setShowModal(false)
    history.push(`/groups/${Object.values(groupId)[0]}`)
  }

  return (
    <>
      <button
      onClick={() => setShowModal(true)}>Create New List</button>
      {showModal && (
        <Modal onClose={() => onCloseAction()}>
          <CreateGroupList setShowModal={setShowModal} groupId={groupId}/>
        </Modal>
      )}
    </>
  );
}

export default CreateGroupListModal;
