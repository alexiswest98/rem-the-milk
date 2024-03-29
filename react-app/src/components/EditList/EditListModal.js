import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { EditListThunk } from "../../store/lists";
import { EditGroupListThunk } from "../../store/lists";
import './index.css'

//working
function EditList({ setShowModal }) {
  const dispatch = useDispatch()
  const { listId } = useParams()
  const history = useHistory()
  // const user = useSelector(state => state.session)
  const list = useSelector(state => state.lists[listId])
  const [name, setName] = useState(list.name || "");
  const [due, setDue] = useState(convert(list.due) || "");
  const [notes, setNotes] = useState(list.notes || "");
  const [validationErrors, setValidationErrors] = useState([]);
  // const [hasSubmitted, setHasSubmitted] = useState(false);


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
    // console.log(date)
    return [date[3], mnths[date[2]], date[1]].join("-");
  }

  const curr = new Date()
  const now = new Date(curr)
  now.setDate(now.getDate() - 1)

  useEffect(() => {
    const errors = []
    if (!due) errors.push("Due Date is required");
    if (name.length < 4 ) errors.push('Provide a list name with at least 4 characters');
    if (new Date(due) <= now) errors.push('Please select a date in the future')
    setValidationErrors(errors);
  }, [name, due, notes]);

  // const today = new Date()
  // console.log('date = ', today)
  // const date = list.due
  // console.log('compaire = ', date >= today)

  const onSubmit = async () => {

    // setHasSubmitted(true);
    if (validationErrors.length) return alert(`Cannot Submit`);

    const newList = {
      id: list.id,
      name: name,
      user_id: list.user_id,
      due: due,
      notes: notes,
      group_id: list.group_id,
      completed: list.completed
    }

    {(list.group_id)?
      await dispatch(EditGroupListThunk(newList))
      :
      await dispatch(EditListThunk(newList))
    }
    setShowModal(false)
    history.push(`/lists/${listId}`)

  }
  return (
    <div>
      <form onSubmit={onSubmit} className='createAGroupForm'>
        <h3 className="createTaskH3"> EDIT LIST </h3>
        <div className="errorsDiv">
        {validationErrors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <label htmlFor="name">
          <input
            className="createGroupInput"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label htmlFor="due">
          <input
            className="createGroupInput"
            type="date"
            placeholder="Due"
            onChange={(e) => setDue(e.target.value)}
            value={due}
          />
        </label>
        <label htmlFor="notes">
          <input
            className="createGroupInput"
            type="text"
            placeholder="Notes"
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          />
        </label>
        <button className="submit" id="createListSubmitBtn" type="submit" onClick={() => onSubmit()}>Update List</button>
      </form>

    </div>
  )
}
export default EditList;
