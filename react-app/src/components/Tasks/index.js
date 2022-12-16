import { Modal } from "../../context/Modal";
import React, { useState } from 'react';
import CreateListTask from "./CreateListTask";
import './index.css'

export default function CreateATaskModal() {
    const [showModal, setShowModal] = useState(false);


    return (
        <div className="createTaskModalBtn">
