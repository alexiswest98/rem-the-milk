import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { CreateGroupListThunk } from "../../store/lists";

function CreateGroupList({ setShowModal}) {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const [name, setName] = useState('')
  const [due, setDue] = useState('')
  const [notes, setNotes] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const { groupId }  = useParams();


  const curr = new Date()
  const now = new Date(curr)
  now.setDate(now.getDate() - 1)

  useEffect(() => {
    const validationErrors = []
    if (!name) validationErrors.push("Name is required");
    if (name.length > 50) validationErrors.push('Name must not longer than 50 characters')
    if (!due) validationErrors.push("Due Date is required");
    if (new Date(due) <= now) validationErrors.push('Please select a date in the future')
    setValidationErrors(validationErrors);

  }, [name, due, notes]);

  const user_id = user.id
  // console.log("user id = ", user_id)
  console.log('Due in the form', Date.parse(due))
  const onsubmit = async (e) => {
    e.preventDefault();

    if (!validationErrors.length) {
      const payload = {
        name: name,
        user_id: user_id,
        due: due,
        notes: notes,
        completed: false,
        group_id: groupId,
      }


      await dispatch(CreateGroupListThunk(payload))
      setShowModal(false)
    }
  }

  return (
    <div>
      <form onSubmit={onsubmit} className='createListForm'>
        <p> NEW LIST </p>
        <div className="errorsDiv">
          {validationErrors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <label>
          <input
            className="createListInput"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="due">
          <input
            className="createListInput"
            type="date"
            placeholder="Due"
            onChange={(e) => setDue(e.target.value)}
            value={due}
          />
        </label>
        <label htmlFor="notes">
          <input
            className="createListInput"
            type="text"
            placeholder="Notes"
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          />
        </label>

        <button className="submit" id="createListSubmitBtn" type="submit" disabled={validationErrors.length}>Create List</button>
      </form>
      {/* <button onClick={()=> history.push('/profile')}> back </button> */}
    </div>
  )



}
export default CreateGroupList;
