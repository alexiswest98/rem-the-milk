import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { EditListThunk } from "../../store/lists";
import { GetAllListsThunk } from "../../store/lists";

function UpdateList() {
const dispatch = useDispatch()
const { listId } = useParams()
const history = useHistory()
const user = useSelector(state => state.session)
const list = useSelector(state => state.lists[listId])
console.log("*******************************", list)


const [newName, setNewName] = useState(list.name || "");
const [newDue, setNewDue] = useState(list.due || "");
const [newNotes, setNewNotes] = useState(list.notes || "");
const [validationErrors, setValidationErrors] = useState([]);
const [hasSubmitted, setHasSubmitted] = useState(false);

useEffect(() => {
  const errors = []
  if(!newName) errors.push("Name is required");
  if (!newDue) errors.push("Due Date is required");
  if (!newDue) errors.push("Due Date is required");
  setValidationErrors(errors);
  // dispatch(GetAllListsThunk())
}, [newName, newDue, newNotes]);


const onSubmit = async (e) => {
  e.preventDefault();

  setHasSubmitted(true);
  if (validationErrors.length) return alert(`Cannot Submit`);

  const newList = {
    id: list.id,
    name: newName,
    user_id: list.user_id,
    due: newDue,
    notes: newNotes,
    group_id: list.group_id,
    completed: list.completed
  }

  console.log("PAYLOADDDDDD", newList)
  await dispatch(EditListThunk(newList))

  // dispatch(GetAllListsThunk())
  history.push(`/profile`)

}

return (
  <div>
    <form onSubmit={onSubmit}>
      <p> EDIT LIST </p>
        <label htmlFor="name">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
          />
        </label>
        <label htmlFor="due">
          <input
            type="date"
            placeholder="Due"
            onChange={(e) => setNewDue(e.target.value)}
            value={newDue}
          />
        </label>
        <label htmlFor="notes">
          <input
            type="text"
            placeholder="Notes"
            onChange={(e) => setNewNotes(e.target.value)}
            value={newNotes}
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
                </div>
            )}
    <button onClick={()=> history.push('/profile')}> back </button>
  </div>

)
}
export default UpdateList;
