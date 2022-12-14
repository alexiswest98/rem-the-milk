import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, useParams, Redirect } from 'react-router-dom'
import { getAllListTasksThunk } from "../../store/tasks";
import { completeTaskThunk } from "../../store/tasks";

const ListPage = () => {
  const history = useHistory()
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists)
  const tasks = useSelector(state => state.tasks)
  const listId = useParams()
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
    dispatch(completeTaskThunk(task, user.id))
    console.log(`You tried to complete ${task.name} with user ${user.id}`)
    console.log(task.completed_by)
    console.log( task.id,
      task.name,
      task.due,
      task.user_id,
      task.completed_by,
      task.list_id,
      task.notes)
  }

  console.log(Object.values(listId)[0])
  console.log("component tasks = ",tasks)
  return(
    <div>
        {incomplete.map(task=>(
            <div key={task.id}>
      <p>{task.name}</p>
      <div>{task.due}  complete
        <button onClick={() => complete(task)}>_</button>
          </div>
      </div>
        ))}
      <button onClick={()=> history.push('/profile')}> back </button>
      <button onClick={() => history.push(`/Tasks/new/${Object.values(listId)[0]}`)}> New Task</button>
      {/* <button onClick={() => showComplete()}> {flip = null ? 'Show Unfinished': 'Show Complete'}</button> */}
    </div>
  )

}

export default ListPage;
