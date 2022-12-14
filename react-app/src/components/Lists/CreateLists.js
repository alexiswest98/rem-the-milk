import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { CreateListThunk } from "../../store/lists";

function CreateList() {
const dispatch = useDispatch()
const history = useHistory()
const user = useSelector(state => state.session)
const [name, setName] = useState('')
const [due, setDue] = useState('')
const [notes, setNotes] = useState(null)
const [errors, setErrors] = useState('')

const onsubmit = async (e) => {
  e.preventDefault();
if (!errors.length) {
  const payload = {
    name,
    user_id: user.id,
    due,
    notes
  }
  console.log(payload)
  const newSpot = await dispatch(CreateListThunk(payload))
  history.push(`/profile`)
}
}

return (
  <div>
    <form onSubmit={onsubmit}>

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

        <button className="submit" type="submit" hidden={errors.length !== 0}>Create List</button>
      </form>
    <button onClick={()=> history.push('/profile')}> back </button>
  </div>
)



}
export default CreateList;
