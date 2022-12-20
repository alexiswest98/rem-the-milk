import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, useParams, Redirect } from 'react-router-dom'
import { getAllTasksThunk } from "../../store/tasks";
import { editTaskThunk } from "../../store/tasks";
import { deleteTaskThunk } from "../../store/tasks";
import './index.css'

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
    return task.completed_by != null
  })

  return (
    <div className="whole-incomplete-task">
      <h1 id="incomp-title">Completed Tasks</h1>
      <div id="overflow-here">
        {completed.map(task => (
          <div key={task.id} className="completedTaskDiv">
            <h4>Notes: {task.name}</h4>
            <p>Due: {task.notes}</p>
            <p>{task.due.slice(0, 17)}</p>
            <div className="outer-box-actions-incom">
              <button id="delete-butt-emoji" onClick={() => deleteTask(task.id)}>🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default CompleteTasksPage;
