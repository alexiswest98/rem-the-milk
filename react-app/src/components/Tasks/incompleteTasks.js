import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, useParams, Redirect } from 'react-router-dom'
import { getAllTasksThunk } from "../../store/tasks";
import { editTaskThunk } from "../../store/tasks";
import { deleteTaskThunk } from "../../store/tasks";

function IncompleteTasksPage() {
  const history = useHistory()
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists)
  const tasks = useSelector(state => state.tasks)
  const {listId} = useParams()

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

  const complete = async(task) => {
    const payload = {
      id: task.id,
      name: task.name,
      due: convert(task.due),
      user_id: +user.id,
      completed_by: +user.id,
      list_id: task.list_id,
      notes: task.notes
    }
    dispatch(editTaskThunk(payload))
    // console.log(`You tried to complete ${task.name} with user ${user.id}`)
    // console.log("task ID =", task.id)
  }

  
const deleteTask = (task_id) => {
  dispatch(deleteTaskThunk(task_id))
}

  useEffect(() => {
    dispatch(getAllTasksThunk())
  }, [dispatch])

    const completed = Object.values(tasks).filter(task => {
      return task.completed_by === null})

  return(
    <div>
      <h1>Incompleted Tasks</h1>
         {completed.map(task => (
          <div key={task.id}>
            <p>{task.name}</p>
            <p>{task.notes}</p>
            <p>{task.due}</p>
        <button onClick={() => complete(task)}>X</button> Complete
        <button onClick={()=> deleteTask(task.id)}>delete</button>
          </div>
        ))}
    </div>
  )
}
export default IncompleteTasksPage;
