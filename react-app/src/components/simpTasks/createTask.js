import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { createTaskThunk } from "../../store/tasks";
import './index.css'

function CreateTask({ setShowModal }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const userId = +user.id
  const currentDate = new Date()
  const finalDate = Date.parse(currentDate)

  const Tasks = Object.values(useSelector(state => state.tasks))

    // console.log('alltaks--------------------', Tasks)
    const dayTasks = Object.values(useSelector(state => state.specTask))
    // console.log('DAYTAKS--------------------', dayTasks)


  const [name, setName] = useState('')
  const [due, setDue] = useState('')
  const [notes, setNotes] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  // const [hasSubmitted, setHasSubmitted] = useState(false);
  // const { listId } = useParams()

  useEffect(() => {
    const errors = []
    if (name.length < 4) errors.push("Provide a name with at least 4 characters");
    if (Date.parse(due) < finalDate) errors.push('Due date must be after today');
    if (!due) errors.push("Due Date is required");
    setValidationErrors(errors);
  }, [name, due, notes]);


  const onsubmit = async (e) => {
    e.preventDefault();

    // setHasSubmitted(true);
    if (validationErrors.length) return alert(`Cannot Submit`);

    const payload = {
      name,
      user_id: userId,
      due: due.toString(),
      notes
    }

    // console.log("***************", payload.due)

    // console.log('SUBMIT ###########', payload)
    await dispatch(createTaskThunk(payload))
    setShowModal(false)

    history.push(`/home`)
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
            className="createGroupInput"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="due">
          <input
            className="createGroupInput"
            type="date"
            placeholder="Due"
            onChange={(e) => setDue(e.target.value)}
            value={due}
          />
        </label>
        <label>
          <input
            className="createGroupInput"
            type="text"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>
        <button className="submit" id='createTaskSubmitBtn'type="submit" disabled={validationErrors.length}>Create Task</button>
      </form>
      {/* <button onClick={()=> history.push(`/lists/${listId}`)}> back </button> */}
    </div>
  )
}



export default CreateTask;
