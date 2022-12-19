import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { createTaskThunk } from "../../store/tasks";
import './index.css'

function CreateListTask({ setShowModal }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const userId = +user.id
  const currentDate = new Date()
  const finalDate = Date.parse(currentDate)
  // const Tasks = Object.values(useSelector(state => state.tasks))

  // console.log('alltaks--------------------', Tasks)
  // const dayTasks = Object.values(useSelector(state => state.specTask))
  // console.log('DAYTAKS--------------------', dayTasks)


  const [name, setName] = useState('')
  const [due, setDue] = useState('')
  const [notes, setNotes] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { listId } = useParams()

  useEffect(() => {
    const now = new Date()
    const errors = []
    if (!name) errors.push("Name is required");
    if (!due) errors.push("Due Date is required");
    if (new Date(due) <= now) validationErrors.push('Please select a date in the future')
    setValidationErrors(errors);
  }, [name, due, notes]);


  const onsubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return alert(`Cannot Submit`);

    const payload = {
      name,
      user_id: userId,
      list_id: +listId,
      due: due.toString(),
      notes
    }

    // console.log("***************", payload.due)

    // console.log('We are in the CreateListTask Comp.. PAYLOAD:', payload)
    await dispatch(createTaskThunk(payload))
    setShowModal(false)
    history.push(`/lists/${listId}`)
  }


  return (
    <div>
      <form onSubmit={onsubmit} className='createTaskForm'>
        <h3 className="createTaskH3">New Task</h3>
        <div className="errorsDiv">
          {validationErrors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <label>
          <input
            className="createTaskInput"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="due">
          <input
            className="createTaskInputDate"
            type="date"
            placeholder="Due"
            onChange={(e) => setDue(e.target.value)}
            value={due}
          />
        </label>
        <label>
          <input
            className="createTaskInput"
            type="text"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>
        <button className="submit" id='createTaskSubmitBtn' type="submit" disabled={validationErrors.length !== 0}>Create Task</button>
      </form>

      {/* <button onClick={()=> history.push(`/lists/${listId}`)}> back </button> */}
    </div>
  )
}



export default CreateListTask;
