import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, useParams, Redirect } from 'react-router-dom'
import { getAllListTasksThunk } from "../../store/tasks";
import { completeTaskThunk } from "../../store/tasks";
import { deleteTaskThunk } from "../../store/tasks";
const ListPage = () => {
  const history = useHistory()
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists)
  const tasks = useSelector(state => state.tasks)
  const listId = useParams()
  const list_id = Object.values(listId)[0]
  let flip = true
  const change = () => {
    flip = !flip
  }
  useEffect(() => {
    dispatch(getAllListTasksThunk(Object.values(listId)[0]))
  }, [dispatch])
  const incomplete = Object.values(tasks).filter(task => {
    return task.completed_by == null})
  const complete = async(task) => {
    const payload = {
      name: task.name,
      due: task.due,
      user_id: task.user_id,
      completed_by: user.id,
      list_id: task.list_id,
      notes: task.notes
    }
    dispatch(completeTaskThunk(payload, task.id))
    console.log(`You tried to complete ${task.name} with user ${user.id}`)
    console.log("task ID =", task.id)
  }
  const deleteTask = (task_id) => {
    dispatch(deleteTaskThunk(task_id))
  }
  console.log(Object.values(listId)[0])
  console.log("component tasks = ",tasks)
  return(
    <div>
        {incomplete.map(task=>(
            <div key={task.id}>
      <p>{task.name}</p>
      <div>{task.due}  complete
        <button onClick={() => complete(task)}>X</button>
        <button onClick={()=> deleteTask(task.id)}>:wastebasket:</button>
        <button onClick={()=> history.push(`/lists/${list_id}/Tasks/edit/${task.id}`)}>edit</button>
          </div>
      </div>
        ))}
      <button onClick={()=> history.push('/profile')}> back </button>
      <button onClick={() => history.push(`/Tasks/new/${list_id}`)}> New Task</button>
      {/* <button onClick={() => showComplete()}> {flip = null ? 'Show Unfinished': 'Show Complete'}</button> */}
    </div>
  )
}
export default ListPage;








