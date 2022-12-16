import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { createTaskThunk } from "../../store/tasks";

function CreateListTask() {
const dispatch = useDispatch()
const history = useHistory()
const user = useSelector(state => state.session.user)
const userId = +user.id

const [name, setName] = useState('')
const [due, setDue] = useState('')
const [notes, setNotes] = useState('')
const [validationErrors, setValidationErrors] = useState([])
const [hasSubmitted, setHasSubmitted] = useState(false);
const {listId} = useParams()

useEffect(() => {
  const errors = []
  if(!name) errors.push("Name is required");
  if (!due) errors.push("Due Date is required");
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

  console.log("***************", payload.due)

  console.log('We are in the CreateListTask Comp.. PAYLOAD:', payload)
  await dispatch(createTaskThunk(payload))
  history.push(`/lists/${listId}`)
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
        <button className="submit" type="submit" hidden={validationErrors.length !== 0}>Create Task</button>
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



export default CreateListTask;
