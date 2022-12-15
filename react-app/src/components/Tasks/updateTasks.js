import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { editTaskThunk } from "../../store/tasks";

function EditListTask() {
const dispatch = useDispatch()
const history = useHistory()
const user = useSelector(state => state.session)
const [name, setName] = useState('')
const [due, setDue] = useState('')
const [notes, setNotes] = useState(null)
const [errors, setErrors] = useState('')
const listId = useParams()
const list_id = Object.values(listId)[0]
const onsubmit = async (e) => {
  e.preventDefault();
if (!errors.length) {
  const payload = {
    name,
    user_id: user.id,
    list_id,
    due,
    notes
  }

  console.log(payload)
  const editTask = await dispatch(editTaskThunk(payload))
  history.push(`/lists/${list_id}`)
}
}

return (
  <div>
    <form onSubmit={onsubmit}>
        <p> EDIT TASK </p>
        <label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Due"
            value={due}
            onChange={(e) => setDue(e.target.value)}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>

        <button className="submit" type="submit" hidden={errors.length !== 0}>Update Task</button>
      </form>
    <button onClick={()=> history.push(`/lists/${list_id}`)}> back </button>
  </div>
)



}
export default EditListTask;
// pls god work for them
