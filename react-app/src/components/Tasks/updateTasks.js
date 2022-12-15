import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { editTaskThunk } from "../../store/tasks";

function EditListTask() {
const dispatch = useDispatch()
const history = useHistory()
const {listId} = useParams()
const {taskId} = useParams()
const task = useSelector(state => state.tasks[taskId])
console.log(task)
const user = useSelector(state => state.session)
const [name, setName] = useState(task.name||'')
const [due, setDue] = useState(task.due || '')
const [notes, setNotes] = useState(task.notes || '')
const [errors, setErrors] = useState('')
const [validationErrors, setValidationErrors] = useState([]);
const [hasSubmitted, setHasSubmitted] = useState(false);
const onsubmit = async (e) => {
  e.preventDefault();
if (!errors.length) {
  const payload = {
    id: task.id,
    name: name,
    user_id: task.user_id,
    due: due,
    notes: notes,
    list_id: task.list_id,
    completed_by: task.completed_by
  }

  console.log(payload)
  const editTask = await dispatch(editTaskThunk(payload))
  history.push(`/lists/${listId}`)
}
}

return (
  <div>
    <form onSubmit={onsubmit}>
        <p> EDIT TASK </p>
        <label htmlFor="name">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label htmlFor="due">
          <input
            type="date"
            placeholder="Due"
            onChange={(e) => setDue(e.target.value)}
            value={due}
          />
        </label>
        <label htmlFor="notes">
          <input
            type="text"
            placeholder="Notes"
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          />
        </label>
        <button className="submit" type="submit" hidden={validationErrors.length !== 0}>Update List</button>
      </form>
      {setHasSubmitted && validationErrors.length > 0 && (
                <div>
                    Please fix these inputs:
                    <ul>
                        <ul>
                            {validationErrors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </ul>
                </div>)}
    <button onClick={()=> history.push(`/lists/${listId}`)}> back </button>
  </div>
)



}
export default EditListTask;
