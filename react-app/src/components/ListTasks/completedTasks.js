import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, useParams, Redirect } from 'react-router-dom'
import { getAllTasksThunk } from "../../store/tasks";
import { editTaskThunk } from "../../store/tasks";
import { deleteTaskThunk } from "../../store/tasks";

function CompleteTasksPage() {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks)

const deleteTask = (task_id) => {
  dispatch(deleteTaskThunk(task_id))
}

  useEffect(() => {
    dispatch(getAllTasksThunk())
  }, [dispatch])

    const completed = Object.values(tasks).filter(task => {
      return task.completed_by != null})

  return(
    <div>
      <h1>Completed Tasks</h1>
         {completed.map(task => (
          <div key={task.id}>
            <p>{task.name}</p>
            <p>{task.notes}</p>
            <p>{task.due}</p>
        <button onClick={()=> deleteTask(task.id)}>delete</button>
          </div>
        ))}
    </div>
  )
}
export default CompleteTasksPage;
