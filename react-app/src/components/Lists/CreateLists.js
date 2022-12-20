import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { CreateListThunk } from "../../store/lists";
import './createList.css'

function CreateList({ setShowModal }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const [name, setName] = useState('')
  const [due, setDue] = useState('')
  const [notes, setNotes] = useState('')
  const [validationErrors, setValidationErrors] = useState([])

  function convert(str) {
    console.log(str)
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
    // console.log(date)
    return [date[3], mnths[date[2]], date[1]].join("-");
  }

  const curr = new Date()
  const now = new Date(curr)

  now.setDate(now.getDate() - 1)

  useEffect(() => {
    const errors = []
    if (!name) errors.push("Name is required");
    if (name.length > 50) errors.push('Name must not longer than 50 characters')
    if (!due) errors.push("Due Date is required");
    if (new Date(due) <= now) errors.push('Please select a date in the future')
    setValidationErrors(errors);

  }, [name, due, notes]);

  const user_id = user.id
  // console.log("user id = ", user_id)
  // console.log('Due in the form', Date.parse(due))
  const onsubmit = async (e) => {
    e.preventDefault();

    if (!validationErrors.length) {
      const payload = {
        name: name,
        user_id: user_id,
        due: due,
        notes: notes,
        completed: false,
        group_id: null,
      }


      await dispatch(CreateListThunk(payload))
      setShowModal(false)
      history.push(`/home`)
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
export default CreateList;
