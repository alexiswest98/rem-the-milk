import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { createTaskThunk } from "../../store/tasks";

function CreateListTask() {
const dispatch = useDispatch()
const history = useHistory()
const user = useSelector(state => state.session)
const userId = user.user.id
const [name, setName] = useState('')
const [due, setDue] = useState('')
const [notes, setNotes] = useState('')
const [errors, setErrors] = useState('')
const {listId} = useParams()
const onsubmit = async (e) => {
  e.preventDefault();
if (!errors.length) {
  const payload = {
    name,
    user_id: userId,
    list_id: listId,
    due,
    notes,
  }
  console.log('We are in the CreateListTask Comp.. PAYLOAD:', payload)
  const newTask = await dispatch(createTaskThunk(payload))
  history.push(`/lists/${listId}`)
}
}

return (
  <div>
    <form onSubmit={onsubmit}>
        <p> NEW TASK </p>
        <label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <label>
          <input
            type="text"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>

        <button className="submit" type="submit" hidden={errors.length !== 0}>Create Task</button>
      </form>
    <button onClick={()=> history.push(`/lists/${listId}`)}> back </button>
  </div>
)

// THIS WAS UPDATED AT 4:56 ON THURSDAY

}
export default CreateListTask;
