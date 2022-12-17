import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { CreateGroupListThunk } from "../../store/lists";

function CreateGroupList({setShowModal, groupId}) {
const dispatch = useDispatch()
// const { groupId } = useParams()
console.log(groupId)
const history = useHistory()
const user = useSelector(state => state.session.user)
const group = useSelector(state => state.groups[Object.values(groupId)[0]])
console.log('group = ', group)
const [name, setName] = useState('')
const [due, setDue] = useState('')
const [notes, setNotes] = useState(null)
const [validationErrors, setValidationErrors] = useState([])


useEffect(() => {
  const errors = []
  if(!name) errors.push("Name is required");
  if (!due) errors.push("Due Date is required");
  // if (!due) errors.push("Due Date is required");
  setValidationErrors(errors);

}, [name, due, notes]);

const user_id = user.id
console.log("user id = ", user_id)

const onsubmit = async (e) => {
  e.preventDefault();

if (!validationErrors.length) {
  const payload = {
    name: name,
    user_id: user_id,
    due: due,
    notes: notes,
    group_id: Object.values(groupId)[0],
    completed: false
  }

  console.log(payload)
  const newSpot = await dispatch(CreateGroupListThunk(payload))
  setShowModal(false)
  history.push(`/groups/${Object.values(groupId)[0]}`)
}
}

return (
  <div>
    <form onSubmit={onsubmit}>
      <p> NEW LIST </p>
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
        <label htmlFor="notes">
          <input
            type="text"
            placeholder="Notes"
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          />
        </label>

        <button className="submit" type="submit" hidden={validationErrors.length !== 0}>Create List</button>
      </form>
    <button onClick={()=> history.push(`/groups/${groupId}`)}> back </button>
  </div>
)



}
export default CreateGroupList;
