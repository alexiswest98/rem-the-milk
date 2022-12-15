import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { EditListThunk } from "../../store/lists";
import { GetAllListsThunk } from "../../store/lists";
function UpdateList() {
const dispatch = useDispatch()
const listId = useParams()
const list_id = Object.values(listId)[0]
const history = useHistory()
const user = useSelector(state => state.session)
const lists = useSelector(state => state.lists)
const list = lists[list_id]
console.log(list)
const [name, setName] = useState(list.name || '')
const [due, setDue] = useState(list.due || '')
const [notes, setNotes] = useState(list.notes || '')
const [errors, setErrors] = useState('')
useEffect(() => {
  dispatch(GetAllListsThunk())
}, [dispatch])
const onsubmit = async (e) => {
  e.preventDefault();
if (!errors.length) {
  const payload = {
    id: list_id,
    name,
    user_id: user.id,
    due,
    notes
  }
  console.log(payload)
  const editList = await dispatch(EditListThunk(payload, list_id))
  history.push(`/profile`)
}
}
return (
  <div>
    <form onSubmit={onsubmit}>
      <p> EDIT LIST </p>
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
        <button className="submit" type="submit" hidden={errors.length !== 0}>Update List</button>
      </form>
    <button onClick={()=> history.push('/profile')}> back </button>
  </div>
)
}
export default UpdateList;
