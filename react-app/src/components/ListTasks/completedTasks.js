import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, useParams, Redirect } from 'react-router-dom'
import { getAllTasksThunk } from "../../store/tasks";

function CompleteTasksPage() {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks)

  useEffect(() => {
    dispatch(getAllTasksThunk())
  }, [dispatch])

    const completed = Object.values(tasks).filter(task => {
      return task.completed_by !== null})

  return(
    <div>
      <h1>Completed Tasks</h1>
         {completed.map(task => (
          <div key={task.id}>
            <p>{task.name}</p>
            <p>{task.notes}</p>
            <p>{task.due}</p>
          </div>
        ))}
    </div>
  )
}
export default CompleteTasksPage;
