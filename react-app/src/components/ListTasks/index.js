import { Modal } from "../../context/Modal";
import React, { useState } from 'react';
import CreateListTask from "./CreateListTask";
import './index.css'

export default function CreateATaskModal() {
    const [showModal, setShowModal] = useState(false);


    return (
        <div className="createTaskModalBtn">
            <button onClick={() => setShowModal(true)} class="logout-butt btn-1">Add task</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateListTask setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    )
}
