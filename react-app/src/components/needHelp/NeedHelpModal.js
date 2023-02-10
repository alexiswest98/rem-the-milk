import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { Modal } from '../../context/Modal';
import ShowHelp from '.';
import "./help.css"

function NeedHelpModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const onCloseAction = () => {
    setShowModal(false)
  }

  return (
    <div className='need-help'>
      <button
      className='need-help-button'
      onClick={() => setShowModal(true)}>
        <img className="need-help-img" src="https://spiceclubgrill.com/wp-content/plugins/clover-online-orders/public/img/need-help.png" alt="need help"></img>
      </button>
      {showModal && (
        <Modal onClose={() => onCloseAction()}>
          <ShowHelp setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default NeedHelpModal;
