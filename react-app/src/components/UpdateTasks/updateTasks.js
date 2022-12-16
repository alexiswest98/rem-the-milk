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
const user = useSelector(state => state.session.user)
const [name, setName] = useState(task.name||'')
const [due, setDue] = useState(convert(task.due) || '')
const [notes, setNotes] = useState(task.notes || '')
const [validationErrors, setValidationErrors] = useState([]);
const [hasSubmitted, setHasSubmitted] = useState(false);


function convert(str) {
  const mnths = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12"
    },
    date = str.split(" ");
    console.log(date)
  return [date[3], mnths[date[2]], date[1]].join("-");
}

// console.log('due = ',convert(task.due))
//-> "2011-06-09"


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
    id: task.id,
    name: name,
    due: due.toString(),
    user_id: +user.id,
    // completed_by: null,
    list_id: task.list_id,
    notes: notes
  }

  console.log("payload", payload)
  const editTask = await dispatch(editTaskThunk(payload))

  history.push(`/lists/${listId}`)

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