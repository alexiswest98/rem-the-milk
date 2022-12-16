import { Modal } from "../../context/Modal";
import React, { useState } from 'react';
import CreateListTask from "./CreateListTask";
import './index.css'

export default function CreateATaskModal() {
    const [showModal, setShowModal] = useState(false);


    return (
        <div className="createTaskModalBtn">

            <button onClick={() => setShowModal(true)} className='createTaskModalBtn'>Create Task </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateListTask setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    )
}