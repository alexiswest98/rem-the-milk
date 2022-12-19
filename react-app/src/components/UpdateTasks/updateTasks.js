import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { editTaskThunk } from "../../store/tasks";

function EditListTask({ setShowModal, taskId }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { listId } = useParams()
  const currentDate = new Date()
  // console.log(currentDate, 'this is current date')
  const finalDate = Date.parse(currentDate)
  // console.log(finalDate, "final date")
  const task = useSelector(state => state.tasks[taskId])
  // console.log('taskId = ', taskId)
  const user = useSelector(state => state.session.user)
  const [name, setName] = useState(task.name || '')
  const [due, setDue] = useState(convert(task.due) || '')
  const [notes, setNotes] = useState(task.notes || '')
  const [validationErrors, setValidationErrors] = useState([]);
  // const [hasSubmitted, setHasSubmitted] = useState(false);


  function convert(str) {
    // console.log(str)
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
  // console.log(due, 'this is due')
  // console.log('due = ',convert(task.due))
  //-> "2011-06-09"

  const curr = new Date()
  const now = new Date(curr)

  now.setDate(now.getDate() - 2)

  useEffect(() => {
    const errors = []
    if (name.length < 4) errors.push("Name needs 4 or more characters");
    if (!due) errors.push("Due Date is required");
    if (new Date(due) <= now) errors.push('Please select a date in the future')
    setValidationErrors(errors);
  }, [name, due, notes]);


  const onsubmit = async (e) => {
    e.preventDefault();

    // setHasSubmitted(true);
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

    // console.log("payload", payload)
    await dispatch(editTaskThunk(payload))
    setShowModal(false)
    // task.list_id ?
    // history.push(`/lists/${listId}`)
    // :
    // history.push(`/home`)

  }

  return (
    <div>
      <form onSubmit={onsubmit} className='createAGroupForm'>
        <h3 className="createTaskH3"> EDIT TASK </h3>
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
        <button className="submit" type="submit" disabled={validationErrors.length}>Update Task</button>
      </form>

      {/* <button onClick={()=> history.push(`/lists/${listId}`)}> back </button> */}
    </div>
  )



}
export default EditListTask;
